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
let canConcat;
let storedOperator;
let storedNumber;
let canEvaluate;

let display = document.querySelector("#display");

function displayNumber(n) {
    let displayString = ""+n;
    if ((displayString.includes(".") && displayString.indexOf(".") > MAX_DISPLAY_LEN) || //reset the number to 0 if the number of digits pre-decimal point exceeds max display length
        (!displayString.includes(".") && displayString.length > MAX_DISPLAY_LEN)) {
            displayNumber(0);
    } else {
        display.textContent = displayString.substring(0, MAX_DISPLAY_LEN);
    }
}

function negate() {
    displayNumber(-1*Number(display.textContent));
}

function clearAll() {
    clearDisplay();
    storedOperator = "";
    storedNumber = 0;
    canEvaluate = false;
}

/**
 * Clear the display, enabling digits to be entered on the keypad. Does not clear the stored operator or number.
 */
function clearDisplay() {
    displayNumber(0)
    canConcat = true;
}

function evaluate() {
    if(!canEvaluate) {
        return;
    }
    if (storedOperator !== "") {
        displayNumber(operate(storedNumber, storedOperator, Number(display.textContent)));
        storedOperator = "";
    }
    canConcat = false;
    canEvaluate = false;
}

function pressOperator(operator) {
    if(storedOperator !== "") {
        evaluate();
    }
    storedOperator = operator;
    storedNumber = Number(display.textContent);
    canConcat = false;
}

function pressNumber(digit) {
    if (canConcat) { //can only add digits right after pressing an operator or clearing
        if(display.textContent.length < MAX_DISPLAY_LEN) {
            if (digit === "." && display.textContent.includes(".")) { //can't add a decimal if there is already a decimal
                return;
            } else if (display.textContent === "0" && (digit !== "." || digit === "0")) { //can't add a numeric digit or another 0 after 0 -- remove the leading zero
                display.textContent = digit;
            } else {
                display.textContent += digit;
            }
        }
    } else if (storedOperator !== "") {
        canEvaluate = true;
        clearDisplay();
        pressNumber(digit);
    } else {
        clearAll();
        pressNumber(digit);
    }
}


//create button layout
let callbacks = {};
const DIGITS = "0123456789.";
const OPERATORS = "+-*/";
for (let c of DIGITS) {
    callbacks[c] = pressNumber;
}
for (let c of OPERATORS) {
    callbacks[c] = pressOperator;
}
callbacks["+/-"] = negate;
callbacks["="] = evaluate;
callbacks["Clear"] = clearAll;

let container = document.querySelector("#container");
const buttonLayout = [["7", "8", "9", "+"], ["4", "5", "6", "-"], ["1", "2", "3", "*"], ["+/-", "0", ".", "/"], ["=", "Clear"]];
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

clearAll();

/*gotchas and solutions:

can't concat numbers to the result of an operation -- track canConcat
can you parse a number that ends in a decimal? -- yes
round numbers to a certain max length -- use substrings and overflow handling
don't let the user enter characters if the display is too full -- track length of display.textContent
if the user presses one operator and then another without pressing any digits in between, you don't want to perform the first operation -- track canEvaluate

*/