const Node = require("./Node");
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
    } else {
      current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      let node = new Node(obj);
      current.next = node;
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
        let current = this.head;
        let prev = null;
        while (current.next.data != obj) {
          current = current.next;
        }
        prev = current;
        current = current.next;
        prev.next = current.next;
      }
      return true;
    }
    return false;
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
   * Deep copies a linkedlist.
   * @return {LinkedList} cloned LinkedList.
   * @memberof LinkedList
   */
  clone() {
    let clonedList = new LinkedList();
    if (this.size() == 0) {
      return clonedList;
    }
    let current = this.head;
    while (current != null) {
      let clonedData = current.data.clone();
      clonedList.addData(clonedData);
      current = current.next;
    }
    return clonedList;
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
