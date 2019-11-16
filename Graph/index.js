/**
 * Implementation of Graph, includes the BFS algorithm.
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
    if (this.hasNode(ID) == false) {
      //If node ID is not exist, create new one
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
    return false;
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
    if (fromIndex != -1 && toIndex != -1) {
      this.matrix[fromIndex][toIndex] = 1;
      return true;
    }
    return false;
  }
  /**
   * Deletes given node ID from the graph, including all the edges that related to this ID.
   * @param {number} ID ID of node to delete.
   * @returns {boolean} True, if the node was deleted successfully from the graph. Otherwise, returns false.
   * @memberof Graph
   */
  deleteNode(ID) {
    let length = this.matrix.length;
    let nodeIndex = this.indexOfNodeID(ID);
    if (nodeIndex != -1) {
      for (let i = 0; i < length; i++) {
        for (let j = nodeIndex; j < length - 1; j++) {
          this.matrix[i][j] = this.matrix[i][j + 1];
        }
        this.matrix[i].pop();
      }
      for (let i = nodeIndex; i < length; i++) {
        this.matrix[i] = this.matrix[i + 1];
      }
      this.matrix.pop();
      /* Delete the ID from the nodeID array. */
      length = this.nodesID.length;
      nodeIndex = this.indexOfNodeID(ID) - 1;
      for (let i = nodeIndex; i < length; i++) {
        this.nodesID[i] = this.nodesID[i + 1];
      }
      this.nodesID.pop();
      return true;
    }
    return false;
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
    if (fromIndex != -1 && toIndex != -1) {
      this.matrix[fromIndex][toIndex] = 0;
      return true;
    }
    return false;
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
   * Finds edges that have the fromNode of the node with id: ID.
   * @param {number} ID ID of node.
   * @returns {number[]} An array of IDs that are the toNodes of the edges. Returns empty array if there are no edges like that.
   * @memberof Graph
   */
  findEndNodesEdgesFromNode(ID) {
    let nodeIndex = this.indexOfNodeID(ID);
    let result = [];
    if (nodeIndex != -1) {
      for (let i = 1; i < this.matrix.length; i++) {
        if (this.matrix[nodeIndex][i] == 1) {
          result.push(this.matrix[0][i]);
        }
      }
    }
    return result;
  }
  /**
   * Finds edges that have the toNode of the node with id: ID.
   * @param {number} ID ID of node.
   * @returns {number[]} An array of IDs that are the fromNodes of the edges. Returns empty array if there are no edges like that.
   * @memberof Graph
   */
  findStartNodesEdgesFromNode(ID) {
    let nodeIndex = this.indexOfNodeID(ID);
    let result = [];
    if (nodeIndex != -1) {
      for (let i = 1; i < this.matrix.length; i++) {
        if (this.matrix[i][nodeIndex] == 1) {
          result.push(this.matrix[i][0]);
        }
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
    if (fromIndex != -1 && toIndex != -1) {
      if (this.matrix[fromIndex][toIndex] == 1) {
        return true;
      }
    }
    return false;
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
    let cloneGraph = new Graph();
    for (let i = 0; i < this.matrix.length; i++) {
      cloneGraph.matrix[i] = Array.from(this.matrix[i]);
    }
    cloneGraph.nodesID = Array.from(this.nodesID);
    return cloneGraph;
  }
  /**
   * Returns the matrix of the graph.
   * @returns {string}
   * @memberof Graph
   */
  toString() {
    let print = "";
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix.length; j++) {
        print = `${print}     ${this.matrix[i][j]}`;
      }
      if (i != this.matrix.length - 1) {
        print = `${print}\n`;
      }
    }
    return print;
  }
  /**
   * Returns the nodes that are in NodesID array.
   * @returns {string}
   * @memberof Graph
   */
  printNodesID() {
    let print = "";
    for (let i = 0; i < this.nodesID.length; i++) {
      print = `${print} ${this.nodesID[i]}`;
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
