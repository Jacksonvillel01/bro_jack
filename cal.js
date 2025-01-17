// Select the display element and buttons
const display = document.querySelector('.display p');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousInput = '';
let operator = '';

// Add click event listeners to all buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('gold')) {
      handleOperator(value);
    } else if (value === 'AC') {
      clearAll();
    } else if (value === '±') {
      toggleSign();
    } else if (value === '%') {
      convertToPercentage();
    } else if (value === '.') {
      addDecimal();
    } else {
      handleNumber(value);
    }
  });
});

// Update the display
function updateDisplay() {
  display.textContent = currentInput || '0';
}

// Clear all inputs
function clearAll() {
  currentInput = '';
  previousInput = '';
  operator = '';
  updateDisplay();
}

// Handle number inputs
function handleNumber(value) {
  if (currentInput.length < 10) {
    currentInput += value;
    updateDisplay();
  }
}

// Handle operator inputs
function handleOperator(value) {
  if (currentInput === '' && previousInput === '') return;

  if (currentInput && previousInput && operator) {
    calculate();
  }

  operator = value;
  previousInput = currentInput;
  currentInput = '';
}

// Perform the calculation
function calculate() {
  let result = 0;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
    case '+':
      result = prev + curr;
      break;
    case '−':
      result = prev - curr;
      break;
    case '×':
      result = prev * curr;
      break;
    case '÷':
      if (curr === 0) {
        alert("Cannot divide by 0");
        clearAll();
        return;
      }
      result = prev / curr;
      break;
  }

  currentInput = result.toString();
  operator = '';
  previousInput = '';
  updateDisplay();
}

// Toggle the sign of the current input
function toggleSign() {
  if (currentInput) {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
  }
}

// Convert the current input to a percentage
function convertToPercentage() {
  if (currentInput) {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
  }
}

// Add a decimal point
function addDecimal() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay();
  }
}

// Initialize display
updateDisplay();