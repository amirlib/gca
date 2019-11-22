const gca = require("./index");
const tool = new gca();

let graph = tool.CreateGraph();

console.log(`${graph.toString()}\n`);
console.log(`${graph.printNodesID()}\n`);

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
console.log(`${flowGraph.printNodesID()}\n`);

console.log(`${flowGraph.findEndNodesEdgesFromNode(2)}\n`);
console.log(`${tool.EdmondsKarp(flowGraph)}\n`);

let bfsG = tool.BFS(flowGraph, flowGraph.s);
console.log(`${bfsG.toString()}\n`);
console.log(`${bfsG.printLayers()}\n`);

try {
    let path = bfsG.getPath(5);
    console.log(path.toString());
} catch (error) {
    console.log(`${error.message}`);
}
