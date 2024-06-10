class StrFrequency {
    constructor(input) {
        this.str = input || ''; // Initialize the string value using the constructor
    }

    letterFrequencies() {
        const frequencies = {};
        const sanitizedStr = this.str.toUpperCase().replace(/[^A-Z]/g, ''); // Convert to uppercase and remove non-letter characters

        for (const char of sanitizedStr) {
            if (frequencies[char]) {
                frequencies[char]++; // Increment the frequency if the character already exists in the frequencies object
            } else {
                frequencies[char] = 1; // Initialize the frequency to 1 if the character doesn't exist in the frequencies object
            }
        }

        return frequencies;
    }

    wordFrequencies() {
        const frequencies = {};
        const sanitizedStr = this.str.toUpperCase().replace(/[^A-Z\s]/g, ''); // Convert to uppercase and remove non-letter characters except spaces
        const words = sanitizedStr.split(/\s+/).filter(word => word); // Split the string into words and filter out empty strings

        for (const word of words) {
            if (frequencies[word]) {
                frequencies[word]++; // Increment the frequency if the word already exists in the frequencies object
            } else {
                frequencies[word] = 1; // Initialize the frequency to 1 if the word doesn't exist in the frequencies object
            }
        }

        if (Object.keys(frequencies).length === 0) {
            frequencies[''] = 1; // If there are no words in the string, set the frequency of an empty string to 1
        }

        return frequencies;
    }

    reverseString() {
        return this.str.split('').reverse().join(''); // Reverse the order of letters in the string
    }
}

module.exports = StrFrequency;
