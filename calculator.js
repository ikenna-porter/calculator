const numbers = document.querySelectorAll('.numbers');
const notNumbers = document.querySelectorAll('.not-numbers');
const operators = document.querySelectorAll(".operators");
const input = document.querySelector('.recent-input');
const operationsList = document.querySelector('.operations-list');
const equal = document.querySelector('.equal');
const clear = document.querySelector('#clear');
const del = document.querySelector('#delete');
const posNeg = document.querySelector('.pos-neg');


let secondValue = '';
let firstValue = '';
let operation = '';
let equalsRan = false;

//Numbers KEYDOWN Event Listener
document.addEventListener("keydown", function (e) {
    numbers.forEach( num => {
        if (e.key === num.innerText) {
            if (equalsRan) {
                operationsList.innerText = firstValue; //the total is moved up to the operationsList
                equalsRan = false;
            }
            logNumOnScreen(e.key);
        }
    });
});

//Numbers Buttons CLICK Event Listener
numbers.forEach(function (num) {

    //changes background color when hovered over element
    num.addEventListener('mouseover', e => e.target.style.backgroundColor = "#563b3b");

    //reverts back to normal background color when hovered out of element5c4141
    num.addEventListener('mouseout', e => e.target.style.backgroundColor = "#5c4141");

    num.addEventListener('click', e => {
        //disable operators
        operators.forEach(operator => operator.disabled = false);
        //reverts operators back to normal background color 
        operators.forEach(operator => operator.style.backgroundColor = '#593920');
        //If equals function was performed...
        if (equalsRan) {
            operationsList.innerText = firstValue; //the total is moved up to the operationsList
            equalsRan = false;
        }

        logNumOnScreen(e);
    });
});

//notNumbers Hovering Background Change Event Listener 
notNumbers.forEach(function (notNum) {
    notNum.addEventListener('mouseover', e => e.target.style.backgroundColor = "#492f1b");
    notNum.addEventListener('mouseout', e => e.target.style.backgroundColor = "#593920");
});

//Operator Button Event Listener
operators.forEach(operator => {
//Listens for click on each operator button if firstValue is true
//If no firstValue then operator buttons are ignored
    operator.addEventListener('click', e => {
        
        if (firstValue) {
            //turns off operator buttons once they've been pressed - prevents consecutive operator button pressing
            operators.forEach(operator => operator.disabled = true);

            updateOperationsList(e);
            updateOperation(e);
            //performs the operations and stores result as firstValue / resets secondValue to null
            performOperation();
            //Saves the new operation to be performed once secondValue is declared again
            operation = e.target.classList[1];
            numbers.forEach(num => num.disabled = false); //enables numbers to be typed again
        }
    });
});

//Equal Key Event Listeners
equal.addEventListener('mouseover', e => e.target.style.backgroundColor = "#a15a23");
equal.addEventListener('mouseout', e => e.target.style.backgroundColor = "#ae642b");
equal.addEventListener('click', e => {
    if (secondValue) {
        operators.forEach(operator => operator.disabled = false);
        operationsList.innerText += ` ${secondValue} ${e.target.innerText}`; //adds secondValue to operationsList

        //performs the operations and stores result as firstValue / resets secondValue to null
        performOperation();
        operation = '';
        equalsRan = true;
    }

    if (firstValue && !operation) { //prevents number buttons from being pressed after equation:
        numbers.forEach( num => num.disabled = true); //so 1 + 2 = 3 doesn't become 1 + 2 = 3 + userInput
    }
});

//Clear Button Event Listener
clear.addEventListener('click', e => {
    operationsList.innerText = '';
    firstValue = '';
    secondValue = '';
    operation = '';
    input.innerText = '';

    //Enable all buttons
    notNumbers.forEach(nn => nn.disabled = false);
    numbers.forEach(n => n.disabled = false);
});

//Delete Button Event Listener
del.addEventListener('click', e => {
    deleteLastInput(e);
})

//Positive to Negative Button Event Listener 
posNeg.addEventListener('click', e => {
    if (input.innerText) {
        if (input.innerText[0] !== '-' && secondValue) { //adds neg to secondValue if input is pos
            secondValue = '-' + input.innerText;
            input.innerText = '-' + input.innerText;
        } else if (input.innerText[0] !== '-' && firstValue) { //adds neg to firstValue if input is pos
            firstValue = '-' + input.innerText;
            input.innerText = '-' + input.innerText;
        } else if(input.innerText[0] === '-' && secondValue) { //removes neg from secondValue if input is already neg
            secondValue = input.innerText.slice(1, input.innerText.length);
            input.innerText = input.innerText.slice(1, input.innerText.length);
        } else if (input.innerText[0] === '-' && firstValue) { //removes neg from firstValue if input is already neg
            firstValue = input.innerText.slice(1, input.innerText.length);
            input.innerText = input.innerText.slice(1, input.innerText.length);
        }
    }
});

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
        } else if (equalsRan) {
            operationsList.innerText = `${firstValue} ${e.target.innerText}`
            equalsRan = false;
        }else { //if operationsList is not empty
            operationsList.innerText += ` ${e.target.innerText}`; //then only add operator
        }
    }else if (firstValue && secondValue) {
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

        if (firstValue === Infinity) { //returns NaN if equates to Infinity and disables all functionality
            firstValue = NaN;
            equal.disabled = true;
            operators.forEach(operator => operator.disabled = true);
            numbers.forEach(number => number.disabled = true);
        }

        //Stores displays firstValue on screen once computed
        input.innerText = firstValue;

        if (firstValue === 0) { //resets calculator when result is 0
            operationsList.innerText = '0';
            firstValue = '0';
            secondValue = '';
            operation = '';
            input.innerText = '0';
        }

        //Resets secondValue to null
        secondValue = '';

    }
}

function deleteLastInput(e) {
    //runs function after a number has been inputted
    if (secondValue) {
        secondValue = secondValue.slice(0, secondValue.length - 1);
        input.innerText = secondValue;
    //only runs function when number is inputted for very first time 
    } else if (firstValue && !secondValue && !operation && !equalsRan) {  
        firstValue = firstValue.slice(0, firstValue.length - 1);
        input.innerText = firstValue;
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