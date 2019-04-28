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
  let i = 1;
  if (graph instanceof FlowGraph) {
    let flowGraph = graph.clone();
    let bfsG = BFS(flowGraph, flowGraph.s);
    while (bfsG.hasNode(flowGraph.t)) {
      console.log(`edmondsKarp while: ${i}`);
      let minPath = bfsG.getPath(flowGraph.t);
      console.log(minPath.toString());
      flowGraph.changeEdgesToFlowEdges(minPath);
      Tools.augment(flowGraph, minPath);
      console.log("after augment edgesList");
      console.log(flowGraph.edgesList.toString());
      Tools.updateFlowGraph(flowGraph, minPath);
      console.log("edgesList after updateFlowGraph");
      console.log(flowGraph.edgesList.toString());
      bfsG = BFS(flowGraph, flowGraph.s);
      i++;
    }
    return Tools.flowMax(flowGraph.edgesList);
  }
  return -1;
}

module.exports = edmondsKarp;
