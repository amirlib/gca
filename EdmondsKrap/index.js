const Tools = require("./EKTools");
const BFS = require(`../BFS`);
const ResidualGraph = require("../Flow-Graph/Residual-Graph");
const FlowGraph = require("../Flow-Graph/");
/**
 * Edmonds karp algorithm.
 * @param {FlowGraph} graph The graph that runs the edmonds karp algorithm.
 * @returns {number} The max flow. Return -1, if the graph is not instance of FlowGraph.
 */
function edmondsKarp(graph) {
  if (graph instanceof FlowGraph) {
    graph.reset();
    let flow = 0;
    let residualGraph = new ResidualGraph(graph);
    let bfsGraph = BFS(residualGraph, residualGraph.s);

    while (bfsGraph.hasNode(residualGraph.t)) {
      let path = bfsGraph.getPath(residualGraph.t);
      residualGraph.changeEdgesToFlowEdges(path);
      flow = flow + Tools.augment(graph, residualGraph.edgesList, path);
      Tools.updateFlowGraph(graph, residualGraph, path);
      bfsGraph = BFS(residualGraph, residualGraph.s);
    }
    return flow;
  }
  return -1;
}

module.exports = edmondsKarp;
