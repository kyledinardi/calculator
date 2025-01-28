// eslint-disable-next-line import/extensions
import { Decimal } from '../helpers/mjs/decimal.mjs';

let firstValue = '0';
let secondValue;
let operator;
let isEqualsPressed = false;
let isDecimal = false;

const operators = ['+', '-', '×', '÷'];
const display = document.querySelector('.display p');
const numberbuttons = document.querySelectorAll('.number');
const operatorbuttons = document.querySelectorAll('.operator');

const clearbutton = document.querySelector('.clear');
const backspacebutton = document.querySelector('.backspace');
const decimalbutton = document.querySelector('.decimal');
const equalsbutton = document.querySelector('.equals');

function resetCalculator() {
  display.textContent = '0';
  firstValue = '0';
  secondValue = undefined;
  operator = undefined;
  isEqualsPressed = false;
  isDecimal = false;
}

function operate(a, b, opr) {
  display.textContent = `${a} ${opr} ${b} = `;
  const decimalA = new Decimal(`${a}`);
  const decimalB = new Decimal(`${b}`);

  switch (opr) {
    case '+':
      firstValue = `${decimalA.plus(decimalB)}`;
      break;

    case '-':
      firstValue = `${decimalA.minus(decimalB)}`;
      break;

    case '×':
      firstValue = `${decimalA.times(decimalB)}`;
      break;

    case '÷':
      if (b === 0) {
        resetCalculator();
        display.textContent = 'Error: division by zero';
        return;
      }

      firstValue = `${decimalA.dividedBy(decimalB)}`;
      break;
    default:
  }

  const decimalPlaces = 16 - firstValue.split('.')[0].length - 1;
  const roundedFirstValue = new Decimal(firstValue).toFixed(decimalPlaces);
  display.textContent += new Decimal(roundedFirstValue);
  secondValue = undefined;
}

function pressNumber(numberPressed) {
  if (isEqualsPressed) {
    resetCalculator();
  }

  if (operator === undefined) {
    firstValue += numberPressed;
    firstValue = `${new Decimal(firstValue, 10)}`;
    display.textContent = firstValue;
  } else {
    if (secondValue === '0') {
      secondValue = numberPressed;
      display.textContent = display.textContent.slice(0, -1);
    } else if (secondValue === undefined) {
      secondValue = numberPressed;
    } else {
      secondValue += numberPressed;
    }

    display.textContent += numberPressed;
  }
}

function pressOperator(operatorPressed) {
  if (secondValue !== undefined) {
    operate(firstValue, secondValue, operator);
  }

  if (operators.includes(display.textContent.slice(-2, -1))) {
    display.textContent = display.textContent.slice(0, -3);
  }

  operator = operatorPressed;
  display.textContent += ` ${operator} `;
  isEqualsPressed = false;
  isDecimal = false;
}

function pressEquals() {
  if (secondValue !== undefined) {
    operate(firstValue, secondValue, operator);
    isEqualsPressed = true;
    isDecimal = false;
  }
}

function pressDecimal() {
  if (isEqualsPressed) {
    resetCalculator();
  }

  if (!isDecimal) {
    if (operator === undefined) {
      firstValue += '.';
      display.textContent = firstValue;
    } else {
      if (secondValue === undefined) {
        secondValue = '0';
        display.textContent += '0';
      }

      secondValue += '.';
      display.textContent += '.';
    }

    isDecimal = true;
  }
}

function pressBackspace() {
  if (isEqualsPressed) {
    resetCalculator();
  } else if (operator === undefined) {
    if (firstValue.length === 1) {
      firstValue = '0';
    } else {
      firstValue = firstValue.slice(0, -1);
    }

    display.textContent = firstValue;
  } else if (secondValue === undefined) {
    operator = undefined;
    display.textContent = display.textContent.slice(0, -3);
  } else {
    if (secondValue.length === 1) {
      secondValue = undefined;
    } else {
      secondValue = secondValue.slice(0, -1);
    }

    display.textContent = display.textContent.slice(0, -1);
  }
}

clearbutton.addEventListener('click', resetCalculator);
equalsbutton.addEventListener('click', pressEquals);
decimalbutton.addEventListener('click', pressDecimal);
backspacebutton.addEventListener('click', pressBackspace);

numberbuttons.forEach((numberbutton) =>
  numberbutton.addEventListener('click', (e) => {
    pressNumber(e.target.textContent);
  }),
);

operatorbuttons.forEach((operatorbutton) =>
  operatorbutton.addEventListener('click', (e) => {
    pressOperator(e.target.textContent);
  }),
);

document.addEventListener('keydown', (e) => {
  if (!Number.isNaN(parseInt(e.key, 10))) {
    pressNumber(e.key);
  }

  switch (e.key) {
    case '+':
    case '-':
    case '*':
    case '/':
      e.preventDefault();
      pressOperator(e.key);
      break;

    case '.':
      pressDecimal();
      break;

    case 'Backspace':
      pressBackspace();
      break;

    case '=':
    case 'Enter':
      pressEquals();
      break;

    case 'Escape':
    case 'Delete':
      resetCalculator();
      break;

    default:
  }
});
