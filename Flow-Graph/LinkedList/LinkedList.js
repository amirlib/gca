const Node = require('./Node');
/**
 * Implementaion of linked list. Used for saveing the edges of the Flow Graph.
 * 
 * @class LinkedList
 */
class LinkedList {
    constructor() {
        this.head = null;
    }
    /**
     * Creates new node with the obj and add it to linked list.
     * @param {object} obj - The object to insert.
     * @memberof LinkedList
     */
    addData(obj) {
        let temp = this.head;
        if (this.head == null) {
            this.head = new Node(obj);
        } else {
            temp = this.head;
            while (temp.next != null) {
                temp = temp.next;
            }
            let node = new Node(obj);
            temp.next = node;
        }
    }
    /**
     * Checks if there a node with this obj, and if does, remove it.
     * @param {object} obj The object to be removed.
     * @returns {boolean} True, if node with given data removed from linkedlist. Otherwise, false.
     * @memberof LinkedList
     */
    removeData(obj) {
        if (this.has(obj) == true) {
            if (this.head.data == obj) {
                this.head = this.head.next;
            } else {
                let temp = this.head;
                let prev = null;
                while (temp.next.data != obj) {
                    temp = temp.next;
                }
                prev = temp;
                temp = temp.next
                prev.next = temp.next;
            }
            return true;
        }
        return false;
    }
    /**
     * Checks if there a node with this obj in the linked list.
     * @param {object} obj - The object to check.
     * @returns True if there a such node. Otherwise, False.
     * @memberof LinkedList
     */
    has(obj) {
        let temp = this.head;
        while (temp != null) {
            if (temp.data == obj) {
                return true;
            }
            temp = temp.next;
        }
        return false;
    }
    /**
     * Prints the data inside all the nodes.
     * @returns String.
     * @memberof LinkedList
     */
    toString() {
        let print = ``;
        let temp = this.head;
        while (temp != null) {
            print = `${print}${temp.data}`;
            if (temp.next != null) {
                print = `${print}\n`;
            }
            temp = temp.next;
        }
        return print;
    }
}

module.exports = LinkedList;