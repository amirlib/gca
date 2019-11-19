/**
 * Implementation of Graph.
 * @class Graph
 */
class Graph {
  constructor() {
    this.nodesID = []; //An array of Nodes ID - When the ID inside index 'i' in this array represent the ID inside index of 'i + 1' in the Matrix array.
    this.matrix = []; //2d Array that represents the Graph as 'Adjacency matrix'.
  }
  /**
   * Returns the number of nodes in the graph.
   * @returns {number} The number of nodes.
   * @memberof Graph
   */
  size() {
    return this.nodesID.length;
  }
  /**
   * Counts the number of edges in graph.
   * @return {number} The number of edges in graph.
   * @memberof Graph
   */
  countEdges() {
    const rowsIterator = this.matrix.values();
    let counter = 0;

    for (const row of rowsIterator) {
      const cellsIterator = row.values();

      for (const value of cellsIterator) {
        if (value == 1) {
          counter++;
        }
      }
    }

    return counter;
  }
  /**
   * Inserts a new node to the graph. The ID must be number.
   * @param {number} ID ID of node to insert.
   * @returns {boolean} True, if node ID added successfully to the graph. Otherwise, returns false.
   * @memberof Graph
   */
  addNode(ID) {
    if (this.hasNode(ID)) return false;

    const length = this.size();
    this.nodesID.push(ID);

    if (this.size() == 1) {
      this.matrix.push([0]);
      return true;
    }

    this.matrix[0].push(0);
    this.matrix[length] = [0];

    for (let i = 1; i < length; i++) {
      this.matrix[i][length] = 0;
    }

    for (let i = 1; i <= length; i++) {
      this.matrix[length][i] = 0;
    }

    return true;
  }
  /**
   * Inserts new edge to the graph: when (from, to) represent an edge from startNodeID to endNodeID.
   * @param {number} from ID of start Node of edge.
   * @param {number} to ID of end Node of edge.
   * @returns {boolean} True, if edge added successfully to the graph. Otherwise, returns false.
   * @memberof Graph
   */
  addEdge(from, to) {
    const fromIndex = this.indexOfNodeID(from);
    const toIndex = this.indexOfNodeID(to);

    if (fromIndex == -1 || toIndex == -1) return false;

    this.matrix[fromIndex][toIndex] = 1;
    return true;
  }
  /**
   * Deletes given node ID from the graph, including all the edges that related to this ID.
   * @param {number} ID ID of node to delete.
   * @returns {boolean} True, if the node was deleted successfully from the graph. Otherwise, returns false.
   * @memberof Graph
   */
  deleteNode(ID) {
    const index = this.indexOfNodeID(ID);

    if (index == -1) return false;

    for (let i = 0; i < this.size(); i++) {
      for (let j = index; j < this.size() - 1; j++) {
        this.matrix[i][j] = this.matrix[i][j + 1];
      }

      this.matrix[i].pop();
    }

    for (let i = index; i < this.size() - 1; i++) {
      this.matrix[i] = this.matrix[i + 1];
      this.nodesID[i] = this.nodesID[i + 1];
    }

    this.matrix.pop();
    this.nodesID.pop();
    return true;
  }
  /**
   * Deletes edge from the graph.
   * @param {number} from ID of start Node of edge.
   * @param {number} to ID of end Node of edge.
   * @returns {boolean} True, if edge deleted successfully from the graph. Otherwise, returns false.
   * @memberof Graph
   */
  deleteEdge(from, to) {
    const fromIndex = this.indexOfNodeID(from);
    const toIndex = this.indexOfNodeID(to);

    if (fromIndex == -1 || toIndex == -1) return false;

    this.matrix[fromIndex][toIndex] = 0;
    return true;
  }
  /**
   * Searches for an index of the node with id: ID, that will be represented in the matrix of the graph.
   * @param {number} ID ID of node to search.
   * @returns {number} The index of the node that represents the same index in the matrix of the graph. Returns -1 if there is no such ID.
   * @memberof Graph
   */
  indexOfNodeID(ID) {
    for (let i = 0; i < this.size(); i++) {
      if (this.nodesID[i] == ID) {
        return i;
      }
    }

    return -1;
  }
  /**
   * Finds nodes, which are the end nodes of edges where the starting node has id of the given id.
   * @param {number} ID ID of node.
   * @returns {number[]} An array of IDs. Returns empty array if there are no edges like that.
   * @memberof Graph
   */
  findEndNodesEdgesFromNode(ID) {
    const index = this.indexOfNodeID(ID);
    let result = [];

    if (index == -1) return result;

    for (let i = 0; i < this.size(); i++) {
      if (this.matrix[index][i] == 1) {
        result.push(this.nodesID[i]);
      }
    }

    return result;
  }
  /**
   * Finds nodes, which are the start nodes of edges where the ending node has id of the given id.
   * @param {number} ID ID of node.
   * @returns {number[]} An array of IDs. Returns empty array if there are no edges like that.
   * @memberof Graph
   */
  findStartNodesEdgesFromNode(ID) {
    const index = this.indexOfNodeID(ID);
    let result = [];

    if (index == -1) return result;

    for (let i = 0; i < this.size(); i++) {
      if (this.matrix[i][index] == 1) {
        result.push(this.nodesID[i]);
      }
    }

    return result;
  }
  /**
   * Checks if an edge: (from, to) exist in the graph.
   * @param {number} from ID of start Node of edge.
   * @param {number} to ID of end Node of edge.
   * @returns {boolean} True if graph has such edge. Otherwise, False.
   * @memberof Graph
   */
  hasEdge(from, to) {
    const fromIndex = this.indexOfNodeID(from);
    const toIndex = this.indexOfNodeID(to);

    if (fromIndex == -1 || toIndex == -1) return false;

    if (this.matrix[fromIndex][toIndex] == 0) return false;

    return true;
  }
  /**
   * Checks if the given node exists in the graph.
   * @param {number} ID The given node ID.
   * @returns {boolean} True if exist, otherwise False.
   * @memberof Graph
   */
  hasNode(ID) {
    const iterator = this.nodesID.values();

    for (const value of iterator) {
      if (value == ID) {
        return true;
      }
    }

    return false;
  }
  /**
   * Checks whether the graph is empty.
   * @return {boolean} True, if the graph is empty. Otherwise, returns false.
   * @memberof Graph
   */
  isEmpty() {
    if (this.size() == 0) return true;

    return false;
  }
  /**
   * Deep copies a graph object. Will not clone bfsGraph object.
   * @returns {Graph} Cloned Graph.
   * @memberof Graph
   */
  clone() {
    let graph = new Graph();

    for (let i = 0; i < this.size(); i++) {
      graph.matrix[i] = Array.from(this.matrix[i]);
    }

    graph.nodesID = Array.from(this.nodesID);
    return graph;
  }
  /**
   * Returns the presentation of the graph as a matrix.
   * @returns {string}
   * @memberof Graph
   */
  toString() {
    const spaces = `     `;
    let print = "M";

    if (this.isEmpty()) return print;

    const iterator = this.nodesID.values();

    for (const value of iterator) {
      print = `${print}${spaces}${value}`;
    }

    print = `${print}\n`;

    for (let i = 0; i < this.size(); i++) {
      print = `${print}${this.nodesID[i]}`;

      for (let j = 0; j < this.size(); j++) {
        print = `${print}${spaces}${this.matrix[i][j]}`;
      }

      if (i != this.size() - 1) print = `${print}\n`;
    }

    return print;
  }
  /**
   * Returns the ids' nodes of the graph.
   * @returns {string}
   * @memberof Graph
   */
  printNodesID() {
    let print = "";

    if (this.isEmpty()) return print;

    print = this.nodesID[0];

    for (let i = 1; i < this.nodesID.length; i++) {
      print = `${print}, ${this.nodesID[i]}`;
    }

    return print;
  }
  /**
   * Throw error. Can search for path only from BFS Graph.
   * @param {number} ID
   * @throws {Error} Throws Error if Graph object trying to return path and not bfsGraph object.
   * @memberof Graph
   */
  getPath(ID) {
    throw new Error(
      `Can not search for path. Path must be created from BFS Graph.`
    );
  }
}

module.exports = Graph;
