const FlowGraph = require("../");
const ForwardFlowEdge = require("../../Edges/ForwardFlowEdge");
const BackwardFlowEdge = require("../../Edges/BackwardFlowEdge");
const LinkedList = require("../../LinkedList");
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
   * If capacity of the edge is zero, unmark from the graph. Otherwise, mark it.
   * @param  {FlowEdge} edge The edge.
   * @memberof ResidualGraph
   */
  ChooseToMarkOrUnmarkEdge(edge) {
    if (edge.isCapacityZero()) {
      this.unmarkEdge(edge.from, edge.to);
    } else {
      this.markEdge(edge.from, edge.to);
    }
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
    let current = graph.edgesList.head;

    while (current != null) {
      let forward = current.data;
      let backward = graph.getEdge(current.data.to, current.data.from);

      if (!this.edgesList.has(forward) && !this.backwardEdgesList.has(forward)) {
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
      
      forward.backwardEdge = backward;
      backward.forwardEdge = forward;
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
