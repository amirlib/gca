const gca = require('./index');

let tool = new gca();

let graph = tool.CreateFlowGraph();

graph.insertNode(2);
graph.insertNode(3);
graph.insertNode(4);
graph.insertNode(5);
graph.insertNode(6);
graph.insertNode(7);
graph.insertNode(8);
graph.insertNode(9);
graph.insertNode(10);
graph.insertNode(11);
graph.insertNode(13);
graph.insertNode(14);
graph.insertNode(15);
graph.insertNode(16);
graph.insertEdge(graph.s, 2);
graph.insertEdge(graph.s, 4);
graph.insertEdge(graph.s, 8);
graph.insertEdge(2, 3);
graph.insertEdge(2, 6);
graph.insertEdge(3, 13);
graph.insertEdge(3, graph.t);
graph.insertEdge(4, 5);
graph.insertEdge(5, 3);
graph.insertEdge(6, 7);
graph.insertEdge(7, graph.t);
graph.insertEdge(8, 9);
graph.insertEdge(9, 10);
graph.insertEdge(10, 11);
graph.insertEdge(11, 2);
graph.insertEdge(13, 14);
graph.insertEdge(14, 15);
graph.insertEdge(15, 16);
graph.insertEdge(16, graph.t);
graph.printGraph();
console.log(`${tool.EdmondsKarp(graph)}`);

let bfsG = tool.BFS(graph, 1);
bfsG.printGraph();

try {
    let path = bfsG.getPath(3);
    path.print();
} catch (error) {
    console.log(`${error.message}`);
}
