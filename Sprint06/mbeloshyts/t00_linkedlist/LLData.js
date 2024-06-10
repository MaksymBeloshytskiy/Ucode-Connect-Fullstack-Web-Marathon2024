/**
 * Represents a node in a linked list.
 * @class
 */
class LLData {
    /**
     * Creates a new instance of the LLData class.
     * @constructor
     * @param {*} data - The data to be stored in the node.
     * @param {LLData|null} next - The reference to the next node in the linked list.
     */
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

module.exports = { LLData };
