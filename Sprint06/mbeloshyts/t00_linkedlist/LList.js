const { LLData } = require('./LLData');

/**
 * Represents a linked list.
 */
class LList {
    constructor() {
        this.head = null; // Initialize the head of the linked list as null
    }

    // Get the data of the first node in the linked list
    getFirst() {
        return this.head ? this.head.data : null;
    }

    // Get the data of the last node in the linked list
    getLast() {
        let current = this.head;
        while (current && current.next) {
            current = current.next;
        }
        return current ? current.data : null;
    }

    // Add a new node with the given value to the end of the linked list
    add(value) {
        const newNode = new LLData(value);
        if (!this.head) {
            this.head = newNode; // If the linked list is empty, set the new node as the head
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode; // Find the last node and set its next pointer to the new node
        }
    }

    // Add multiple nodes with values from an array to the linked list
    addFromArray(arrayOfData) {
        for (const value of arrayOfData) {
            this.add(value);
        }
    }

    // Remove the first node with the given value from the linked list
    remove(value) {
        if (!this.head) return;

        if (this.head.data === value) {
            this.head = this.head.next; // If the head node has the given value, update the head to the next node
            return;
        }

        let current = this.head;
        while (current.next && current.next.data !== value) {
            current = current.next;
        }

        if (current.next) {
            current.next = current.next.next; // Find the node with the given value and remove it by updating the next pointer
        }
    }

    // Remove all nodes with the given value from the linked list
    removeAll(value) {
        while (this.head && this.head.data === value) {
            this.head = this.head.next; // Remove all nodes with the given value from the beginning of the linked list
        }

        let current = this.head;
        while (current && current.next) {
            if (current.next.data === value) {
                current.next = current.next.next; // Find nodes with the given value and remove them by updating the next pointers
            } else {
                current = current.next;
            }
        }
    }

    // Check if the linked list contains a node with the given value
    contains(value) {
        let current = this.head;
        while (current) {
            if (current.data === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    // Clear the linked list by setting the head to null
    clear() {
        this.head = null;
    }

    // Count the number of nodes in the linked list
    count() {
        let count = 0;
        let current = this.head;
        while (current) {
            count++;
            current = current.next;
        }
        return count;
    }

    // Convert the linked list to a string representation
    toString() {
        let result = [];
        let current = this.head;
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result.join(', ');
    }

    // Get an iterator object for iterating over the linked list
    getIterator() {
        let current = this.head;
        return {
            next: function () {
                if (current) {
                    const value = current.data;
                    current = current.next;
                    return { value, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }

    // Filter the linked list based on a callback function
    filter(callback) {
        const newList = new LList();
        let current = this.head;
        while (current) {
            if (callback(current.data)) {
                newList.add(current.data);
            }
            current = current.next;
        }
        return newList;
    }

    // Enable iteration over the linked list using a for...of loop or the spread operator
    [Symbol.iterator]() {
        let current = this.head;
        return {
            next: () => {
                if (current) {
                    const value = current.data;
                    current = current.next;
                    return { value, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
}

module.exports = { LList };
