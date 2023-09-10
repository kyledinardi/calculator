function operate(a, b, o){
    switch(o){
        case '+':
            num1 = `${a + b}`;
            display.textContent = num1;
            num2 = undefined;
            break;
        case '-':
            num1 = `${a - b}`;
            display.textContent = num1;
            num2 = undefined;
            break;
        case '*':
            num1 = `${a * b}`;
            display.textContent = num1;
            num2 = undefined;
            break;
        case '/':
            if(b === 0){
                clear();
                display.textContent = 'Error: division by zero';
                break;
            }
            else{
                num1 = `${a / b}`;
                display.textContent = num1;
                num2 = undefined;
                break;
            }
    }
}

function clear(){
    num1 = 0;
    num2 = undefined;
    op = undefined;
    display.textContent = '0';
    equalsPressed = false;
    isDecimal = false;
}

function pressNumber(numberPressed){
    if(equalsPressed){
        clear();
    }
    if(op === undefined){
        num1 += numberPressed;
        display.textContent = +num1;
    }
    else{
        if(num2 === undefined){
            num2 = numberPressed;
        }
        else{
            num2 += numberPressed;
        }
        display.textContent = +num2;
    }
}

function pressOperator(operatorPressed){
    if(num2 !== undefined){
        operate(+num1, +num2, op);
    }
    op = operatorPressed;
    equalsPressed = false;
    isDecimal = false;
}

function pressEquals(){
    if(num2 !== undefined){
        operate(+num1, +num2, op);
        equalsPressed = true;
        isDecimal = false;
    }
}

function pressDecimal(){
    if(equalsPressed){
        clear();
    }
    if(!isDecimal){
        if(op === undefined){
            num1 = removeLeadingZeroes(num1);
            num1 += '.';
            display.textContent = num1;
        }
        else{
            if(num2 === undefined){
                num2 = '0';
            }
            num2 = removeLeadingZeroes(num2);
            num2 += '.';
            display.textContent = num2;
        }
        isDecimal = true;
    }
}

function pressBackspace(){
    if(op === undefined){
        num1 = removeLeadingZeroes(num1);
        if(num1.length === 1){
            num1 = '0';
        }
        else{
            num1 = num1.slice(0, -1);
        }
        display.textContent = num1;
    }
    else{
        num2 = removeLeadingZeroes(num2);
        if(num2.length === 1){
            num2 = '0';
        }
        else{
            num2 = num2.slice(0, -1);
        }
        display.textContent = num2;
    }
}

function removeLeadingZeroes(number){
    number = `${number}`;
    if(number !== '0'){
        while (number.charAt(0) === '0'){
            number = number.slice(1);
        }
    }
    return number;
}

let num1 = '0';
let num2;
let op;
let equalsPressed = false;
let isDecimal = false;
const display = document.querySelector('p');
const clearbtn = document.querySelector('.clear');
const backspacebtn = document.querySelector('.backspace');
const numberbtns = document.querySelectorAll('.number');
const operatorbtns = document.querySelectorAll('.operator');
const decimalbtn = document.querySelector('.decimal');
const equalsbtn = document.querySelector('.equals');
clearbtn.addEventListener('click', clear);
equalsbtn.addEventListener('click', pressEquals);
decimalbtn.addEventListener('click', pressDecimal);
backspacebtn.addEventListener('click', pressBackspace);

numberbtns.forEach(numberbtn => {
    numberbtn.addEventListener('click', e => {
        pressNumber(e.target.textContent);
    });
});

operatorbtns.forEach(operatorbtn => {
    operatorbtn.addEventListener('click', e => {
        pressOperator(e.target.textContent);
    });
});