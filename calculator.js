const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll(".operators");
const input = document.querySelector('.recent-input');
const operationsList = document.querySelector('.operations-list');
const equal = document.querySelector('.equal');


let secondValue = '';
let firstValue = '';
let operation = '';
let equalsRan = false;

//Listens for "click" on numbers and prints number on screen
numbers.forEach(function (num) {
    num.addEventListener('click', e => {
        operators.forEach(operator => operator.disabled = false);
        //If equals function was performed...
        if (equalsRan) {
            operationsList.innerText = firstValue; //the total is moved up to the operationsList
            equalsRan = false;
        }
        logNumOnScreen(e);
    });
});


//Listens for click on each operator button if firstValue is true
//If no firstValue then operator buttons are ignored
operators.forEach(operator => {
    operator.addEventListener('click', e => {
        operators.forEach(operator => operator.disabled = true);
        updateOperationsList(e);
        updateOperation(e);
        //performs the operations and stores result as firstValue / resets secondValue to null
        performOperation();

        //Saves the new operation to be performed once secondValue is declared again
        operation = e.target.classList[1];
    });
});

equal.addEventListener('click', e => {
    operators.forEach(operator => operator.disabled = false);
    operationsList.innerText += ` ${secondValue} ${e.target.innerText}`; //adds secondValue to operationsList

    //performs the operations and stores result as firstValue / resets secondValue to null
    performOperation();
    operation = '';
    equalsRan = true;
})


function logNumOnScreen(e) {
    //logs number on screen / allows first number to be 2+ digits
    if ((!firstValue && !operation) || (firstValue && !operation)) {
        firstValue += e.target.innerText;
        input.innerText = firstValue;
    } else if (firstValue && operation) {
        secondValue += e.target.innerText; //declare secondValue label
        input.innerText = secondValue;
    }
}

function updateOperationsList(e) {
    if (firstValue && !secondValue) { //if firstValue declared and secondValue not
        if (!operationsList.innerText) { //if operationsList is empty
            operationsList.innerText += `${firstValue} ${e.target.innerText}`; //then add firstVal + operation
        } else { //if operationsList is not empty
            operationsList.innerText += ` ${e.target.innerText}`; //then only add operator
        }
    } else if (firstValue && secondValue) {
        operationsList.innerText += ` ${secondValue} ${e.target.innerText}`; //adds secondValue to operationsList
    }
}

function updateOperation(e) {

    if (firstValue && !secondValue) { //if firstValue declared and secondValue not
        if (!operationsList.innerText) { //if operationsList is empty
            operation = e.target.classList[1]; //operation label equal to its second class
        } else { //if operationsList is not empty
            operation = e.target.classList[1]; //changes operation label to equal its second class.
        }
    }
}

function performOperation() {

    if (firstValue && secondValue) {
        if (operation === 'add') {
            firstValue = operate(firstValue, secondValue, add);
        } else if (operation === 'subtract') {
            firstValue = operate(firstValue, secondValue, subtract);
        } else if (operation === 'multiply') {
            firstValue = operate(firstValue, secondValue, multiply);
        } else if (operation === 'divide') {
            firstValue = operate(firstValue, secondValue, divide);
        };
        //Stores displays firstValue on screen once computed
        input.innerText = firstValue;
        //Resets secondValue to null
        secondValue = '';
    }
}

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