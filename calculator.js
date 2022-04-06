const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll(".operators");
const input = document.querySelector('.recent-input');
const operationsList = document.querySelector('.operations-list');


let secondValue = '';
let firstValue = '';
let displayValue = input.innerText
let operation;

//Listens for "click" on numbers and prints number on screen
numbers.forEach(function (num) {
    num.addEventListener('click', e => {
        firstValue += e.target.innerText;
        displayValue = firstValue;
    });
});

//Listens for click on each operator button if firstValue is true
operators.forEach(operator => {
    operator.addEventListener('click', e => {
        if (firstValue) {
            operationsList.innerText += `${firstValue} ${e.target.innerText} `;
            firstValue = '';
            operation = e.target.classList[1];
        }
    });
});


//Listens for click on one of the numebers if firstValue and operation are defined
numbers.forEach(function (num) {
    num.addEventListener('click', e => {
        if (firstValue && operation) {
            secondValue = e.target.innerText; //declare secondValue label
            operationsList.innerText += ` ${secondValue} `; //adds secondValue to operationsList
            //performs correct operation in accordance with the value from operation label
            if (operation === 'add') {
                console.log(firstValue);
                console.log(secondValue);
                console.log(operate(firstValue, secondValue, add));
            } else if (operation === 'subtract') {
                operate(firstValue, secondValue, subtract);
            } else if (operation === 'multiply') {
                operate(firstValue, secondValue, multiply);
            } else if (operation === 'divide') {
                operate(firstValue, secondValue, divide);
            }
        }
    });
});







function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(a, b, func) {
    return func(a, b)
}