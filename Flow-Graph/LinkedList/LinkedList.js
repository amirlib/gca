const Node = require('./Node');
const LinkedListError = require('./LinkedListError');
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
     * @param {object} obj - The object to be removed.
     * @memberof LinkedList
     */
    removeData(obj) {
        if (this.checkIfNodeExist(obj) == false) {
            throw new LinkedListError(`There no such node to remove.`);
        }
        if (this.head.data == obj) {
            this.head = this.head.next;
        }
        let temp = this.head;
        let prev = null;
        while (temp.next.data != obj) {
            temp = temp.next;
        }
        prev = temp;
        temp = temp.next
        prev.next = temp.next;
    }
    /**
     * Checks if there a node with this obj in the linked list.
     * @param {object} obj - The object to check.
     * @returns True if there a such node. Otherwise, False.
     * @memberof LinkedList
     */
    checkIfNodeExist(obj) {
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
     * @memberof LinkedList
     */
    print() {
        let print = "";
        console.log(`----LinkedList----`);
        let temp = this.head;
        while (temp != null) {
            print = print + " " + temp.data;
            console.log(`${print}`);
            print = "";
            temp = temp.next;
        }
    }
}

module.exports = LinkedList;
