const Graph = require("../Graph");
const LinkedList = require("../LinkedList");
const FlowEdge = require("../Edges/FlowEdge");
/**
 * Implementaion of Flow Graph. There are tools for building a Flow Graph that will return a correct max flow from Edmonds Krap alogritem.
 * DONOT use it to reperesent normal graph!
 *
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
   * Inserts a new node to the graph. But the ID can not be 0 OR 1.
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
   * @param {number} flow The flow of edge. Default value is 0.
   * @returns {boolean} True, if edge added successfully to the graph. Otherwise, returns false.
   * @memberof FlowGraph
   */
  addEdge(from, to, capacity = 1, flow = 0) {
    if (super.addEdge(from, to) == true) {
      this.edgesList.addData(new FlowEdge(from, to, capacity, flow));
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
      const edge = this.findEdgeInList(from, to, this.edgesList);
      this.edgesList.removeData(edge);
      return true;
    }
    return false;
  }
  /**
   * Returns from a given list, an edge that has the same given nodes.
   * @param {number} from ID of start node edge.
   * @param {number} to ID of end node edge.
   * @returns {object} Edge from the list. Return null if its not exist.
   * @memberof FlowGraph
   */
  findEdgeInList(from, to) {
    let currNode = this.edgesList.head;
    while (currNode != null) {
      if (currNode.data.from == from && currNode.data.to == to) {
        return currNode.data;
      }
      currNode = currNode.next;
    }
    return null;
  }
  /**
   * Changes each edge in path to its edge of the graph
   * @param {Path} path The path's edges.
   * @memberof FlowGraph
   */
  changeEdgesToFlowEdges(path) {
    let newEdges = [];
    for (let i = 0; i < path.size(); i++) {
      let edge = this.findEdgeInList(path.nodes[i], path.nodes[i + 1]);
      newEdges.push(edge);
    }
    path.edges = newEdges;
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
    cloneGraph.edgesList = this.cloneLinkedList(this.edgesList);
    return cloneGraph;
  }
  /**
   * Deep copies a linkedlist.
   * @param  {LinkedList} list to clone.
   * @return {LinkedList} cloned LinkedList.
   * @memberof FlowGraph
   */
  cloneLinkedList(list) {
    let clonedList = new LinkedList();
    if (list.size() == 0) {
      return clonedList;
    }
    let temp = list.head;
    while (temp != null) {
      let clonedEdge = temp.data.clone();
      clonedList.addData(clonedEdge);
      temp = temp.next;
    }
    return clonedList;
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
