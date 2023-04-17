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

let hasOperator = false;
let canConcat = true;
let storedOperator;
let storedNumber;

let display = document.querySelector("#display");

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
        if (display.textContent.includes(".")) { //can't add a decimal if there is already a decimal
            return;
        } else if (display.textContent === "0" && (digit !== "." || digit === "0")) { //can't add a numeric digit or another 0 after 0 -- remove the leading zero
            display.textContent = digit;
        } else {
            display.textContent += digit;
        }
    } else {
        display.textContent = "0";
        canConcat = true;
        pressNumber(digit);
    }
}

//maintain string as number
//store an operator and one number, boolean hasOperator
//maintain canConcat
//access display bar


/*gotchas:

can't concat numbers to the result of an operation - only if the number started at 0
can you parse a number that ends in a decimal?
round numbers to a certain max number of decimal places

*/