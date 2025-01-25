let num1 = '0';
let num2;
let op;
let equalsPressed = false;
let isDecimal = false;

const ops = ['+', '-', '×', '÷'];
const display = document.querySelector('.display p');
const numberbtns = document.querySelectorAll('.number');
const operatorbtns = document.querySelectorAll('.operator');

const clearbtn = document.querySelector('.clear');
const backspacebtn = document.querySelector('.backspace');
const decimalbtn = document.querySelector('.decimal');
const equalsbtn = document.querySelector('.equals');

function clear() {
  num1 = 0;
  num2 = undefined;
  op = undefined;
  display.textContent = '0';
  equalsPressed = false;
  isDecimal = false;
}

function operate(a, b, o) {
  display.textContent = `${a} ${o} ${b} = `;
  
  switch (o) {
    case '+':
      num1 = `${a + b}`;
      break;

    case '-':
      num1 = `${a - b}`;
      break;

    case '×':
      num1 = `${a * b}`;
      break;

    case '÷':
      if (b === 0) {
        clear();
        display.textContent = 'Error: division by zero';
        return;
      }

      num1 = `${a / b}`;
      break;

    default:
  }

  num2 = undefined;
  num1 = `${Math.round(+num1 * 100000000) / 100000000}`;
  display.textContent += num1;
}

function pressNumber(numberPressed) {
  if (equalsPressed) {
    clear();
  }

  if (op === undefined) {
    num1 += numberPressed;
    num1 = `${+num1}`;
    display.textContent = num1;
  } else {
    if (num2 === undefined) {
      num2 = numberPressed;
    } else {
      num2 += numberPressed;
    }
    display.textContent += num2.slice(-1);
  }
}

function pressOperator(operatorPressed) {
  if (num2 !== undefined) {
    operate(+num1, +num2, op);
  }
  op = operatorPressed;
  if (ops.includes(display.textContent.slice(-2, -1))) {
    display.textContent = display.textContent.slice(0, -3);
  }
  display.textContent += ` ${op} `;
  equalsPressed = false;
  isDecimal = false;
}

function pressEquals() {
  if (num2 !== undefined) {
    operate(+num1, +num2, op);
    equalsPressed = true;
    isDecimal = false;
  }
}

function pressDecimal() {
  if (equalsPressed) {
    clear();
  }

  if (!isDecimal) {
    if (op === undefined) {
      num1 += '.';
      display.textContent = num1;
    } else {
      if (num2 === undefined) {
        num2 = '0';
        display.textContent += '0';
      }

      num2 += '.';
      display.textContent += '.';
    }

    isDecimal = true;
  }
}

function pressBackspace() {
  if (equalsPressed) {
    clear();
  } else if (op === undefined) {
    if (num1.length === 1) {
      num1 = '0';
    } else {
      num1 = num1.slice(0, -1);
    }

    display.textContent = num1;
  } else if (num2 === undefined) {
    op = undefined;
    display.textContent = display.textContent.slice(0, -3);
  } else {
    if (num2.length === 1) {
      num2 = undefined;
    } else {
      num2 = num2.slice(0, -1);
    }

    display.textContent = display.textContent.slice(0, -1);
  }
}

clearbtn.addEventListener('click', clear);
equalsbtn.addEventListener('click', pressEquals);
decimalbtn.addEventListener('click', pressDecimal);
backspacebtn.addEventListener('click', pressBackspace);

numberbtns.forEach((numberbtn) => {
  numberbtn.addEventListener('click', (e) => {
    pressNumber(e.target.textContent);
  });
});

operatorbtns.forEach((operatorbtn) => {
  operatorbtn.addEventListener('click', (e) => {
    pressOperator(e.target.textContent);
  });
});

document.addEventListener('keydown', (e) => {
  if (!Number.isNaN(+e.key)) {
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
      clear();
      break;

    default:
  }
});
