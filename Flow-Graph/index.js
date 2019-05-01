const Graph = require("../Graph");
const LinkedList = require("../LinkedList");
const FlowEdge = require("../Edges/FlowEdge");
/**
 * Implementaion of Flow Graph. There are tools for building a Flow Graph that will return a correct max flow from Edmonds Krap alogritem.
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
   * Marks in the Graph's matrix new edge. USE it only when use need to update the forward edge that was deleted beacuse the capacity of the edge was full.
   * @param {number} from ID of start node edge.
   * @param {number} to ID of the end node edge.
   * @memberof FlowGraph
   */
  markEdge(from, to) {
    let fromIndex = this.indexOfNodeID(from);
    let toIndex = this.indexOfNodeID(to);
    this.matrix[fromIndex][toIndex] = 1;
  }
  /**
   * Unmarks in the Graph's matrix the edge. USE it only when use need to update the forward edge that was deleted beacuse the capacity of the edge was full.
   * @param {number} from ID of start node edge.
   * @param {number} to ID of the end node edge.
   * @memberof FlowGraph
   */
  unmarkEdge(from, to) {
    let fromIndex = this.indexOfNodeID(from);
    let toIndex = this.indexOfNodeID(to);
    this.matrix[fromIndex][toIndex] = 0;
  }
  /**
   * Inserts a new node to the graph. ID cannot be 0 OR 1.
   * @param {number} ID ID of node to insert.
   * @returns {boolean} True, if node added successfully to the graph. Otherwise, returns false.
   * @memberof FlowGraph
   */
  addNode(ID) {
    if (ID != 0 && ID != 1) {
      return super.addNode(ID);
    }
    return false;
  }
  /**
   * Deletes given node ID from the graph except node ID: 0 and 1. Deletes also all the edges that related to this ID.
   * @param {number} ID ID of node to delete.
   * @returns {boolean} True, if node deleted successfully from the graph. Otherwise, returns false.
   * @memberof FlowGraph
   */
  deleteNode(ID) {
    if (ID != 0 && ID != 1 && this.hasNode(ID)) {
      let endNodesEdges = this.findEndNodesEdgesFromNode(ID);
      for (let i = 0; i < endNodesEdges.length; i++) {
        this.deleteEdge(ID, endNodesEdges[i]);
      }
      let stratNodesEdges = this.findStartNodesEdgesFromNode(ID);
      for (let i = 0; i < stratNodesEdges.length; i++) {
        this.deleteEdge(stratNodesEdges[i], ID);
      }
      super.deleteNode(ID);
      return true;
    }
    return false;
  }
  /**
   * Inserts new edge to the graph - When '1' in (from, to) represent an edge from startNodeID to endNodeID, and also create an object for the edge.
   * @param {number} from ID of strat Node of edge.
   * @param {number} to ID of end Node of edge.
   * @param {number} capacity The capacity of edge. Default value is 1.
   * @returns {boolean} True, if edge added successfully to the graph. Otherwise, returns false.
   * @memberof FlowGraph
   */
  addEdge(from, to, capacity = 1) {
    if (super.addEdge(from, to) == true) {
      this.edgesList.addData(new FlowEdge(from, to, capacity, 0));
      return true;
    }
    return false;
  }
  /**
   * Deletes edge from the graph.
   * @param {number} from ID of strat Node of edge.
   * @param {number} to ID of end Node of edge.
   * @returns {boolean} True, if edge deleted successfully from the graph. Otherwise, returns false.
   * @memberof FlowGraph
   */
  deleteEdge(from, to) {
    if (super.deleteEdge(from, to) == true) {
      const edge = this.getEdge(from, to, this.edgesList);
      this.edgesList.removeData(edge);
      return true;
    }
    return false;
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
    let cloneGraph = new FlowGraph();
    for (let i = 0; i < this.matrix.length; i++) {
      cloneGraph.matrix[i] = Array.from(this.matrix[i]);
    }
    cloneGraph.nodesID = Array.from(this.nodesID);
    cloneGraph.edgesList = this.edgesList.clone();
    return cloneGraph;
  }
  /**
   * Throws error. Can serch for path only from BFS Graph.
   * @param {number} ID
   * @memberof FlowGraph
   */
  getPath(ID) {
    throw new Error(
      `Can not search for path. Path must be created from BFS Graph.`
    );
  }
}

module.exports = FlowGraph;
