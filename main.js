let display = document.getElementById('display');
        let currentValue = '0';
        let previousValue = null;
        let operation = null;
        let shouldResetDisplay = false;

        function updateDisplay() {
            display.textContent = currentValue;
        }

        function appendNumber(num) {
            if (shouldResetDisplay) {
                currentValue = num;
                shouldResetDisplay = false;
            } else {
                currentValue = currentValue === '0' ? num : currentValue + num;
            }
            updateDisplay();
        }

        function appendDecimal() {
            if (shouldResetDisplay) {
                currentValue = '0.';
                shouldResetDisplay = false;
            } else if (!currentValue.includes('.')) {
                currentValue += '.';
            }
            updateDisplay();
        }

        function appendOperator(op) {
            if (operation !== null && !shouldResetDisplay) {
                calculate();
            }
            previousValue = parseFloat(currentValue);
            operation = op;
            shouldResetDisplay = true;
        }

        function calculate() {
            if (operation === null || previousValue === null) return;
            
            const current = parseFloat(currentValue);
            let result;

            switch(operation) {
                case '+':
                    result = previousValue + current;
                    break;
                case '-':
                    result = previousValue - current;
                    break;
                case '*':
                    result = previousValue * current;
                    break;
                case '/':
                    result = previousValue / current;
                    break;
            }

            currentValue = String(result);
            operation = null;
            previousValue = null;
            shouldResetDisplay = true;
            updateDisplay();
        }

        function clearAll() {
            currentValue = '0';
            previousValue = null;
            operation = null;
            shouldResetDisplay = false;
            updateDisplay();
        }

        function clearEntry() {
            currentValue = '0';
            shouldResetDisplay = false;
            updateDisplay();
        }

        function percentage() {
            const current = parseFloat(currentValue);
            currentValue = String(current / 100);
            shouldResetDisplay = true;
            updateDisplay();
        }

        function changeSign() {
            const current = parseFloat(currentValue);
            currentValue = String(current * -1);
            updateDisplay();
        }

        function squareRoot() {
            const current = parseFloat(currentValue);
            currentValue = String(Math.sqrt(current));
            shouldResetDisplay = true;
            updateDisplay();
        }

        function power() {
            const current = parseFloat(currentValue);
            currentValue = String(current * current);
            shouldResetDisplay = true;
            updateDisplay();
        }

        // Keyboard support
        document.addEventListener('keydown', function(e) {
            if (e.key >= '0' && e.key <= '9') {
                appendNumber(e.key);
            } else if (e.key === '.') {
                appendDecimal();
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                appendOperator(e.key);
            } else if (e.key === 'Enter' || e.key === '=') {
                e.preventDefault();
                calculate();
            } else if (e.key === 'Escape') {
                clearAll();
            } else if (e.key === 'Backspace') {
                clearEntry();
            } else if (e.key === '%') {
                percentage();
            }
        });
