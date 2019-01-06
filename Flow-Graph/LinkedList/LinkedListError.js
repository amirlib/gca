class LinkedListError extends Error {
    constructor(message) {
        super(message);
        this.name = "LinkedListError";
    }
}

module.exports = LinkedListError;
