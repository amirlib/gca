/**
 * Implementation of Graph.
 * @class Graph
 */
class Graph {
  constructor() {
    this.nodesID = []; //An array of Nodes ID - When the ID inside index 'i' in this array represent the ID inside index of 'i + 1' in the Matrix array.
    this.matrix = []; //2d Array that represents the Graph as 'Adjacency matrix'.
    this.matrix[0] = ["M"];
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
    const length = this.matrix.length;
    let counter = 0;

    for (let i = 1; i < length; i++) {
      for (let j = 1; j < length; j++) {
        if (this.matrix[i][j] == 1) {
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

    let length = this.matrix.length;
    this.nodesID.push(ID);
    this.matrix[0].push(ID);
    this.matrix[length] = [ID];

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
    let fromIndex = this.indexOfNodeID(from);
    let toIndex = this.indexOfNodeID(to);

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
    let length = this.matrix.length;
    let index = this.indexOfNodeID(ID);

    if (index == -1) return false;

    for (let i = 0; i < length; i++) {
      for (let j = index; j < length - 1; j++) {
        this.matrix[i][j] = this.matrix[i][j + 1];
      }

      this.matrix[i].pop();
    }

    for (let i = index; i < length; i++) {
      this.matrix[i] = this.matrix[i + 1];
    }

    this.matrix.pop();
    length = this.nodesID.length;
    index = this.indexOfNodeID(ID) - 1;

    for (let i = index; i < length; i++) { // Delete the ID from the nodeID array.
      this.nodesID[i] = this.nodesID[i + 1];
    }

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
    let fromIndex = this.indexOfNodeID(from);
    let toIndex = this.indexOfNodeID(to);

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
    for (let i = 0; i < this.nodesID.length; i++) {
      if (this.nodesID[i] == ID) {
        return i + 1;
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
    let index = this.indexOfNodeID(ID);
    let result = [];

    if (index == -1) return result;

    for (let i = 1; i < this.matrix.length; i++) {
      if (this.matrix[index][i] == 1) {
        result.push(this.matrix[0][i]);
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
    let index = this.indexOfNodeID(ID);
    let result = [];

    if (index == -1) return result;

    for (let i = 1; i < this.matrix.length; i++) {
      if (this.matrix[i][index] == 1) {
        result.push(this.matrix[i][0]);
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
    let fromIndex = this.indexOfNodeID(from);
    let toIndex = this.indexOfNodeID(to);

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
    for (let i = 0; i < this.nodesID.length; i++) {
      if (this.nodesID[i] == ID) {
        return true;
      }
    }

    return false;
  }
  /**
   * Deep copies a graph object. Will not clone bfsGraph object.
   * @returns {Graph} Cloned Graph.
   * @memberof Graph
   */
  clone() {
    let graph = new Graph();

    for (let i = 0; i < this.matrix.length; i++) {
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
    const matrixIterator = this.matrix.values();
    let print = "";

    for (const row of matrixIterator) {
      const rowsIterator = row.values();

      for (const value of rowsIterator) {
        print = `${print}     ${value}`;
      }

      print = `${print}\n`;
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

    this.nodesID.forEach(node => print = `${print} ${node}`);
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
