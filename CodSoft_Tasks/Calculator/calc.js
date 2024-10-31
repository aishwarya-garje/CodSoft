let display = document.getElementById('display');
let history = document.getElementById('history');
let expression = '';
let resultDisplayed = false;

function clearDisplay() {
  expression = '';
  display.innerText = '0';
  resultDisplayed = false;
}

function deleteLast() {
  if (!resultDisplayed) {
    expression = expression.slice(0, -1);
    display.innerText = expression || '0';
  }
}

function inputNumber(num) {
  if (resultDisplayed) {
    expression = '';
    resultDisplayed = false;
  }
  expression += num;
  display.innerText = expression;
}

function inputOperator(op) {
  if (!resultDisplayed && expression !== '') {
    expression += ` ${op} `;
    display.innerText = expression;
  }
}

function calculate() {
  try {
    const result = eval(expression.replace(/×/g, '*').replace(/÷/g, '/'));
    addHistoryItem(`${expression} = ${result}`);
    display.innerText = result.toString().slice(0, 12);
    expression = result.toString();
    resultDisplayed = true;
  } catch (error) {
    display.innerText = 'Error';
  }
}

function addHistoryItem(item) {
  const historyItem = document.createElement('div');
  historyItem.classList.add('history-item');
  historyItem.innerText = item;
  history.prepend(historyItem);
}

function clearHistory() {
  history.innerHTML = '';
}
