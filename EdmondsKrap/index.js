const Tools = require('./EKTools');
const BFS = require(`../BFS/index`);
const FlowGraph = require('../Flow-Graph/FlowGraph');
/**
 * The edmonds karp algorithm.
 *
 * @param {FlowGraph} graph The graph that runs the edmonds karp algorithm.
 * @returns The max flow. Return erroe string if the given graph is not instanceof FlowGraph.
 */
function edmondsKarp(graph) {
    if (graph instanceof FlowGraph) {
        let graphF = graph;
        let bfsG = BFS(graphF, graphF.s);
        while (bfsG.checkExistNodeInGraph(graphF.t)) {
            let minPath = bfsG.getPath(graphF.t);
            graphF.changeEdgesToFlowEdges(minPath);
            Tools.augment(graphF, minPath);
            graphF = Tools.updateFlowGraph(graphF, minPath);
            bfsG = BFS(graphF, graphF.s);
        }
        return Tools.flowMax(graphF);
    } else {
        return 'The graph must be instanceof FlowGraph.';
    }
}

module.exports = edmondsKarp;
