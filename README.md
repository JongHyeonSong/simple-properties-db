# Simple Properties DB

A lightweight Node.js library for managing key-value properties in a file-based database. It supports parsing, retrieving, updating, and deleting properties while preserving comments and formatting.

## Features

- **File-Based Storage**: Uses a `.properties` file for storing key-value pairs.
- **Supports Multiple Data Types**: Handles strings, numbers, and booleans.
- **Comment Preservation**: Keeps comments intact when modifying the file.
- **Simple API**: Easy-to-use methods for managing properties.

## Installation

```bash
npm install simple-properties-db
```

## Usage

### Import the Library

```javascript
const SimplePropertiesDB = require('simple-properties-db');
```

### Initialize the Database

```javascript
const db = new SimplePropertiesDB('./config'); // Path to the directory where the file will be created
```

This will create a `db.properties` file in the specified directory if it doesn't already exist.

### Set a Value

```javascript
db.set('username', 'johndoe');
db.set('age', 30);
db.set('isAdmin', true);
```

### Get a Value

```javascript
const username = db.get('username'); // 'johndoe'
const age = db.get('age'); // 30
const isAdmin = db.get('isAdmin'); // true
```

### Get All Values

```javascript
const allValues = db.getAll();
console.log(allValues);
// Output: { username: 'johndoe', age: 30, isAdmin: true }
```

### Delete a Value

```javascript
db.delete('username');
console.log(db.get('username')); // undefined
```

### Preserve Comments

If the `.properties` file contains comments, they will be preserved when modifying the file:

```properties
# This is a comment
username=johndoe
# Another comment
age=30
```

## API Reference

### `constructor(dbPath, options)`

- **`dbPath`**: Path to the directory where the `.properties` file will be stored. Defaults to the current working directory.
- **`options`**: (Optional) Additional configuration options.

### `set(key, value)`

Sets a key-value pair in the database.

- **`key`**: The key to set.
- **`value`**: The value to associate with the key (string, number, or boolean).

### `get(key)`

Retrieves the value associated with a key.

- **`key`**: The key to retrieve.

### `getAll()`

Retrieves all key-value pairs as an object.

### `delete(key)`

Deletes a key-value pair from the database.

- **`key`**: The key to delete.

## Example `.properties` File

```properties
# User configuration
username=johndoe
age=30
isAdmin=true
```

## Testing

Run the tests using Jest:

```bash
npm test
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## Author

Developed by sjh.