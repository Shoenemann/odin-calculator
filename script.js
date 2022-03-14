/* basic math operations */

function add (a,b) {
    return a+b
}

function subtract (a,b) {
    return a-b
}

function multiply (a,b) {
    return a*b
}

function divide (a,b) {
    if (b===0) return "ERRORDIVIDE0"
    return a/b
}

function operate (operator,a,b) {
    switch (operator) {
        case '+':
            return add(a,b)
            break
        case '-':
            return subtract(a,b)
            break
        case '*':
            return multiply(a,b)
            break
        case '/': 
            return divide(a,b)
            break
    }
}


/* Interaction with html */

const divLeftNumber = document.querySelector('.display .left')
const divRightNumber = document.querySelector('.display .right')
const divOnScreenOperator = document.querySelector('.display .operator')

// parseInt('') = NaN
let leftNumber = parseInt(divLeftNumber.textContent)
let rightNumber = parseInt(divRightNumber.textContent)
let onScreenOperator = divOnScreenOperator.textContent

// I could do a SelectorAll .number and then perhaps sort
const numberButtons = []
for(let i=0; i<10; i++) {
    numberButtons[i] = document.querySelector(`.number.n${i}`)
}

const operatorButtons = {
    '/': document.querySelector('.buttons .operator.div'),
    '*': document.querySelector('.buttons .operator.mul'),
    '-': document.querySelector('.buttons .operator.sub'),
    '+': document.querySelector('.buttons .operator.add'),
    'C': document.querySelector('.buttons .end.clear'),
    '=': document.querySelector('.buttons .end.equal'),
}


/* event listeners */

for (let i=0; i<10;i++) {
    numberButtons[i].addEventListener('click',() => pressDigit(i))
}

operatorButtons['='].addEventListener('click',()=>operateDisplay())
operatorButtons['C'].addEventListener('click',()=>clearDisplay())
operatorButtons['/'].addEventListener('click',()=>pressOperator('/'))
operatorButtons['*'].addEventListener('click',()=>pressOperator('*'))
operatorButtons['-'].addEventListener('click',()=>pressOperator('-'))
operatorButtons['+'].addEventListener('click',()=>pressOperator('+'))

document.addEventListener('keydown',(e) => {
    switch (e.key) {
        case '=': 
        case 'Enter':
            operateDisplay()
            break
        case 'c':
        case 'C':
        case 'Delete':
            clearDisplay()
            break
        case 'Backspace':
            clearRightDisplay()
            break
        case '/':
        case '*':
        case '-':
        case '+':
            pressOperator(e.key)
            break
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                pressDigit(parseInt(e.key))
            break
    }
})




/* functions of buttons */

function updateDisplay() {
    let leftDisplay = ''
    if (!Number.isNaN(leftNumber)) {
        if (leftNumber <999999999 && leftNumber > -999999999)
            leftDisplay = leftNumber.toPrecision(9)
        else if (leftNumber < 0)
            leftDisplay = leftNumber.toPrecision(4)
        else 
            leftDisplay = leftNumber.toPrecision(5)
    }
    divLeftNumber.textContent = leftDisplay
    divRightNumber.textContent = rightNumber
    divOnScreenOperator.textContent = onScreenOperator
}

function clearDisplay() {
    leftNumber = NaN
    rightNumber = 0
    onScreenOperator = ''
    updateDisplay()
}

function clearRightDisplay() {
    rightNumber = 0
    updateDisplay()
}


function statusDisplay () {
    let a = leftNumber
    let b = rightNumber
    let op = onScreenOperator
    if (a === NaN && op === '' && b === '') {
        return 'empty'
    } 
    else if (isNaN(a) && op === '' && typeof b === 'number') {
        return 'begin'
    } 
    else if(!isNaN(a) && op === '' && b === '') {
        return 'result'
    } 
    else if (!isNaN(a) && op !== '' && b === '') {
        return 'incomplete'
    } 
    else if(!isNaN(a) && op !== '' && typeof b === 'number') {
        return 'complete'
    } 
    else if(isNaN(a) && b !== '' && typeof b === 'string') {
        return 'message-begin'
    } 
    else if(!isNaN(a) && b !== '' && typeof b === 'string') {
        return 'message-incomplete'
    } 
    else {
        return 'STATUS_ERROR'
    }
}

function operateDisplay () {
    switch (statusDisplay()) {
        case 'empty':
        case 'result':
        case 'incomplete':
        case 'message-begin':
        case 'message-incomplete':
            break
        case 'begin':
            leftNumber = rightNumber
            rightNumber = ''
            updateDisplay()
            break
        case 'complete':
            const result = operate (onScreenOperator,leftNumber,rightNumber)
            if (result === "ERRORDIVIDE0") {
                rightNumber = 'do not divide by 0!'
            }
            else {
                leftNumber = result
                onScreenOperator = ''
                rightNumber = ''
            } 
            updateDisplay()
            break
    }
       
}

function pressOperator (operator) {
    switch(statusDisplay()) {
        case 'empty':
        case 'message-begin':
            break
        case 'result':
        case 'incomplete':
            onScreenOperator = operator
            break
        case 'message-incomplete':
            onScreenOperator = operator
            rightNumber = ''
            break
        case 'begin':
            leftNumber = rightNumber
            onScreenOperator = operator
            rightNumber = ''
            break
        case 'complete':
            operateDisplay() 
            onScreenOperator = operator
            break
    }
    updateDisplay()
}

function pressDigit(digit) {
    digit = parseInt(digit)
    switch (statusDisplay()) {
        case 'result':   
            leftNumber = NaN
            rightNumber = digit
            break
        case 'empty':
        case 'incomplete':
        case 'message-begin':
        case 'message-incomplete':
            rightNumber = digit
            break
        case 'begin':
        case 'complete':
            rightNumber = addDigit(rightNumber,digit)
    }
    updateDisplay()
}

function addDigit(number,digit) {
    return number*10 +digit
}
