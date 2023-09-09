function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(b === 0){
        return 'Error: division by zero'
    }
    return a / b;
}

function operate(a, b, o){
    let result;
    switch(o){
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case '*':
            return multiply(a, b)
        case '/':
            return divide(a, b)
    }
}

function clear(){
    num1 = 0;
    num2 = undefined;
    op = undefined;
    display.textContent = '0';
}

let num1;
let num2;
let op;
let equalsPressed = false;
const display = document.querySelector('p');
const clearbtn = document.querySelector('.clear');
const backspacebtn = document.querySelector('.backspace');
const numberbtns = document.querySelectorAll('.number');
const operatorbtns = document.querySelectorAll('.operator');
const decimalbtn = document.querySelector('.decimal');
const equalsbtn = document.querySelector('.equals');
clear();
clearbtn.addEventListener('click', clear);

numberbtns.forEach(numberbtn => {
    numberbtn.addEventListener('click', e => {
        if(equalsPressed){
            clear();
            equalsPressed = false;
        }
        if(op === undefined){
            num1 = num1 * 10 + +e.target.textContent;
            display.textContent = num1;
        }
        else{
            if(num2 === undefined){
                num2 = +e.target.textContent;
            }
            else{
                num2 = num2 * 10 + +e.target.textContent;
            }
            display.textContent = num2;
        }
    });
});

operatorbtns.forEach(operatorbtn => {
    operatorbtn.addEventListener('click', e => {
        if(num2 !== undefined){
            num1 = operate(num1, num2, op);
            display.textContent = num1;
        }
        op = e.target.textContent;
    });
});

equalsbtn.addEventListener('click', () => {
    if(num2 !== undefined){
        num1 = operate(num1, num2, op);
        display.textContent = num1;
        equalsPressed = true;
    }
});