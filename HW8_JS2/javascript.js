// Separate functions for each operation as required 
function add(a, b) { 
    return a + b; 
}

function subtract(a, b) { 
    return a - b; 
}

function multiply(a, b) { 
    return a * b; 
}

function divide(a, b) { 
    // Handle division by zero [cite: 51, 59]
    if (b === 0) {
        return "Error: Div by 0";
    }
    return a / b; 
}

// Main function triggered by the button [cite: 60]
function calculate() {
    // Fetch values using getElementById 
    const val1 = document.getElementById('num1').value;
    const val2 = document.getElementById('num2').value;
    const op = document.getElementById('operator').value;
    const resultDisplay = document.getElementById('resultDisplay');

    // Convert strings to numbers
    const n1 = parseFloat(val1);
    const n2 = parseFloat(val2);

    // Validation: check if inputs are numbers
    if (isNaN(n1) || isNaN(n2)) {
        resultDisplay.innerText = "Please enter numbers";
        return;
    }

    let result;

    // Logic to select which math function to run
    if (op === "+") {
        result = add(n1, n2);
    } else if (op === "-") {
        result = subtract(n1, n2);
    } else if (op === "*") {
        result = multiply(n1, n2);
    } else if (op === "/") {
        result = divide(n1, n2);
    }

    // Display result rounded to 2 decimal places [cite: 52]
    if (typeof result === "string") {
        resultDisplay.innerText = result; // Display error message
    } else {
        resultDisplay.innerText = "Result = " + result.toFixed(2);
    }
}