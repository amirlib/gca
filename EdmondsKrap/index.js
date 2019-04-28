const Tools = require("./EKTools");
const BFS = require(`../BFS`);
const FlowGraph = require("../Flow-Graph");
/**
 * Edmonds karp algorithm.
 *
 * @param {FlowGraph} graph The graph that runs the edmonds karp algorithm.
 * @returns {number} The max flow. Return -1, if the graph is not instance of FlowGraph.
 */
function edmondsKarp(graph) {
  if (graph instanceof FlowGraph) {
    let flowGraph = graph;
    let bfsG = BFS(flowGraph, flowGraph.s);
    while (bfsG.hasNode(flowGraph.t)) {
      console.log(`edmondsKarp while`);
      let minPath = bfsG.getPath(flowGraph.t);
      flowGraph.changeEdgesToFlowEdges(minPath);
      Tools.augment(flowGraph, minPath);
      flowGraph = Tools.updateFlowGraph(flowGraph, minPath);
      bfsG = BFS(flowGraph, flowGraph.s);
    }
    return Tools.flowMax(flowGraph);
  }
  return -1;
}

module.exports = edmondsKarp;
