function operate(n1, operator, n2) {
    switch(operator) {
        case "+":
            return n1 + n2;
        case "-":
            return n1 - n2;
        case "*":
            return n1 * n2;
        case "/":
            return n1 / n2;
    }
}

const MAX_DISPLAY_LEN = 10;
let hasOperator;
let canConcat;
let storedOperator;
let storedNumber;

let display = document.querySelector("#display");

function negate(placeholder) {

}

function clear(placeholder) {
    display.textContent = "0";
    canConcat = true;
    hasOperator = false;
}

function pressOperator(operator) {
    if (hasOperator) {
        storedNumber
    } else {
        hasOperator = true;
        storedOperator = operator;
    }
}

function pressNumber(digit) {
    if (canConcat) {
        if (digit === "." && display.textContent.includes(".")) { //can't add a decimal if there is already a decimal
            return;
        } else if (display.textContent === "0" && (digit !== "." || digit === "0")) { //can't add a numeric digit or another 0 after 0 -- remove the leading zero
            display.textContent = digit;
        } else {
            display.textContent += digit;
        }
    } else {
        clear();
        pressNumber(digit);
    }
}

//layout: div for digits, div for operator

let callbacks = {};
let DIGITS = "0123456789.";
let OPERATORS = "+-*/=";
for (let c of DIGITS) {
    callbacks[c] = pressNumber;
}
for (let c of OPERATORS) {
    callbacks[c] = pressOperator;
}
callbacks["+/-"] = negate;
callbacks["Clear"] = clear;

let container = document.querySelector("#container");
let buttonLayout = [["7", "8", "9", "+"], ["4", "5", "6", "-"], ["1", "2", "3", "*"], ["+/-", "0", ".", "/"], ["=", "Clear"]];
for (let r of buttonLayout) {
    let row = document.createElement("div");
    for (let btnVal of r) {
        let btn = document.createElement("button");
        btn.textContent = btnVal;
        btn.addEventListener("click", (e) => callbacks[btnVal](e.target.textContent));
        row.appendChild(btn);
    }
    container.appendChild(row);
}

clear();

//maintain string as number
//store an operator and one number, boolean hasOperator
//maintain canConcat
//access display bar


/*gotchas:

can't concat numbers to the result of an operation - only if the number started at 0
can you parse a number that ends in a decimal?
round numbers to a certain max number of decimal places
don't let the user enter characters if the display is too full

*/