class HardWorker {
    constructor() {
        // Initialize private variables
        this._name = '';
        this._age = 1;
        this._salary = 100;
    }

    set name(value) {
        // Set the name value
        this._name = value;
    }

    get name() {
        // Get the name value
        return this._name;
    }

    set age(value) {
        // Set the age value within a valid range
        if (value >= 1 && value < 100) {
            this._age = value;
        }
    }

    get age() {
        // Get the age value
        return this._age;
    }

    set salary(value) {
        // Set the salary value within a valid range
        if (value >= 100 && value < 10000) {
            this._salary = value;
        }
    }

    get salary() {
        // Get the salary value
        return this._salary;
    }

    toObject() {
        // Convert the HardWorker object to a plain object
        return {
            name: this.name,
            age: this.age,
            salary: this.salary
        };
    }
}

// Export the HardWorker class
module.exports = { HardWorker };