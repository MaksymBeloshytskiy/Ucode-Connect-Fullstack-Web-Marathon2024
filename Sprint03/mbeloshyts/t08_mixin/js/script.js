let mixin = {
    // Replaces all occurrences of 'from' with 'to' in the description
    wordReplace(from, to) {
        if (from && to) {
            this.description = this.description.split(from).join(to);
        }
    },
    // Inserts 'toInsert' after the first occurrence of 'word' in the description
    wordInsertAfter(word, toInsert) {
        let index = this.description.indexOf(word);
        if (index !== -1) {
            // Check if toInsert already starts with a space
            if (!toInsert.startsWith(" ")) {
                toInsert = " " + toInsert;
            }
            this.description = this.description.slice(0, index + word.length) + toInsert + this.description.slice(index + word.length);
        }
    },
    // Deletes all occurrences of 'str' from the description
    wordDelete(str) {
        this.description = this.description.split(str).join("");
    },
    // Encrypts the description using the ROT13 cipher
    wordEncrypt() {
        this.description = this.description.replace(/[a-z]/gi, c =>
            String.fromCharCode(c.charCodeAt(0) + 13 - 26 * /[n-z]/i.test(c)));
    },
    // Decrypts the description encrypted with the ROT13 cipher
    wordDecrypt() {
        this.description = this.description.replace(/[a-z]/gi, c =>
            String.fromCharCode(c.charCodeAt(0) - 13 + 26 * /[a-m]/i.test(c)));
    }
}
