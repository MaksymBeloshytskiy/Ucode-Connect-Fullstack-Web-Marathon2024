// Function to make a copy of an object and its properties
function copyObj(obj) {
    let newObj = {}; // Create a new object

    // Iterate over the properties of the original object
    for (let key in obj) {
        // Check if the property is an own property of the object (not inherited)
        if (obj.hasOwnProperty(key)) {
            // Copy the property to the new object
            newObj[key] = obj[key];
        }
    }

    return newObj; // Return the new object
}
