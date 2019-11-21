const FlowGraph = require("../");
const ForwardFlowEdge = require("../../Edges/ForwardFlowEdge");
const BackwardFlowEdge = require("../../Edges/BackwardFlowEdge");
const LinkedList = require(`../../LinkedList`);
/**
 * Implementation of Residual Graph. There are tools for building a Residual Graph that will return a correct max flow from Edmonds Krap algorithm.
 * @class FlowGraph
 * @extends {FlowGraph}
 */
class ResidualGraph extends FlowGraph {
  /**
   * Creates an instance of ResidualGraph. Clones the edges and the nodes from graph.
   * @param  {FlowGraph} graph
   * @memberof ResidualGraph
   */
  constructor(graph) {
    super();

    this.edgesList = new LinkedList();
    this.backwardEdgesList = new LinkedList();
    this.cloneMatrix(graph);
    this.initEdges(graph);
  }
  /**
   * Clones the matrix from the Flow Graph.
   * @param {FlowGraph} graph
   * @memberof ResidualGraph
   */
  cloneMatrix(graph) {
    for (let i = 0; i < graph.matrix.length; i++) {
      this.matrix[i] = Array.from(graph.matrix[i]);
    }

    this.nodesID = Array.from(graph.nodesID);
  }
  /**
   * Creates backward and forward edges from the Flow Graph edges.
   * @param {FlowGraph} graph
   * @memberof ResidualGraph
   */
  initEdges(graph) {
    const length = graph.edgesList.size();
    let current = graph.edgesList.head;

    for (let i = 0; i < length; i++) {
      let forward = current.data;
      let backward = graph.getEdge(current.data.to, current.data.from);

      if (this.edgesList.has(forward) == false && this.backwardEdgesList.has(forward) == false) {
        forward = new ForwardFlowEdge(current.data.from, current.data.to, current.data.capacity, current.data.flow);
        this.edgesList.addData(forward);

        if (backward == null) {
          backward = new BackwardFlowEdge(current.data.to, current.data.from, current.data.capacity, current.data.flow);
          this.backwardEdgesList.addData(backward);
        } else {
          backward = new BackwardFlowEdge(backward.from, backward.to, backward.capacity, backward.flow);
          this.backwardEdgesList.addData(backward);
        }
      }
      
      current = current.next;
      forward.backwardEdge = backward;
      backward.forwardEdge = forward;
    }
  }
  /**
   * Returns from a given list, an edge that has the same given nodes.
   * @param {number} from ID of start node edge.
   * @param {number} to ID of end node edge.
   * @param {LinkedList} list ID of end node edge.
   * @returns {object} Edge from the list. Return null if its not exist.
   * @memberof ResidualGraph
   */
  getEdge(from, to, list) {
    let current = list.head;

    if (current == null) return null;

    while (current != null) {
      if (current.data.from == from && current.data.to == to) {
        return current.data;
      }

      current = current.next;
    }
  }
  /**
   * Changes each edge in path to its edge of the graph
   * @param {Path} path The path's edges.
   * @memberof ResidualGraph
   */
  changeEdgesToFlowEdges(path) {
    const newEdges = [];

    for (let i = 0; i < path.size(); i++) {
      let edge = this.getEdge(path.nodes[i], path.nodes[i + 1], this.edgesList);
      
      if (edge == null) {
        edge = this.getEdge(path.nodes[i], path.nodes[i + 1], this.backwardEdgesList);
        newEdges.push(edge);
      } else {
        newEdges.push(edge);
      }
    }
    
    path.edges = newEdges;
  }
  /**
   * ResidualGraph object cannot be cloned.
   * @returns {boolean} False
   * @memberof ResidualGraph
   */
  clone() {
    return null;
  }
}

module.exports = ResidualGraph;
