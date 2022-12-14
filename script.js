const container      = document.querySelector('#container'),
      display        = document.querySelector('#display'),
      clear          = document.querySelector('#clear'),
      backspace      = document.querySelector('#backspace'),
      float          = document.querySelector('#float'),
      negative       = document.querySelector('#negative'),
      equals         = document.querySelector('#equals'),
      plus           = document.querySelector('#plus'),
      minus          = document.querySelector('#minus'),
      multiplication = document.querySelector('#multiplication'),
      division       = document.querySelector('#division'),
      percent        = document.querySelector('#percent');

let operator,
    number0,
    number1;

function operate(operator, number0, number1) {
  switch (operator) {
    case "+": add(number0, number1);      break;
    case "−": subtract(number0, number1); break;
    case "×": multiply(number0, number1); break;
    case "÷": divide(number0, number1);   break;
    case "%": divide(number0, 100);       break;
  }
}

function add(summand0, summand1) {
  display.innerText = parseFloat( (summand0 + summand1).toFixed(2) );
}
function subtract(minuend, subtrahend) {
  display.innerText = parseFloat( (minuend - subtrahend).toFixed(2) );
}
function multiply(multiplier0, multiplier1) {
  display.innerText = parseFloat( (multiplier0 * multiplier1).toFixed(2) );
}
function divide(dividend, divisor) {
  display.innerText = parseFloat( (dividend / divisor).toFixed(2) );
}

plus.onclick           = () => addOper("+");
minus.onclick          = () => addOper("−");
multiplication.onclick = () => addOper("×");
division.onclick       = () => addOper("÷");

function addOper(oper) {
  if (display.innerText.match(/\d/) )
  {
    operator          = oper;
    number0           = +display.innerText;
    display.innerText = oper;
  }  
  else if (display.innerText.match(/[+−×÷]/) )
  {
    operator          = oper;
    display.innerText = oper;
  }
  scaleDisplay();
}

function scaleDisplay() {
  if (display.innerText.length > 11) {
    switch (display.innerText.length) {
      case 25: display.style.fontSize = '1.7rem'; break;
      case 24: display.style.fontSize = '1.8rem'; break;
      case 23: display.style.fontSize = '1.9rem'; break;
      case 22: display.style.fontSize = '2.0rem'; break;
      case 21: display.style.fontSize = '2.1rem'; break;
      case 20: display.style.fontSize = '2.2rem'; break;
      case 19: display.style.fontSize = '2.3rem'; break;
      case 18: display.style.fontSize = '2.4rem'; break;
      case 17: display.style.fontSize = '2.6rem'; break;
      case 16: display.style.fontSize = '2.8rem'; break;
      case 15: display.style.fontSize = '3.0rem'; break;
      case 14: display.style.fontSize = '3.2rem'; break;
      case 13: display.style.fontSize = '3.4rem'; break;
      case 12: display.style.fontSize = '3.6rem'; break;
    }
  } else display.style.fontSize = '3.8rem';
}

percent.onclick = () => {
  let number = parseFloat(display.innerText);
  
  if (!display.innerText.match(/^[+−×÷]$/) &&
      display.innerText != 'ANY'    && display.innerText != 'NONE'    &&
      display.innerText != Infinity && display.innerText != -Infinity &&
      display.innerText != "-"      && display.innerText != "")
  {      
    operate("%", number, 100);
    scaleDisplay();
  }
  else indicateButtonState(percent, '#9812c9');
} //                                  purple

function indicateButtonState(key, initialColor) {
  key.style.backgroundColor   = 'red';
  key.style.color             = '#00ff08';
  key.onmouseout = () => {   // bright green
    key.style.backgroundColor = 'white';
    key.style.color           = initialColor;
  }
}

equals.onclick = () => {
  if (display.innerText.match(/\d/) ) {
    number1 = parseFloat(display.innerText);

    if (operator == "÷" && number1 == 0)
       display.innerText = number0 == 0 ? 'ANY' : 'NONE';
      //                     0 ÷ 0 == ALL numbers fit
      //                    !0 ÷ 0 == NONE of numbers fit
    else {
      operate(operator, number0, number1);
      scaleDisplay();
    }
    operator = null;
    number0  = null;
    number1  = null;
  }
}

const digits = [];
for (let i = 9; i >= 0; i--) {
  digits.push(i);
}
digits.forEach(el => {
  let digit = document.createElement('div');
  digit.innerText = el;
  container.appendChild(digit);

  digit.onclick = () => {
    if (!display.innerText.match(/^[+−×÷]$/) )
    {
      if (display.innerText != 'ANY'    && display.innerText != 'NONE'    &&
          display.innerText != Infinity && display.innerText != -Infinity &&
          display.innerText.length < 25)
      {
        display.innerText += digit.innerText;
      }
      else indicateButtonState(digit, 'green');
      scaleDisplay();
    }
    else display.innerText = display.innerText.replace(/^[+−×÷]$/, digit.innerText);
  }
  digit.classList.add("digits");
});

clear.onclick = () => {
  if (display.innerText != "")
  {
    display.innerText = null;
    operator          = null;
    number0           = null;
    number1           = null;
    scaleDisplay();
  }
  else indicateButtonState(clear, 'red');
}

backspace.onclick = () => {
  if (display.innerText.match(/[+−×÷]/) )
  {
    display.innerText = number0;
    operator          = null;
  }
  else if (display.innerText == 'ANY' || display.innerText == 'NONE' ||
      display.innerText == Infinity   || display.innerText == -Infinity)
  {
    display.innerText = null;
  }
  else if (display.innerText.length == 1)
  {
    if (operator) display.innerText = operator;
    else display.innerText = "";
    number1 = null;
  }
  else if (display.innerText == "") indicateButtonState(backspace, 'orange');
  else display.innerText = display.innerText.slice(0, -1);
  scaleDisplay();
}

float.onclick = () => {
  if (!display.innerText.includes(".") &&
      display.innerText.match(/\d/) && display.innerText.length < 25)
  {
    display.innerText += float.innerText;
  }
  else indicateButtonState(float, 'green');
  scaleDisplay();
}

negative.onclick = () => {
  if (display.innerText == "") display.innerText = "-";
  else if (display.innerText == "-") {
    display.innerText = operator ? operator : "";
    number1 = null;
  }
  else if (display.innerText.match(/^[+−×÷]$/) ) {
    display.innerText = display.innerText.replace(/^[+−×÷]$/, "-");
  }
  else if (display.innerText.includes("-") ) {
    display.innerText = display.innerText.substr(1);
  } 
  else if (display.innerText.length < 25 &&
      display.innerText != 'ANY' && display.innerText != 'NONE')
  {
    display.innerText = `-${display.innerText}`;
  }
  else indicateButtonState(negative, 'green');
  scaleDisplay();
}
