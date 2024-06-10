// Define a class called Note
class Note {
    // Constructor function that takes in name, importance, and content parameters
    constructor(name, importance, content) {
        // Assign the name parameter to the name property of the instance
        this.name = name;
        // Assign the importance parameter to the importance property of the instance
        this.importance = importance;
        // Assign the content parameter to the content property of the instance
        this.content = content;
        // Create a new Date object and assign it to the date property of the instance
        this.date = new Date().toLocaleString();
    }
}

// Export the Note class so it can be used in other files
module.exports = Note;
