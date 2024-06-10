class Access {
    constructor() {
        this._mark_LXXXV = undefined; // Initialize _mark_LXXXV as undefined
    }

    get mark_LXXXV() {
        if (this._mark_LXXXV === null) { // Check if _mark_LXXXV is null
            return 'null';
        }
        return this._mark_LXXXV; // Return the value of _mark_LXXXV
    }

    set mark_LXXXV(value) {
        this._mark_LXXXV = value; // Set the value of _mark_LXXXV
    }
}

module.exports = Access; // Export the Access class
