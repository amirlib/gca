const gca = require("gca");
const tool = new gca();

let flowGraph = tool.CreateFlowGraph();

flowGraph.addNode(2);
flowGraph.addNode(3);
flowGraph.addNode(4);
flowGraph.addNode(5);
flowGraph.addEdge(flowGraph.s, 2, 16);
flowGraph.addEdge(flowGraph.s, 3, 13);
flowGraph.addEdge(2, 3, 10);
flowGraph.addEdge(2, 4, 12);
flowGraph.addEdge(3, 2, 4);
flowGraph.addEdge(3, 5, 14);
flowGraph.addEdge(4, 3, 9);
flowGraph.addEdge(4, flowGraph.t, 20);
flowGraph.addEdge(5, 4, 7);
flowGraph.addEdge(5, flowGraph.t, 4);

console.log(`${flowGraph.toString()}\n`);
console.log(`${flowGraph.printNodes()}\n`);
console.log(`${tool.EdmondsKarp(flowGraph)}\n`);

let bfsG = tool.BFS(flowGraph, flowGraph.s);

if (bfsG != null) console.log(`${bfsG.toString()}\n`);

let path = bfsG.getPath(0, 5);

if (path != null) console.log(path.toString());
