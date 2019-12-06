const Tools = require("./EKTools");
const ResidualGraph = require("../Flow-Graph/Residual-Graph");
const FlowGraph = require("../Flow-Graph/");
/**
 * Edmonds karp algorithm.
 * @param {FlowGraph} graph The graph that runs the edmonds karp algorithm.
 * @returns {number} The max flow. Returns 0, if the given graph is not instance of FlowGraph.
 */
function edmondsKarp(graph) {
  let flow = 0;

  if (!graph instanceof FlowGraph) return flow;

  graph.reset();

  const residualGraph = new ResidualGraph(graph);
  let path = residualGraph.getPath(residualGraph.s, residualGraph.t);

  while (path != null) {
    flow = flow + Tools.augment(graph, path);
    Tools.updateResidualGraph(graph, residualGraph, path);
    path = residualGraph.getPath(residualGraph.s, residualGraph.t);
  }

  return flow;
}

module.exports = edmondsKarp;
