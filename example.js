const gca = require('./index');

const tool = new gca();

let graph = tool.CreateFlowGraph();

graph.addNode(2);
graph.addNode(3);
graph.addNode(4);
graph.addNode(5);
graph.addNode(6);
graph.addNode(7);
graph.addNode(8);
graph.addNode(9);
graph.addNode(10);
graph.addNode(11);
graph.addNode(13);
graph.addNode(14);
graph.addNode(15);
graph.addNode(16);
graph.addEdge(graph.s, 2);
graph.addEdge(graph.s, 4);
graph.addEdge(graph.s, 8);
graph.addEdge(2, 3);
graph.addEdge(2, 6);
graph.addEdge(3, 13);
graph.addEdge(3, graph.t);
graph.addEdge(4, 5);
graph.addEdge(5, 3);
graph.addEdge(6, 7);
graph.addEdge(7, graph.t);
graph.addEdge(8, 9);
graph.addEdge(9, 10);
graph.addEdge(10, 11);
graph.addEdge(11, 2);
graph.addEdge(13, 14);
graph.addEdge(14, 15);
graph.addEdge(15, 16);
graph.addEdge(16, graph.t);
console.log(graph.toString());
console.log(graph.printNodesID());
console.log(tool.EdmondsKarp(graph));

let bfsG = tool.BFS(graph, graph.s);
console.log(bfsG.toString());

try {
    let path = bfsG.getPath(13);
    console.log(path.toString());
} catch (error) {
    console.log(`${error.message}`);
}
