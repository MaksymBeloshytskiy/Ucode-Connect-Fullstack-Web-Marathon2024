const fs = require('fs');
const path = require('path');

class File {
    constructor(fileName) {
        // Set the fileName property
        this.fileName = fileName;
        // Set the filePath property by joining the current directory (__dirname) with the 'tmp' folder and the fileName
        this.filePath = path.join(__dirname, 'tmp', fileName);
    }

    write(content) {
        // Write the content to the file at the filePath, with the 'a' flag to append the content
        fs.writeFileSync(this.filePath, content, { flag: 'a' });
    }

    read() {
        // Read the content of the file at the filePath using utf8 encoding
        return fs.readFileSync(this.filePath, 'utf8');
    }

    delete() {
        // Delete the file at the filePath
        fs.unlinkSync(this.filePath);
    }
}

module.exports = File;
