# gca

Graph Classic Algorithms: Use classic algorithms like BFS and Edmonds Krap on graphs.

## Installation

```bash
npm install gca
```

## Usage

```js
const gca = require('gca');
const tool = new gca();

let graph = tool.CreateGraph();
let bfsGraph = tool.BFS(graph, NodeID);
let flowGraph = tool.CreateFlowGraph();
let maxFlow = tool.EdmondsKarp(flowGraph);
```
## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## API

The full documentation can be found in each class.

### gca

- `CreateGraph()` - Creates a graph object from Graph class.
- `BFS(graph, NodeID)` - Returns a BFS graph(tree) object from bfsGraph class when the root is the Node ID.
- `CreateFlowGraph()` - Creates a flow-network graph object from FlowGraph class when for now the capacity of each edge is 1.
- `EdmondsKarp(flowGraph)` - Returns the maximum flow of the flow-network graph object. Return -1 if the graph object is not instanceof FlowGraph class.

### Graph

The graph represented in the matrix when: In first row and column where the IDs of nodes.  
'1' in the matrix in row i and column j represent an edge: (node in the first row at index i, node in the first column at index j).  
nodesID - An array of nodes ID.

- `size()` - Get the number of nodes in the graph.
- `addNode(ID)` - Insert a new node to the graph. The ID must be number.
- `addEdge(from, to)` - Insert new edge to the graph: when (from, to) represent an edge from startNodeID to endNodeID.
- `deleteNode(ID)` - Delete given node ID from the graph, including all the edges that related to this ID.
- `deleteEdge(from, to)` - Delete edge from the graph.
- `indexOfNodeID(ID)` - Search for an index of the node with id: ID, that will be represented in the matrix of the graph.
- `findEndNodesEdgesFromNode(ID)` - Find edges that have the fromNode of the node with id: ID.
- `findStartNodesEdgesFromNode(ID)` - Find edges that have the toNode of the node with id: ID.
- `hasEdge(from, to)` - Check if an edge: (from, to) exist in the graph.
- `hasNode(ID)` - Check if the given node exists in the graph.
- `clone()` - Graph object creates an exact copy of its own. Will clone bfsGraph and FlowGraph objects too, but only their nodesID and matrix arrays.Checks if the given node exists in the graph.
- `printNodesID()` - Print the matrix of the graph.
- `toString()` - Print the nodes that are in NodesID array.

### bfsGraph

Extends from Graph.
layer - 2D array of nodes in each layer of the graph.

- `countNodesInLayer(index)` - Count the nodes in the layer.
- `hasNodeInLayer(ID, index)` - Search for the given node in the given layer.
- `getNodeIDFromLayer(cellLayer, indexLayer)` - Get the ID node in the position: cellInLayer in layer at index: indexLayer.
- `getParentNodeID(ID)` - Get the parent node ID of the given node ID.
- `getLayerIndexOfNodeID(ID)` - Get the index of layer where node ID is exist.
- `printLayer()` - Print all the nodes inside the layers.
- `getPath(ID)` - Get an Path object: the shortest path from the root node to node t.

### Path

Path object contains array of nodes and array of edges, when each edge is an instanceof Edge class. You can print the edges.

- `size()` - Get the number of edged in the path.
- `toString()` - Print the edges of the path.

### FlowGraph

Extends from Graph.

forwardEdgesList - An linkedlist of forward flow edges.  
backwardEdgesList - An linkedlist of backward flow edges.  
FlowEdge extends from edge: Save also the capacity and the flow.  
BackwardFlowEdge extends from FlowEdge, only for classifying  as a backward edge. You can print the edges.  
ForwardFlowEdge extends from FlowEdge, only for classifying  as a forward edge. You can print the edges.  

- `findEdgeInList(from, to, list)` - Return from a given list, an edge that has the same given nodes.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/babudabu/gca/blob/master/LICENSE) file for details.
