function firstUpper(string) {
    if (!string || typeof string !== 'string') return ''; // Return empty string if input is null or not a string
    string = string.trim(); // Remove leading and trailing whitespaces
    if (string.length === 0) return ''; // Return empty string if the trimmed string is empty
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(); // Capitalize the first letter and convert the rest to lowercase
}

module.exports = {
    firstUpper
};
