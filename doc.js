document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll("button");

  function clearDisplay() {
    display.value = "";
    console.log("Display vacío");
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      if (value === "C") {
        clearDisplay();
      } else if (value === "=") {
        calculate();
      } else {
        appendValue(value);
      }
    });
  });

  function appendValue(value) {
    display.value = display.value + value;
  }

  function calculate() {
    let expression = display.value;

    expression = expression.replace("÷", "/");
    expression = expression.replace("x", "*");
    expression = expression.replace("%", "/100");

    try {
      const result = evaluateExpression(expression);
      display.value = result;
    } catch (error) {
      display.value = "Error";
    }
  }

  function Percentage() {
    const percentageValue = currentValue / 100;
    display.value = percentageValue;
  }

  function evaluateExpression(expression) {
    const symbols = expression.match(/(\d+(\.\d+)?|\+|\-|\*|\/)/g);
    if (!symbols) {
      return "Error";
    }

    let currentResult = parseFloat(symbols[0]);

    for (let i = 1; i < symbols.length; i += 2) {
      const operator = symbols[i];
      const nextValue = parseFloat(symbols[i + 1]);

      switch (operator) {
        case "+":
          currentResult = add(currentResult, nextValue);
          break;
        case "-":
          currentResult = subtract(currentResult, nextValue);
          break;
        case "*":
          currentResult = multiply(currentResult, nextValue);
          break;
        case "/":
          currentResult = divide(currentResult, nextValue);
          break;
        default:
          return "Error";
      }
    }

    return currentResult;
  }

  function add(a, b) {
    return a + b;
  }

  function subtract(a, b) {
    return a - b;
  }

  function multiply(a, b) {
    return a * b;
  }

  function divide(a, b) {
    if (b === 0) {
      return "Error";
    }
    return a / b;
  }
});
