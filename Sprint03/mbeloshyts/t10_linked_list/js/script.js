// Define a class for individual nodes in the linked list
class Node {
    constructor(value) {
        // Initialize the node with data and a reference to the next node
        this.data = value; // Data stored in the node
        this.next = null; // Reference to the next node
    }
}

// Define a class for the linked list
class List {
    constructor() {
        // Initialize the linked list with a head node and length
        this.head = null; // Head node of the linked list
        this.size = 0; // Length of the linked list
    }

    // Method to add a new node to the linked list
    add(value) {
        // Create a new node with the given value
        let newNode = new Node(value);
        
        // If the list is empty, set the new node as the head
        if (this.size === 0) {
            this.head = newNode;
        } else {
            // Traverse the list to find the last node
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            // Add the new node to the end of the list
            current.next = newNode;
        }
        // Increment the size of the list
        this.size++;
    }

    // Method to remove a node with the given value from the linked list
    remove(value) {
        // If the head node contains the value, remove it
        if (this.head.data === value) {
            this.head = this.head.next;
            this.size--;
            return true;
        } else {
            // Traverse the list to find the node before the one to be removed
            for (let current = this.head; current.next; current = current.next) {
                if (current.next.data === value) {
                    current.next = current.next.next;
                    this.size--;
                    return true;
                }
            }
        }
        return false; // Value not found in the list
    }

    // Method to check if the linked list contains a node with the given value
    contains(value) {
        // Traverse the list to find the node with the given value
        for (let current = this.head; current; current = current.next) {
            if (current.data === value) {
                return true; // Value found in the list
            }
        }
        return false; // Value not found in the list
    }

    // Method to create an iterator for the linked list
    *[Symbol.iterator]() {
        let current = this.head;
        while (current) {
            yield current.data;
            current = current.next;
        }
    }

    // Method to clear the linked list
    clear() {
        this.head = null; // Set the head to null
        this.size = 0; // Reset the size to 0
    }

    // Method to get the number of nodes in the linked list
    count() {
        return this.size; // Return the size of the list
    }

    // Method to log the elements of the linked list
    log() {
        let result = ''; // Initialize an empty string to store the result
        for (let current = this.head; current; current = current.next) {
            result += current.data; // Append the data of each node to the result
            if (current.next) {
                result += ', '; // Add a comma and space if it's not the last node
            }
        }
        console.log(result); // Log the result to the console
    }
}

// Function to create a linked list from an array of values
let createLinkedList = (arr) => {
    const linkedList = new List(); // Create a new linked list
    arr.forEach(value => linkedList.add(value)); // Add each value from the array to the linked list
    return linkedList; // Return the created linked list
};
