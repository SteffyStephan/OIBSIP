const display = document.getElementById("display");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const decimal = document.querySelector(".decimal");
const equals = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");

let firstNumber = "";
let secondNumber = "";
let currentOperator = "";

function updateDisplay(value) {
    display.value = value;
}

// Number Buttons
numbers.forEach(button => {
    button.addEventListener("click", () => {
        display.value += button.textContent;
    });
});

// Decimal Button
decimal.addEventListener("click", () => {

    let currentValue = display.value;

    // If typing second number
    if (currentOperator !== "") {
        let parts = currentValue.split(currentOperator);

        if (!parts[1].includes(".")) {
            display.value += ".";
        }
    }

    // If typing first number
    else {

        if (!currentValue.includes(".")) {
            display.value += ".";
        }

    }

});

// Operator Buttons
operators.forEach(button => {

    button.addEventListener("click", () => {

        if (display.value === "") return;

        // Continue calculation if already exists
        if (firstNumber !== "" && currentOperator !== "") {
            calculate();
        }

        firstNumber = display.value;
        currentOperator = button.textContent;

        display.value += currentOperator;

    });

});

// Equals
equals.addEventListener("click", () => {

    if (firstNumber === "" || currentOperator === "") return;

    calculate();

});

// Clear
clearBtn.addEventListener("click", () => {

    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    updateDisplay("");

});

// Delete
deleteBtn.addEventListener("click", () => {

    display.value = display.value.slice(0, -1);

});

// Calculate
function calculate() {

    let parts = display.value.split(currentOperator);

    if (parts.length < 2) return;

    firstNumber = parts[0];
    secondNumber = parts[1];

    let num1 = parseFloat(firstNumber);
    let num2 = parseFloat(secondNumber);

    let result;

    switch (currentOperator) {

        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "*":
            result = num1 * num2;
            break;

        case "/":

            if (num2 === 0) {
                updateDisplay("Error");
                firstNumber = "";
                secondNumber = "";
                currentOperator = "";
                return;
            }

            result = num1 / num2;
            break;

    }

    display.value = result;

    firstNumber = result.toString();
    secondNumber = "";
    currentOperator = "";

}