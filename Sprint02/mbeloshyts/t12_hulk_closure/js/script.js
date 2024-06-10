// Define a function named 'concat' that takes in any number of arguments using the rest parameter syntax (...args)
function concat(...args) {
    // Define a nested function named 'second'
    function second() {
        // Prompt the user to enter a string and store it in the 'str' variable
        let str = prompt("Enter string: ", "");
        
        // If the user cancels the prompt, return the first argument passed to 'concat'
        if (str === null)
            return args[0];
        
        // Increment the 'count' property of the 'second' function
        second.count++;
        
        // Concatenate the first argument passed to 'concat' with a space and the entered string
        return args[0].concat(" ", str);
    }

    // If 'concat' is called with only one argument, return the 'second' function
    if (arguments.length == 1)
        return second;
    
    // If 'concat' is called with two arguments, concatenate them with a space and return the result
    if (arguments.length == 2) {
        return args[0].concat(" ", args[1]);
    }
}
