const container = document.querySelector('#container');
const display = document.querySelector('#display');

const digits = [];
for (let i = 9; i >= 0; i--) {
  digits.push(i)
}
digits.forEach( (el) => {
  let digit = document.createElement('div');
  digit.innerText = el;
  container.appendChild(digit);
  digit.classList.add("digits");

  digit.onclick = () => {
    if (display.innerText !== "ANY" && display.innerText !== "NONE") { 
      display.innerText.length < 10 && display.innerText.match(/^[+−×÷]$/) === null ? 
        display.innerText += digit.innerText : 
        display.innerText = display.innerText.replace(/^[+−×÷]$/, digit.innerText);
    }
  }
});

let operator, number0, number1;

const negative = document.querySelector('#negative');
negative.onclick = () => display.innerText.match(/^[+−×÷]$/) ? 
    display.innerText = display.innerText.replace(/^[+−×÷]$/, "-") :
    display.innerText == null ? display.innerText = "-" : display.innerText == "ANY" ||  
    display.innerText == "NONE" ? null : display.innerText.includes("-") ? 
    display.innerText = display.innerText.substr(1) : 
    display.innerText = `-${display.innerText}`;

const float = document.querySelector('#float');
float.onclick = () => display.innerText.match(/^[+−×÷]$/) ?
    null : !display.innerText.includes(".") && display.innerText.match(/\d/) ? 
    display.innerText += float.innerText : null;

const clear = document.querySelector('#clear');
clear.onclick = () => {
  display.innerText = null; operator = null; number0 = null; number1 = null;
}

const backspace = document.querySelector('#backspace');
backspace.onclick = () => display.innerText == 'ANY' || display.innerText == 'NONE' ?
    display.innerText = null : display.innerText = display.innerText.slice(0,-1);

const plus = document.querySelector('#plus');
plus.onclick = () => {
  if (display.innerText.match(/\d/)) {    
    if (display.innerText !== "ANY" && display.innerText !== "NONE") {  
      operator = "+";
      number0 = +display.innerText;
      display.innerText = '+';
    }  
  }
}
const minus = document.querySelector('#minus');
minus.onclick = () => {
  if (display.innerText.match(/\d/)) {  
    if (display.innerText !== "ANY" && display.innerText !== "NONE") { 
      operator = "−";
      number0 = display.innerText;
      display.innerText = '−';
    }
  }  
}
const multiplication = document.querySelector('#multiplication');
multiplication.onclick = () => {
  if (display.innerText.match(/\d/)) {  
    if (display.innerText !== "ANY" && display.innerText !== "NONE") { 
      operator = "×";
      number0 = display.innerText;
      display.innerText = '×';
    }  
  }
}
const division = document.querySelector('#division');
division.onclick = () => {
  if (display.innerText.match(/\d/)) {  
    if (display.innerText !== "ANY" && display.innerText !== "NONE") { 
      operator = "÷";
      number0 = display.innerText;
      display.innerText = '÷';
    }
  }
}

const percent = document.querySelector('#percent');
percent.onclick = () => {
  let number = parseFloat(display.innerText);
  display.innerText.match(/^[+−×÷]$/) || display.innerText == "ANY" || display.innerText == "NONE" || display.innerText == "" || display.innerText == "." || 
  display.innerText == "-" || display.innerText == "-." ? null : operate("%", number, 100);
}

const equals = document.querySelector('#equals');
equals.onclick = () => {
  if (display.innerText.match(/\d/)) {  
    number1 = parseFloat(display.innerText);
    display.innerText.match(/^[+−×÷]$/) || display.innerText == "." || display.innerText == "-" ? 
      null : operator == "÷" && number1 == 0 ? number0 == 0 ? display.textContent = 'ANY' : 
      display.textContent = 'NONE' : operate(operator, number0, number1);
    operator = null; number0 = null; number1 = null;
    display.textContent.length > 11 ? display.textContent = display.textContent.slice(0,11) : null;
  }
}

const add = (summand0, summand1) => 
  display.innerText = parseFloat((summand0 + summand1).toFixed(8));
const subtract = (minuend, subtrahend) => 
  display.innerText = parseFloat((minuend - subtrahend).toFixed(8));
const multiply = (multiplier0, multiplier1) => 
  display.innerText = parseFloat((multiplier0 * multiplier1).toFixed(8));
const divide = (dividend, divisor) => 
  display.innerText = parseFloat((dividend / divisor).toFixed(8));

function operate(operator, number0, number1) {
  switch (operator) {
    case "+": add(number0, number1); break;
    case "−": subtract(number0, number1); break;
    case "×": multiply(number0, number1); break;
    case "÷": divide(number0, number1); break;
    case "%": divide(number0, 100); break;
  }
}
