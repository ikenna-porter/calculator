const number = document.querySelector('.number');
const input = document.querySelector('.recent-input');

let firstValue = 0;
let secondValue = 0;
number.addEventListener('click', e => {
    let displayValue = e.target.innerText;
    input.innerText = `${displayValue}`;
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