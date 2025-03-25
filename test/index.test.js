const SimplePropertiesDB = require("../index");
const fs = require("fs");
const path = require("path");

describe("PropertiesDB", () => {
  /** @type {SimplePropertiesDB} */
  let spDb;
  let rootPath = path.resolve("./");
  // const testFilePath = path.resolve("./");
  // console.log("🚀 ~ describe ~ testFilePath:", testFilePath);

  beforeEach(() => {
    // Create a fresh database before each test
    spDb = new SimplePropertiesDB(path.resolve("./"));

    spDb.DB_FILE_PATH
  });

  afterEach(() => {
    // Clean up test file
    if (fs.existsSync(spDb.DB_FILE_PATH)) {
      fs.unlinkSync(spDb.DB_FILE_PATH);
    }
  });

  test("should set and get a string value", () => {
    spDb.set("username", "sjh");
    expect(spDb.get('username')).toBe('sjh');
  });

  test('should set and get a number value', () => {
    spDb.set('age', 30);
    expect(spDb.get('age')).toBe(30);
  });

  test('should set and get a boolean value', () => {
    spDb.set('isActive', true);
    expect(spDb.get('isActive')).toBe(true);
  });

    test('should get all values', () => {
      spDb.set('username', 'johndoe');
      spDb.set('age', 30);

      const allValues = spDb.getAll();
      expect(allValues).toEqual({
        username: 'johndoe',
        age: 30
      });
    });

    test('should delete a value', () => {
      spDb.set('username', 'johndoe');
      spDb.delete('username');
      expect(spDb.get('username')).toBeUndefined();
    });

    test('should handle multiple value types', () => {
      const testData = {
        string: 'hello',
        number: 42,
        boolean: true,
        complexString: 'value with = sign'
      };

      Object.entries(testData).forEach(([key, value]) => {
        spDb.set(key, value);
      });

      Object.entries(testData).forEach(([key, value]) => {
        expect(spDb.get(key)).toBe(value);
      });
    });

    test('should preserve comments', () => {
      // Manually write a file with comments
      const rawString = `
        # This is a comment
        username=johndoe
        # Another comment
        age=30
        `;
      fs.writeFileSync(spDb.DB_FILE_PATH, rawString.split('\n').map(line => line.trim()).join('\n'));

      const _spDb = new SimplePropertiesDB(rootPath);
      const allValues = _spDb.getAll();

      expect(allValues).toEqual({
        username: 'johndoe',
        age: 30
      });

      const data = fs.readFileSync(spDb.DB_FILE_PATH, "utf8");
      const lines = data.split("\n")
              .filter(line => line.trim() !== "")
              .filter(line => line.startsWith("#") || line.includes("="))
        
      expect(lines).toEqual(
        [
          "# This is a comment",
          "username=johndoe",
          "# Another comment",
          "age=30",
        ]
      )
    });
});
