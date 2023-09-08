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
    return a / b;
}

function operate(num1, num2, op){
    switch(op){
        case '+':
            return add(num1, num2)
        case '+-':
            return subtract(num1, num2)
        case '*':
            return multiply(num1, num2)
        case '/':
            return divide(num1, num2)
    }
}

let num1;
let num2;
let op;
