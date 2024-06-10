console.log(`Enter 'exit' to exit.`);

// Initialize the previous result to 1
let prev = 1;

// Loop indefinitely until 'exit' is entered
while (true) {
    // Prompt the user for a new number
    let input = prompt(`Previous result: ${prev}. Enter a new number:`);

    // Check if 'exit' is entered to break out of the loop
    if (input === 'exit') break;

    // Convert the input to a number
    const inputNumber = Number(input);

    // Check if the input is a valid number
    if (!isNaN(inputNumber)) {
        // Add the input number to the previous result
        prev += inputNumber;
    } else {
        // Display an error message for invalid input
        console.error('Invalid number!');
    }

    // Reset the previous result to 1 if it exceeds 10000
    if (prev > 10000) prev = 1;
}
