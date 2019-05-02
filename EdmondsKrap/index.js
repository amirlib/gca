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
    let path = residualGraph.getPath(residualGraph.s, residualGraph.t);

    while (path.size() > 0) {
      residualGraph.changeEdgesToFlowEdges(path);
      flow = flow + Tools.augment(graph, path);
      Tools.updateFlowGraph(graph, residualGraph, path);
      path = residualGraph.getPath(residualGraph.s, residualGraph.t);
    }
    return flow;
  }
  return -1;
}

module.exports = edmondsKarp;
