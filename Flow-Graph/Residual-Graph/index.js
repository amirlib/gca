const FlowGraph = require("../");
const ForwardFlowEdge = require("../../Edges/ForwardFlowEdge");
const BackwardFlowEdge = require("../../Edges/BackwardFlowEdge");
const LinkedList = require(`../../LinkedList`);
/**
 * Implementaion of Residual Graph. There are tools for building a Residual Graph that will return a correct max flow from Edmonds Krap alogritem.
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
    this.initEdgesList(graph);
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
  initEdgesList(graph) {
    const length = graph.edgesList.size();
    let current = graph.edgesList.head;

    for (let i = 0; i < length; i++) {
      const forward = current.data;
      if (
        this.edgesList.has(forward) == false &&
        this.backwardEdgesList.has(forward) == false
      ) {
        this.edgesList.addData(
          new ForwardFlowEdge(
            forward.from,
            forward.to,
            forward.capacity,
            forward.flow
          )
        );
        const backward = graph.getEdge(forward.to, forward.from);
        if (backward == null) {
          this.backwardEdgesList.addData(
            new BackwardFlowEdge(
              forward.to,
              forward.from,
              forward.capacity,
              forward.flow
            )
          );
        } else {
          this.backwardEdgesList.addData(
            new BackwardFlowEdge(
              backward.from,
              backward.to,
              backward.capacity,
              backward.flow
            )
          );
        }
      }
      current = current.next;
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
    let currNode = list.head;
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
   * @memberof ResidualGraph
   */
  changeEdgesToFlowEdges(path) {
    let newEdges = [];
    for (let i = 0; i < path.size(); i++) {
      let edge = this.getEdge(
        path.nodes[i],
        path.nodes[i + 1],
        this.edgesList
      );
      if (edge == null) {
        edge = this.getEdge(
          path.nodes[i],
          path.nodes[i + 1],
          this.backwardEdgesList
        );
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
