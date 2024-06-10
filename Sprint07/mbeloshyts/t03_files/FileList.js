const fs = require('fs');
const path = require('path');

class FileList {
    constructor() {
        // Set the temporary directory path
        this.tmpDir = path.join(__dirname, 'tmp');
    }

    getList() {
        if (fs.existsSync(this.tmpDir)) {
            // Return the list of files in the temporary directory
            return fs.readdirSync(this.tmpDir);
        } else {
            // Return an empty array if the temporary directory doesn't exist
            return [];
        }
    }

    hasFiles() {
        // Check if the temporary directory has any files
        return this.getList().length > 0;
    }

    getHTMLList() {
        const fileList = this.getList();
        if (fileList.length === 0) {
            // Return an empty unordered list if there are no files
            return '<ul></ul>';
        }

        // Generate HTML list items for each file in the list
        const listItems = fileList.map(fileName => `<li><a href="/select-file?file=${encodeURIComponent(fileName)}">${fileName}</a></li>`);
        // Return the HTML list
        return `<ul>${listItems.join('')}</ul>`;
    }
}

module.exports = FileList;
