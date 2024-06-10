function Calculator() {
    this.result = 0;

    // Initialize the calculator with a given number
    this.init = function(n) {
        this.result = n;
        return this;
    };

    // Add a number to the current result
    this.add = function(n) {
        this.result += n;
        return this;
    };

    // Multiply the current result by a number
    this.mul = function(n) {
        this.result *= n;
        return this;
    };

    // Divide the current result by a number
    this.div = function(n) {
        this.result /= n;
        return this;
    };

    // Subtract a number from the current result
    this.sub = function(n) {
        this.result -= n;
        return this;
    };

    // Display an alert with the current result after a delay of 5 seconds
    this.alert = function() {
        setTimeout(() => alert(this.result), 5000);
        return this;
    };
}
