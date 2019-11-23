const Edge = require("../Edges/Edge");
/**
 * Implementation of path. Path is used for saving nodes of the minimum path from BFS Graph and edges.
 *
 * @class Path
 */
class Path {
  constructor() {
    this.nodes = [];
    this.edges = [];
  }
  /**
   * Gets the number of edged in the path.
   * @returns {number} The number of edged.
   * @memberof Path
   */
  size() {
    return this.edges.length;
  }
  /**
   * Adds new node to the path.
   * @param {number} ID ID of node.
   * @memberof Path
   */
  addNode(ID) {
    this.nodes.push(ID);
  }
  /**
   * Adds new edge to path.
   *
   * @param {Edge} edge
   * @memberof Path
   */
  addEdge(edge) {
    this.edges.push(edge);
  }
  /**
   * Reverse the order of path.
   * @memberof Path
   */
  reverseNodes() {
    let newNodes = this.nodes.reverse();

    this.nodes = newNodes;
  }
  /**
   * Adds edges from the the flow graph as mentioned in the minimum path.
   * @memberof Path
   */
  createEdgesFromNodes() {
    for (let i = 0; i < this.nodes.length - 1; i++) {
      const edge = new Edge(this.nodes[i], this.nodes[i + 1]);

      this.addEdge(edge);
    }
  }
  /**
   * Prints the edges of the path.
   *
   * @returns {string}
   * @memberof Path
   */
  toString() {
    let print = ``;

    for (let i = 0; i < this.edges.length; i++) {
      print = `${print}${this.edges[i]}`;

      if (i != this.edges.length - 1) {
        print = `${print}\n`;
      }
    }
    
    return print;
  }
}

module.exports = Path;
