const discoverError = require("./discoverError");
/**
 * Implementation of Discovers nodes array. Each node from the original graph is exist in this array.
 * All nodes are initiated to False. Set True to node, only if BFS algorithm met the node.
 * The BFS algorithm use this class for creating the BFS graph.
 *
 * @class Discovers
 */
class Discovers {
  /**
   * Creates an instance of Discovers.
   * @param {number[]} nodesID Array of nodes ID.
   * @param {number} indexS The index of the root BFS graph node.
   * @memberof Discovers
   */
  constructor(nodesID, indexS) {
    this.matrix = [2];
    this.matrix[0] = nodesID;
    this.matrix[1] = [nodesID.length];

    this.init(indexS);
  }
  /**
   * Initiate the matrix: Insert False to every cell except the root node.
   * @param {number} indexS The index of the root BFS graph node.
   * @memberof Discovers
   */
  init(indexS) {
    for (let i = 0; i < this.size(); i++) {
      this.matrix[1][i] = false;
    }

    this.matrix[1][indexS] = true;
  }
  /**
   * Returns the number of nodes.
   * @returns {number} The number of nodes.
   * @memberof Discovers
   */
  size() {
    return this.matrix[0].length;
  }
  /**
   * Sets true on a discovered node.
   * @param {number} index Index of node to set true.
   * @throws {discoverError} Throws Error if node ID is not exist in Discovers.
   * @memberof Discovers
   */
  markNode(index) {
    if (index >= this.size()) {
      throw new discoverError(`There is no node to discover with this index.`);
    }

    this.matrix[1][index] = true;
  }
  /**
   * Checks if node was discovered.
   * @param {number} index Index of node to check
   * @returns {boolean} True if node was discovered. Otherwise, False.
   * @throws {discoverError} Throws Error if node ID is not exist in Discovers.
   * @memberof Discovers
   */
  hasDiscover(index) {
    if (index >= this.size()) {
      throw new discoverError(`There is nothing in Discover with this index.`);
    }

    return this.matrix[1][index];
  }
  /**
   * Searches the node ID in the Discovers Matrix and return it index.
   * @param {number} ID ID of node to search.
   * @returns {number} The ID of node. Return -1 if there is no such node.
   * @memberof Discovers
   */
  indexOfNodeID(ID) {
    for (let i = 0; i < this.size(); i++) {
      if (this.matrix[0][i] == ID) {
        return i;
      }
    }

    return -1;
  }
}

module.exports = Discovers;
