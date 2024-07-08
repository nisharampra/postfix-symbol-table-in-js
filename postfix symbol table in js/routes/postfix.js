// //routes/postfix.js


const express = require('express');
const router = express.Router();
const SymbolTable = require('../SymbolTable'); // Import the SymbolTable module

// GET route to render the postfix expression evaluator page
router.get('/', (req, res) => {
  res.render('postfix');
});



// POST route to evaluate the provided postfix expression
router.post('/evaluate', (req, res) => {
  const variablesInput = req.body.variables; // Get the variables input from the request body
  const expression = req.body.expression; // Get the postfix expression from the request body

  const symbolTable = new SymbolTable(); // Create a new symbol table instance
  const variablePairs = variablesInput.split(','); // Split the variables input into an array of pairs

  // Regular expression to match variable format like a3=, b2=
  const regex = /^([a-zA-Z])(\d+)=$/;

  // Insert each variable into the symbol table
  variablePairs.forEach(pair => {
    const matches = pair.match(regex); // Match the format "A2="
    if (matches) {
      const key = matches[1];
      const value = parseFloat(matches[2]);
      symbolTable.insertVariable(key, value); // Insert the variable into the symbol table
    } else {
      res.render('postfix', { result: `Invalid variable format: ${pair}` }); // Handle invalid format
      return; // Exit early if format is invalid
    }
  });

  try {
    const result = evaluatePostfix(expression, symbolTable); // Evaluate the postfix expression
    res.render('postfix', { result }); // Render the result on the postfix page
  } catch (error) {
    res.render('postfix', { result: `Error: ${error.message}` }); // Render the error message on the postfix page
  }
});

// Function to evaluate a postfix expression using the symbol table
function evaluatePostfix(expression, symbolTable) {
  const stack = []; // Initialize an empty stack

  // Iterate through each character in the expression
  for (let char of expression) {
    if (!isNaN(char)) {
      stack.push(parseFloat(char)); // If the character is a number, push it onto the stack
    } else if (char >= 'a' && char <= 'z') {
      const value = symbolTable.searchVariable(char); // Search for the variable value in the symbol table
      if (value === null) {
        throw new Error(`Variable ${char} not found in symbol table`); // Throw an error if the variable is not found
      }
      stack.push(value); // Push the variable value onto the stack
    } else {
      const b = stack.pop(); // Pop the top value from the stack
      const a = stack.pop(); // Pop the next top value from the stack
      // Perform the appropriate operation based on the operator
      switch (char) {
        case '*':
          stack.push(a * b);
          break;
        default:
          throw new Error(`Unsupported operator: ${char}`); // Throw an error if the operator is not supported
      }
    }
  }

  if (stack.length !== 1) {
    throw new Error(`Invalid expression: ${expression}`); // Throw an error if there are too many values in the stack
  }

  return stack.pop(); // Return the final result from the stack
}


// Function to evaluate a postfix expression using the symbol table
function evaluatePostfix(expression, symbolTable) {
  const stack = []; // Initialize an empty stack

  // Iterate through each character in the expression
  for (let char of expression) {
    if (!isNaN(char)) {
      stack.push(parseFloat(char)); // If the character is a number, push it onto the stack
    } else if (char >= 'a' && char <= 'z') {
      const value = symbolTable.searchVariable(char); // Search for the variable value in the symbol table
      if (value === null) {
        throw new Error(`Variable ${char} not found in symbol table`); // Throw an error if the variable is not found
      }
      stack.push(value); // Push the variable value onto the stack
    } else {
      const b = stack.pop(); // Pop the top value from the stack
      const a = stack.pop(); // Pop the next top value from the stack
      // Perform the appropriate operation based on the operator
      switch (char) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          stack.push(a / b);
          break;
        default:
          throw new Error(`Unsupported operator: ${char}`); // Throw an error if the operator is not supported
      }
    }
  }

  return stack.pop(); // Return the final result from the stack
}

module.exports = router; // Export the router for use in other parts of the application
