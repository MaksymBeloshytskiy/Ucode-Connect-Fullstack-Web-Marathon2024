// Prompt the user for their first name
let firstName = String(prompt("What's your first name?"));

// Prompt the user for their last name
let lastName = String(prompt("What is your last name?"));

// Check if the first name is valid (contains only letters)
let isFirstNameValid = firstName.match(/^[a-z]+$/i);

// Check if the last name is valid (contains only letters)
let isLastNameValid = lastName.match(/^[a-z]+$/i);

// If both the first name and last name are valid
if (isFirstNameValid && isLastNameValid) {
    // Capitalize the first letter of the first name and convert the rest to lowercase
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

    // Capitalize the first letter of the last name and convert the rest to lowercase
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

    // Print a greeting message to the console
    console.log(`Hello, ${firstName} ${lastName}`);

    // Show a greeting message in an alert box
    alert(`Hello, ${firstName} ${lastName}`);
} else {
    // If the input is invalid, print an error message to the console
    console.log("Wrong input!");

    // Show an error message in an alert box
    alert("Wrong input!");
}
