const fs = require('fs');
const path = require('path');

class SimplePropertiesDB {
    constructor(dbPath, options = {}) {
        const absPath = path.isAbsolute(dbPath) ? dbPath : path.join(process.cwd(), dbPath);
        this.DB_FILE_PATH = path.join(absPath, "db.properties");
        
        if (!fs.existsSync(this.DB_FILE_PATH)) {
            fs.writeFileSync(this.DB_FILE_PATH, "");
        }
    }

    // parse only string, number, boolean
    _parseValue(value) {
        if (value === "true") return true;
        if (value === "false") return false;
        if (!isNaN(value)) return parseFloat(value);
        return value;
    }

    _loadData() {
        const data = fs.readFileSync(this.DB_FILE_PATH, "utf8");
        const lines = data.split("\n")
                .filter(line => line.trim() !== "")
                .filter(line => line.startsWith("#") || line.includes("="))

        const originLines = [];
        const parsedData = {};

        lines.forEach(line => {
            const isComment = line.startsWith("#");
            if (isComment) {
                originLines.push({type: "comment", value: line});
                return;
            }

            //get key and value
            const [key, ...valueArr] = line.split("=");
            const value = valueArr.join("=").trim();

            originLines.push({type: "property", key, value});
            parsedData[key] = this._parseValue(value);
        })

        return {originLines, parsedData};
    }

    get(key) {
        const {parsedData} = this._loadData();
        return parsedData[key];
    }

    getAll() {
        const {parsedData} = this._loadData();
        return parsedData;
    }

    set(key, value) {
        const {originLines} = this._loadData();

        const target = originLines.find(line => line.type === "property" && line.key === key);
        if (target) {
            target.value = value;
        } else {
            originLines.push({type: "property", key, value});
        }

        const data = originLines.map(line => `${line.key}=${line.value}`).join("\n");

        fs.writeFileSync(this.DB_FILE_PATH, data);
    }

    delete(key) {
        const {originLines} = this._loadData();
        const data = originLines.filter(line => line.type === "property" && line.key !== key).join("\n");
        fs.writeFileSync(this.DB_FILE_PATH, data);
    }

}

module.exports = SimplePropertiesDB;