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
    let flowGraph = graph.clone();
    let bfsG = BFS(flowGraph, flowGraph.s);
    while (bfsG.hasNode(flowGraph.t)) {
      console.log(`edmondsKarp while`);
      let minPath = bfsG.getPath(flowGraph.t);
      console.log(minPath.toString());
      flowGraph.changeEdgesToFlowEdges(minPath);
      Tools.augment(flowGraph, minPath);
      Tools.updateFlowGraph(flowGraph, minPath);
      console.log("forwardEdgeList");
      console.log(flowGraph.forwardEdgesList.toString());
      console.log("backwardEdgesList");
      console.log(flowGraph.backwardEdgesList.toString());
      bfsG = BFS(flowGraph, flowGraph.s);
    }
    return Tools.flowMax(flowGraph);
  }
  return -1;
}

module.exports = edmondsKarp;
