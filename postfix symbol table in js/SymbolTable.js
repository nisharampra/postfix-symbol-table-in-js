// SymbolTable
class SymbolTable {
  constructor() {
    this.keys = [];   // Array to store variable names (keys)
    this.values = []; // Array to store variable values (values)
  }

  // Method to insert or update a variable in the symbol table
  insertVariable(key, value) {
    const index = this.keys.indexOf(key); // Find the index of the key
    if (index !== -1) {
      this.values[index] = value; // If the key exists, update the value
    } else {
      this.keys.push(key);        // If the key does not exist, add the key
      this.values.push(value);    // Add the corresponding value
    }
  }

  // Method to search for a variable in the symbol table
  searchVariable(key) {
    const index = this.keys.indexOf(key); // Find the index of the key
    if (index !== -1) {
      return this.values[index]; // If the key exists, return the value
    } else {
      return null;               // If the key does not exist, return null
    }
  }

  // Method to print the contents of the symbol table (for debugging purposes)
  printTable() {
    console.log("Symbol Table:"); // Print header
    for (let i = 0; i < this.keys.length; i++) {
      console.log(this.keys[i] + ": " + this.values[i]); // Print each key-value pair
    }
  }
}

module.exports = SymbolTable; // Export the SymbolTable class for use in other parts of the application
