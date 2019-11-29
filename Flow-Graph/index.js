const BFS = require("../BFS");
const Graph = require("../Graph");
const LinkedList = require("../LinkedList");
const FlowEdge = require("../Edges/FlowEdge");
/**
 * Implementation of Flow Graph. There are tools for building a Flow Graph that will return a correct max flow from Edmonds Krap algorithm.
 * @class FlowGraph
 * @extends {Graph}
 */
class FlowGraph extends Graph {
  constructor() {
    super();

    this.s = 0;
    this.t = 1;
    this.edgesList = new LinkedList(); //Save the edges of the graph.
    super.addNode(this.s);
    super.addNode(this.t);
  }
  /**
   * Marks in the Graph's matrix new edge. USE it only when use need to update the forward edge that was deleted because the capacity of the edge was full.
   * @param {number} from ID of start node edge.
   * @param {number} to ID of the end node edge.
   * @memberof FlowGraph
   */
  markEdge(from, to) {
    const fromIndex = this.indexOfNode(from);
    const toIndex = this.indexOfNode(to);

    this.matrix[fromIndex][toIndex] = 1;
  }
  /**
   * Unmarks in the Graph's matrix the edge. USE it only when use need to update the forward edge that was deleted because the capacity of the edge was full.
   * @param {number} from ID of start node edge.
   * @param {number} to ID of the end node edge.
   * @memberof FlowGraph
   */
  unmarkEdge(from, to) {
    const fromIndex = this.indexOfNode(from);
    const toIndex = this.indexOfNode(to);

    this.matrix[fromIndex][toIndex] = 0;
  }
  /**
   * Inserts a new node to the graph. ID cannot be 0 OR 1.
   * @param {number} ID ID of node to insert.
   * @returns {boolean} True, if node added successfully to the graph. Otherwise, returns false.
   * @memberof FlowGraph
   */
  addNode(ID) {
    if (ID == 0 || ID == 1) return false;

    return super.addNode(ID);
  }
  /**
   * Deletes given node ID from the graph except node ID: 0 and 1. Deletes also all the edges that related to this ID.
   * @param {number} ID ID of node to delete.
   * @returns {boolean} True, if node deleted successfully from the graph. Otherwise, returns false.
   * @memberof FlowGraph
   */
  deleteNode(ID) {
    if (ID == 0 || ID == 1 || !this.hasNode(ID)) return false;

    const endNodesEdges = this.getNodesOfEdgesEndingNode(ID);
    const startNodesEdges = this.getNodesOfEdgesStartingNode(ID);
    let iterator = endNodesEdges.values();

    for (const value of iterator) {
      this.deleteEdge(ID, value);
    }

    iterator = startNodesEdges.values();

    for (const value of iterator) {
      this.deleteEdge(value, ID);
    }

    super.deleteNode(ID);
    return true;
  }
  /**
   * Inserts new edge to the graph - When '1' in (from, to) represent an edge from startNodeID to endNodeID, and also create an object for the edge.
   * @param {number} from ID of start Node of edge.
   * @param {number} to ID of end Node of edge.
   * @param {number} capacity The capacity of edge. Default value is 1.
   * @param {number} flow The flow of edge. Default value is 0.
   * @returns {boolean} True, if edge added successfully to the graph. Otherwise, returns false.
   * @memberof FlowGraph
   */
  addEdge(from, to, capacity = 1, flow = 0) {
    if (!super.addEdge(from, to)) return false;

    this.edgesList.push(new FlowEdge(from, to, capacity, flow));
    return true;
  }
  /**
   * Deletes edge from the graph.
   * @param {number} from ID of start Node of edge.
   * @param {number} to ID of end Node of edge.
   * @returns {boolean} True, if edge deleted successfully from the graph. Otherwise, returns false.
   * @memberof FlowGraph
   */
  deleteEdge(from, to) {
    if (!super.deleteEdge(from, to)) return false;

    const edge = this.getEdge(from, to);

    this.edgesList.remove(edge);
    return true;
  }
  /**
   * Returns an edge that has the same 'from' and 'to' nodes as were given.
   * @param {number} from ID of start node edge.
   * @param {number} to ID of end node edge.
   * @returns {object} FlowEdge object from the list. Return null if its not exist.
   * @memberof FlowGraph
   */
  getEdge(from, to) {
    let current = this.edgesList.head;

    while (current != null) {
      if (current.data.from == from && current.data.to == to) {
        return current.data;
      }

      current = current.next;
    }

    return null;
  }
  /**
   * Resets the flow of all edges in the graph.
   * @memberof FlowGraph
   */
  reset() {
    let current = this.edgesList.head;

    while (current != null) {
      current.data.resetFlow();
      current = current.next;
    }
  }
  /**
   * Deep copies a FlowGraph object.
   * @returns {FlowGraph} Copied FlowGraph.
   * @memberof FlowGraph
   */
  clone() {
    let graph = new FlowGraph();

    for (let i = 0; i < this.matrix.length; i++) {
      graph.matrix[i] = Array.from(this.matrix[i]);
    }
    
    graph.nodesID = Array.from(this.nodesID);
    graph.edgesList = this.edgesList.clone();
    return graph;
  }
  /**
   * Returns the shortest path from the 'from' node to 'to' node.
   * @param  {number} from the start node
   * @param  {number} to the ent node
   * @returns {Path} Path object.
   * @memberof FlowGraph
   */
  getPath(from, to) {
    return BFS(this, from).getPath(to);
  }
}

module.exports = FlowGraph;
