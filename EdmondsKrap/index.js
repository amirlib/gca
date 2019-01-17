const Tools = require('./EKTools');
const BFS = require(`../BFS/index`);
const FlowGraph = require('../Flow-Graph/FlowGraph');
/**
 * Edmonds karp algorithm.
 *
 * @param {FlowGraph} graph The graph that runs the edmonds karp algorithm.
 * @returns {number} The max flow. Return -1, if the graph is not instance of FlowGraph.
 */
function edmondsKarp(graph) {
    if (graph instanceof FlowGraph) {
        let graphF = graph;
        let bfsG = BFS(graphF, graphF.s);
        while (bfsG.hasNode(graphF.t)) {
            let minPath = bfsG.getPath(graphF.t);
            graphF.changeEdgesToFlowEdges(minPath);
            Tools.augment(graphF, minPath);
            graphF = Tools.updateFlowGraph(graphF, minPath);
            bfsG = BFS(graphF, graphF.s);
        }
        return Tools.flowMax(graphF);
    }
    return -1;
}

module.exports = edmondsKarp;
