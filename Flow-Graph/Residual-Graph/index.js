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
      let backward = undefined;

      if (!this.backwardEdgesList.has(forward)) {
        forward = new ForwardFlowEdge(current.data.from, current.data.to, current.data.capacity, current.data.flow);

        if (graph.hasEdge(current.data.to, current.data.from)) {
          const edge = graph.getEdge(current.data.to, current.data.from);

          backward = new BackwardFlowEdge(edge.from, edge.to, edge.capacity, edge.flow);
        } else {
          backward = new BackwardFlowEdge(current.data.to, current.data.from, current.data.capacity, current.data.flow);
        }

        forward.backwardEdge = backward;
        backward.forwardEdge = forward;
        this.backwardEdgesList.enqueue(backward);
        this.edgesList.enqueue(forward);
      }

      current = current.next;
    }
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
