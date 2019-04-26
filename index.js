const Graph = require('./Graph/Graph');
const BFS = require('./BFS/index');
const FlowGraph = require('./Flow-Graph/FlowGraph');
const EKAlgorithm = require('./EdmondsKrap/index');

class gca {
    CreateGraph() {
        return new Graph();
    }

    CreateFlowGraph() {
        return new FlowGraph();
    }

    BFS(graph, s) {
        return BFS(graph, s)
    }

    EdmondsKarp(graph) {
        return EKAlgorithm(graph);
    }
}

module.exports = gca;
