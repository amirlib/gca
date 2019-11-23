/**
 * Implementation of queue.
 *
 * @class Queue
 */
class Queue {
  constructor() {
    this.data = [];
  }
  /**
   * 
   * @return {number} 
   * @memberof Queue
   */
  size() {
    return this.data.length;
  }
  /**
   * 
   * @param {object} obj 
   * @memberof Queue
   */
  enqueue(obj) {
    this.data.unshift(obj);
  }
  /**
   * 
   * @returns {boolean} 
   * @memberof Queue
   */
  dequeue() {
    return this.data.pop();
  }
  /**
   * 
   * @param {object} obj - The object to be checked.
   * @returns {boolean} True if there a such node. Otherwise, False.
   * @memberof Queue
   */
  has(obj) {

  }
  /**
   * 
   * @return {Queue} 
   * @memberof Queue
   */
  clone() {

  }
  /**
   * 
   * @returns {string}.
   * @memberof Queue
   */
  toString() {

  }
}

module.exports = Queue;
