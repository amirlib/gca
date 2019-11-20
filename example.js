const gca = require("./index");
const tool = new gca();

let graph = tool.CreateGraph();
// let flowGraph = tool.CreateFlowGraph();

graph.addNode(2);
graph.addNode(3);
graph.addNode(4);
graph.addNode(5);
graph.addEdge(2, 3);
graph.addEdge(2, 4);
graph.addEdge(3, 2);
graph.addEdge(3, 5);
graph.addEdge(4, 3);
graph.addEdge(5, 4);
graph.addEdge(5, 5);

console.log(`${graph.toString()}\n`);
console.log(`${graph.printNodesID()}\n`);

// flowGraph.addEdge(flowGraph.s, 2, 16);
// flowGraph.addEdge(flowGraph.s, 3, 13);
// flowGraph.addEdge(2, 3, 10);
// flowGraph.addEdge(2, 4, 12);
// flowGraph.addEdge(3, 2, 4);
// flowGraph.addEdge(3, 5, 14);
// flowGraph.addEdge(4, 3, 9);
// flowGraph.addEdge(4, flowGraph.t, 20);
// flowGraph.addEdge(5, 4, 7);
// flowGraph.addEdge(5, flowGraph.t, 4);


// console.log(`${graph.toString()}\n`);
// console.log(`${graph.printNodesID()}\n`);
// console.log(`${graph.countEdges()}\n`);

// console.log(flowGraph.findEndNodesEdgesFromNode(2));
// console.log(tool.EdmondsKarp(flowGraph));

let bfsG = tool.BFS(graph, 2);
console.log(`${bfsG.toString()}\n`);

// try {
//     let path = bfsG.getPath(5);
//     console.log(path.toString());
// } catch (error) {
//     console.log(`${error.message}`);
// }
