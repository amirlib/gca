const Node = require("./Node");
/**
 * Implementation of linked list. Used for saving the edges of the Flow Graph.
 *
 * @class LinkedList
 */
class LinkedList {
  constructor() {
    this.head = null;
  }
  /**
   * Returns the number of nodes in the graph.
   * @return {number} The number of nodes.
   * @memberof LinkedList
   */
  size() {
    let counter = 0;
    let current = this.head;

    while (current != null) {
      counter++;
      current = current.next;
    }

    return counter;
  }
  /**
   * Creates new node with the obj and add it to linked list.
   * @param {object} obj - The object to insert.
   * @memberof LinkedList
   */
  addData(obj) {
    let current = this.head;

    if (this.head == null) {
      this.head = new Node(obj);

      return;
    }

    current = this.head;

    while (current.next != null) {
      current = current.next;
    }

    current.next = new Node(obj);
  }
  /**
   * Checks if there a node with this obj, and if does, remove it.
   * @param {object} obj The object to be removed.
   * @returns {boolean} True, if node with given data removed from linked list. Otherwise, false.
   * @memberof LinkedList
   */
  removeData(obj) {
    if (!this.has(obj)) return false;

    if (this.head.data == obj) {
      this.head = this.head.next;

      return;
    }

    let current = this.head;
    let prev = null;

    while (current.next.data != obj) {
      current = current.next;
    }
    
    prev = current;
    current = current.next;
    prev.next = current.next;
    return true;
  }
  /**
   * Checks if there a node with this obj in the linked list.
   * @param {object} obj - The object to be checked.
   * @returns {boolean} True if there a such node. Otherwise, False.
   * @memberof LinkedList
   */
  has(obj) {
    let current = this.head;

    while (current != null) {
      if (current.data.equals(obj)) {
        return true;
      }
      
      current = current.next;
    }

    return false;
  }
  /**
   * Deep copies a linked list.
   * @return {LinkedList} cloned LinkedList.
   * @memberof LinkedList
   */
  clone() {
    let list = new LinkedList();
    
    if (this.size() == 0) return list;

    let current = this.head;

    while (current != null) {
      const clonedData = current.data.clone();

      list.addData(clonedData);
      current = current.next;
    }

    return list;
  }
  /**
   * Returns the data inside all the nodes.
   * @returns {string}.
   * @memberof LinkedList
   */
  toString() {
    let print = ``;
    let current = this.head;

    while (current != null) {
      print = `${print}${current.data}`;
      
      if (current.next != null) {
        print = `${print}\n`;
      }

      current = current.next;
    }

    return print;
  }
}

module.exports = LinkedList;
