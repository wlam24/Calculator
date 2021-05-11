const button = document.querySelector(".number-calc");
const input = document.querySelector("input");
const clear = document.querySelector(".clear");
const operators = document.querySelector(".operators");
let state = null;
let previousVal = null;
let currentVal = null;
let newCalc = true;


const display = (event) => {
  let digit = event.target.textContent;
  if (event.target.localName === "button") {
    if (!state) {
      if (input.value.includes(".") && digit === ".") {
        return;
      }
      if (input.value === "0" || newCalc) {
        input.value = digit;
        newCalc = false;
      } else {
        input.value = input.value + digit;
      }
    } else {
      if (currentVal && currentVal.includes(".") && digit === ".") {
        return;
      }
    }
    if (state === "addition") {
      if (!previousVal) {
        previousVal = input.value;
        input.value = digit; 
      } else {
        input.value = input.value + digit;
      }
      currentVal = input.value;
    }
    if (state === "subtraction") { 
      if (!previousVal) {
        previousVal = input.value; 
        input.value = digit; 
      } else {
        input.value = input.value + digit;
      }
      currentVal = input.value;
    }
    if (state === "multiply") {
      if (!previousVal) {
        previousVal = input.value;
        input.value = digit;
      } else {
        input.value = input.value + digit;
      }
      currentVal = input.value;
    }
    if (state === "divide") {
      if (!previousVal) {
        previousVal = input.value;
        input.value = digit;
      } else {
        input.value = input.value + digit;
      }
      currentVal = input.value;
    }
  }
};

const operatorButtons = (event) => {
  if (event.target.className === "equal") {
    if (previousVal && currentVal) {
      if (state === "addition") {
        input.value = Number(previousVal) + Number(currentVal);
      }
      if (state === "subtraction") {
        input.value = Number(previousVal) - Number(currentVal);
      }
      if (state === "multiply") {
        input.value = Number(previousVal) * Number(currentVal);
      }
      if (state === "divide") {
        input.value = Number(previousVal) / Number(currentVal);
      }
      state = null;
      previousVal = null;
      currentVal = null;
      newCalc = true;
    }
    if (!previousVal && !currentVal) {
      state = null;
      newCalc = true;
    }

  } else {
    if (input.value) { 
      if(previousVal && currentVal) {
        if (state === "addition") {
          input.value = Number(previousVal) + Number(currentVal);
        }
        if (state === "subtraction") {
          input.value = Number(previousVal) - Number(currentVal); // null - null = 0
        }
        if (state === "multiply") {
          input.value = Number(previousVal) * Number(currentVal) || 0;
        }
        if (state === "divide") {
          input.value = Number(previousVal) / Number(currentVal) || 0; // truthy prioritizes over false (in other words, NaN || 0; 0 wins)
        }
      }
      previousVal = null;
      currentVal = null;
      state = event.target.className;
    }
  }
};

const clearButton = () => {
  state = null;
  previousVal = null;
  currentVal = null;
  input.value = "0";
};

button.addEventListener("click", display);
clear.addEventListener("click", clearButton);
operators.addEventListener("click", operatorButtons);
