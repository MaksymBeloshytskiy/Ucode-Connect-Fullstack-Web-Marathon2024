function getAnonymous(name, alias, affiliation) {
    // Private fields
    const _name = name; // Store the name
    const _alias = alias; // Store the alias
    const _affiliation = affiliation; // Store the affiliation

    // Return an object with getters to access private fields
    return {
        get name() {
            return _name; // Getter for the name
        },
        get alias() {
            return _alias; // Getter for the alias
        },
        get affiliation() {
            return _affiliation; // Getter for the affiliation
        }
    };
}

module.exports = {
    getAnonymous // Export the getAnonymous function
};
