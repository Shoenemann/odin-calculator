// basic math operators

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

function operate (a,b,operator) {
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


// display on screen section
//

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
    numberButtons[i] = document.querySelector(`.number.${i}`)
}

const operatorButtons = {
    '/': document.querySelector('.buttons .operator.div'),
    '*': document.querySelector('.buttons .operator.mul'),
    '-': document.querySelector('.buttons .operator.sub'),
    '+': document.querySelector('.buttons .operator.add')
}

function updateDisplay() {
    if (leftNumber === NaN) 
        divLeftNumber.textContent = ''
    else 
        divLeftNumber.textContent= leftNumber
    divRightNumber.textContent = rightNumber
    divOnScreenOperator.textContent = onScreenOperator
}

function clear() {
    leftNumber = NaN
    rightNumber = 0
    onScreenOperator = ''
    updateDisplay()
}

function statusDisplay () {
    let a = leftNumber
    let b = rightNumber
    let op = onScreenOperator
    if (a === NaN && op === '' && b === '') {
        return 'empty'
    } 
    else if (a === NaN && op === '' && typeof b === 'number') {
        return 'begin'
    } 
    else if(typeof a === 'number' && op === '' && b === '') {
        return 'result'
    } 
    else if (typeof a === 'number' && op !== '' && b === '') {
        return 'incomplete'
    } 
    else if(typeof a === 'number' && op !== '' && typeof b === 'number') {
        return 'complete'
    } 
    else if(b !== '' && typeof b === 'string') {
        return 'message'
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
        case 'message':
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

    if (leftNumber === NaN) return

    else if(rightNumber === '') {
        onScreenOperator = operator
        updateDisplay()
    }

    else  {
        operateDisplay()
    }
}

function pressDigit(digit) {

}