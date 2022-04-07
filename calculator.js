const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll(".operators");
const input = document.querySelector('.recent-input');
const operationsList = document.querySelector('.operations-list');


let secondValue = '';
let firstValue = '';
let operation = '';

//Listens for "click" on numbers and prints number on screen
numbers.forEach(function (num) {
    num.addEventListener('click', e => {
        //logs first number on screen / allows first number to be 2+ digits
        if ((!firstValue && !operation) || (firstValue && !operation)) {
            firstValue += e.target.innerText;
            input.innerText = firstValue;
        } else if (firstValue && operation) {
            secondValue += e.target.innerText; //declare secondValue label
            console.log(`first value: ${firstValue}`);
            console.log(`second value: ${secondValue}`);

            input.innerText = secondValue;
            //performs correct operation in accordance with the value from operation label

        }
    });
});

//Listens for click on each operator button if firstValue is true
//If no firstValue then operator buttons are ignored
operators.forEach(operator => {
    operator.addEventListener('click', e => {
        if (firstValue && !secondValue) {
            if (!operationsList.innerText) {
                operationsList.innerText += `${firstValue} ${e.target.innerText}`;
                // firstValue = '';
                operation = e.target.classList[1];
            } else {
                operationsList.innerText += ` ${e.target.innerText}`;
                // firstValue = '';
                operation = e.target.classList[1];
            }
        } else if (firstValue && secondValue) {
            operationsList.innerText += ` ${secondValue} ${e.target.innerText}`; //adds secondValue to operationsList

            if (operation === 'add') {
                firstValue = operate(firstValue, secondValue, add);
            } else if (operation === 'subtract') {
                firstValue = operate(firstValue, secondValue, subtract);
            } else if (operation === 'multiply') {
                firstValue = operate(firstValue, secondValue, multiply);
            } else if (operation === 'divide') {
                firstValue = operate(firstValue, secondValue, divide);
            };
            //Stores the computed result as the new firstValue
            input.innerText = firstValue;
            //Resets secondValue to null
            secondValue = '';
            //Saves the new operation to be performed once secondValue is declared again
            operation = e.target.classList[1];



        }
    });
});




function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    return Number(a) / Number(b);
}

function operate(a, b, func) {
    return func(Number(a), Number(b));
}