const gca = require("./index");

const tool = new gca();

let graph = tool.CreateFlowGraph();

graph.addNode(2);
graph.addNode(3);
graph.addNode(4);
graph.addNode(5);
graph.addEdge(graph.s, 2, 16);
graph.addEdge(graph.s, 3, 13);
graph.addEdge(2, 3, 10);
graph.addEdge(2, 4, 12);
graph.addEdge(3, 2, 4);
graph.addEdge(3, 5, 14);
graph.addEdge(4, 3, 9);
graph.addEdge(4, graph.t, 20);
graph.addEdge(5, 4, 7);
graph.addEdge(5, graph.t, 4);

console.log(graph.toString());

console.log(graph.countEdges());
console.log(graph.printNodesID());
console.log(tool.EdmondsKarp(graph));

let bfsG = tool.BFS(graph, graph.s);
console.log(bfsG.toString());

try {
    let path = bfsG.getPath(5);
    console.log(path.toString());
} catch (error) {
    console.log(`${error.message}`);
}
