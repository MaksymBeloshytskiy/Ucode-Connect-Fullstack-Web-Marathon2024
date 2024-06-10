const validator = {
    set: function (object, property, value) {
        // Check if the property being set is 'age'
        if (property === 'age') {
            // Check if the value is not an integer
            if (!Number.isInteger(value))
                throw new TypeError("The age is not an integer");
            // Check if the value is outside the valid range of 0 to 200
            if (value < 0 || value > 200)
                throw new RangeError("The age is invalid");
        }
        // Check if the property being set is 'gender'
        if (property === 'gender') {
            // Check if the value is neither 'male' nor 'female'
            if (value !== 'male' && value !== 'female')
                throw new TypeError("The gender is invalid");
        }
        // Log the value being set and the property it is being set to
        console.log(`Setting value '${value}' to '${property}'`);
        // Set the value of the property
        object[property] = value;
        return true;
    },
    get: function (object, property) {
        // Log the property being accessed
        console.log(`Trying to access the property '${property}'...`);
        // Check if the object has the requested property
        if (object.hasOwnProperty(property)) {
            // Return the value of the property
            return object[property];
        }
        // If the property doesn't exist, return false
        return false;
    }
};
