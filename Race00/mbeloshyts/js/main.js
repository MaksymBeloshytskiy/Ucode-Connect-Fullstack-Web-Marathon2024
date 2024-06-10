document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentValue = '0';
    let firstOperand = null;
    let operator = null;
    let awaitingSecondOperand = false;
    let memory = 0;

    const updateDisplay = () => {
        display.textContent = currentValue;
    };

    const handleNumber = (number) => {
        if (awaitingSecondOperand) {
            currentValue = number;
            awaitingSecondOperand = false;
        } else {
            currentValue = currentValue === '0' ? number : currentValue + number;
        }
    };

    const handleOperator = (nextOperator) => {
        const inputValue = parseFloat(currentValue);

        if (operator && awaitingSecondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand === null && !isNaN(inputValue)) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            currentValue = `${parseFloat(result.toFixed(7))}`;
            firstOperand = result;
        }

        awaitingSecondOperand = true;
        operator = nextOperator;
    };

    const calculate = (firstOperand, secondOperand, operator) => {
        switch (operator) {
            case 'add':
                return firstOperand + secondOperand;
            case 'subtract':
                return firstOperand - secondOperand;
            case 'multiply':
                return firstOperand * secondOperand;
            case 'divide':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    };

    const handleDecimal = () => {
        if (!currentValue.includes('.')) {
            currentValue += '.';
        }
    };

    const handleClear = () => {
        currentValue = '0';
        firstOperand = null;
        operator = null;
        awaitingSecondOperand = false;
    };

    const handleSign = () => {
        currentValue = (parseFloat(currentValue) * -1).toString();
    };

    const handlePercent = () => {
        currentValue = (parseFloat(currentValue) / 100).toString();
    };

    const handleFactorial = () => {
        const number = parseInt(currentValue);
        if (number >= 0) {
            currentValue = factorial(number).toString();
        }
    };

    const factorial = (n) => {
        if (n === 0 || n === 1) {
            return 1;
        }
        return n * factorial(n - 1);
    };

    const handleExponent = () => {
        const base = parseFloat(currentValue);
        const exponent = prompt("Enter exponent value:");
        if (!isNaN(exponent)) {
            currentValue = Math.pow(base, exponent).toString();
        }
    };

    const handleSqrt = () => {
        currentValue = Math.sqrt(parseFloat(currentValue)).toString();
    };

    const handleMemoryRecall = () => {
        currentValue = memory.toString();
    };

    const handleMemoryClear = () => {
        memory = 0;
    };

    const handleMemoryPlus = () => {
        memory += parseFloat(currentValue);
    };

    const handleMemoryMinus = () => {
        memory -= parseFloat(currentValue);
    };

    const handleConversion = (conversionType) => {
        const input = parseFloat(currentValue);
        let result;

        switch (conversionType) {
            case 'length':
                result = convertLength(input);
                break;
            case 'weight':
                result = convertWeight(input);
                break;
            case 'area':
                result = convertArea(input);
                break;
            default:
                result = input;
        }

        alert(result);
    };

    const convertLength = (value) => {
        // Simple length conversions (example)
        const cmToM = value / 100;
        const mToKm = cmToM / 1000;
        return `${value} cm = ${cmToM} m = ${mToKm} km`;
    };

    const convertWeight = (value) => {
        // Simple weight conversions (example)
        const gToKg = value / 1000;
        const kgToTonne = gToKg / 1000;
        return `${value} g = ${gToKg} kg = ${kgToTonne} tonnes`;
    };

    const convertArea = (value) => {
        // Simple area conversions (example)
        const cm2ToM2 = value / 10000;
        const m2ToKm2 = cm2ToM2 / 1000000;
        return `${value} cm² = ${cm2ToM2} m² = ${m2ToKm2} km²`;
    };

    document.querySelector('.calculator-keys').addEventListener('click', (event) => {
        const { target } = event;

        if (!target.matches('button')) {
            return;
        }

        if (target.dataset.action === 'decimal') {
            handleDecimal();
        } else if (target.dataset.action === 'clear') {
            handleClear();
        } else if (target.dataset.action === 'sign') {
            handleSign();
        } else if (target.dataset.action === 'percent') {
            handlePercent();
        } else if (target.dataset.action === 'calculate') {
            handleOperator(operator);
            operator = null;
            awaitingSecondOperand = false;
        } else if (target.dataset.action) {
            switch (target.dataset.action) {
                case 'factorial':
                    handleFactorial();
                    break;
                case 'exponent':
                    handleExponent();
                    break;
                case 'sqrt':
                    handleSqrt();
                    break;
                case 'memory-recall':
                    handleMemoryRecall();
                    break;
                case 'memory-clear':
                    handleMemoryClear();
                    break;
                case 'memory-plus':
                    handleMemoryPlus();
                    break;
                case 'memory-minus':
                    handleMemoryMinus();
                    break;
                case 'convert-length':
                    handleConversion('length');
                    break;
                case 'convert-weight':
                    handleConversion('weight');
                    break;
                case 'convert-area':
                    handleConversion('area');
                    break;
                default:
                    handleOperator(target.dataset.action);
            }
        } else {
            handleNumber(target.textContent);
        }

        updateDisplay();
    });
});
