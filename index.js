const Graph = require("./Graph");
const BFS = require("./BFS");
const FlowGraph = require("./Flow-Graph");
const EKAlgorithm = require("./EdmondsKrap");

class gca {
  CreateGraph() {
    return new Graph();
  }

  CreateFlowGraph() {
    return new FlowGraph();
  }

  BFS(graph, s) {
    return BFS(graph, s);
  }

  EdmondsKarp(graph) {
    return EKAlgorithm(graph);
  }
}

module.exports = gca;
