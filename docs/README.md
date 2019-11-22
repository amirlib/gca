# Graphs Classical Algorithms

Use classical algorithms like BFS and Edmonds Krap on graphs.

## Installation

```bash
npm i gca
```

## Usage

```js
const gca = require('gca');
const tool = new gca();

let graph = tool.CreateGraph();
graph.addNode(1);
graph.addNode(2);
graph.addEdge(1, 2);
let bfsGraph = tool.BFS(graph, 1);
let flowGraph = tool.CreateFlowGraph();
flowGraph.addEdge(flowGraph.s, flowGraph.t);
let maxFlow = tool.EdmondsKarp(flowGraph);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## API

The full documentation can be found in each class.

### gca

* `CreateGraph()`
  * Creates an empty graph object from Graph class.
* `BFS(graph, s)`
  * BFS algorithm.
  * **@param {Graph} graph** - The given graph for BFS
  * **@param {number} s** - ID of root node.
  * **@returns {bfsGraph}** BFS graph object. Return -1 if there no such s node in the original graph.
* `CreateFlowGraph()`
  * Creates an empty flow-network graph object from FlowGraph class.
* `EdmondsKarp(flowGraph)`
  * Edmonds karp algorithm.
  * **@param {FlowGraph} graph** - The graph for Edmonds karp algorithm.
  * **@returns {number}** The max flow. Return -1, if the graph is not instance of FlowGraph.

### Graph

1. **matrix** (2d array) - The matrix property of the graph stores whether there edges in (i, j) where i and j are the indexes in nodesID array that represents the correct IDs of the edge.  
2. '1' in the matrix in row i and column j represent an edge.  
3. **nodesID** - An array of nodes ID.

* `size()`
  * Returns the number of nodes in the graph.
  * **@returns {number}** The number of nodes.
* `countEdges()`
  * Counts the number of edges in graph.
  * **@return {number}** The number of edges in graph.
* `addNode(ID)`
  * Inserts a new node to the graph. The ID must be number.
  * **@param {number} ID** - ID of node to insert.
  * **@returns {boolean}** True, if node ID added successfully to the graph. Otherwise, returns false.
* `addEdge(from, to)`
  * Inserts new edge to the graph: when (from, to) represent an edge from startNodeID to endNodeID.
  * **@param {number} from** - ID of start Node of edge.
  * **@param {number} to** - ID of end Node of edge.
  * **@returns {boolean}** True, if edge added successfully to the graph. Otherwise, returns false.
* `deleteNode(ID)`
  * Deletes given node ID from the graph, including all the edges that related to this ID.
  * **@param {number} ID** - ID of node to delete.
  * **@returns {boolean}** True, if the node was deleted successfully from the graph. Otherwise, returns false.
* `deleteEdge(from, to)`
  * Deletes edge from the graph.
  * **@param {number} from** - ID of start Node of edge.
  * **@param {number} to** - ID of end Node of edge.
  * **@returns {boolean}** True, if edge deleted successfully from the graph. Otherwise, returns false.
* `indexOfNodeID(ID)`
  * Searches for an index of the node with id: ID, that will be represented in the matrix of the graph.
  * **@param {number} ID** - ID of node to search.
  * **@returns {number}** The index of the node that represents the same index in the matrix of the graph. Returns -1 if there is no such ID.
* `findEndNodesEdgesFromNode(ID)`
  * Finds nodes, which are the end nodes of edges where the starting node has id of the given id.
  * **@param {number} ID** - ID of node.
  * **@returns {number[]}** An array of IDs. Returns empty array if there are no edges like that.
* `findStartNodesEdgesFromNode(ID)`
  * Finds nodes, which are the start nodes of edges where the ending node has id of the given id.
  * **@param {number} ID** - ID of node.
  * **@returns {number[]}** An array of IDs. Returns empty array if there are no edges like that.
* `hasEdge(from, to)`
  * Checks if an edge: (from, to) exist in the graph.
  * **@param {number} from** - ID of start Node of edge.
  * **@param {number} to** - ID of end Node of edge.
  * **@returns {boolean}** True if graph has such edge. Otherwise, False.
* `hasNode(ID)`
  * Checks if the given node exists in the graph.
  * **@param {number}** - ID The given node ID.
  * **@returns {boolean}** True if exist, otherwise False.
* `isEmpty()`
  * Checks whether the graph is empty.
  * **@returns {Boolean}** True, if the graph is empty. Otherwise, returns false.
* `clone()`
  * Deep copies a graph object.
  * **@returns {Graph}** Cloned Graph.
* `printNodesID()`
  * Returns the ids' nodes of the graph.
  * **@returns {string}**
* `toString()`
  * Returns the presentation of the graph as a matrix.
  * **@returns {string}**

### bfsGraph

Implementation of BFS Graph. There are tools for building a Graph that it result of the BFS algorithm.

1. Extends from **Graph**.
2. **layers** - An array of nodes in each layer of the graph.

* `layersNumber()`
  * Returns the number of layers in the graph.
  * **@returns {number}** The number of layers.
* `countNodesInLayer(index)`
  * Counts the nodes in the layer.
  * **@param {number} index** - Index of layer.
  * **@returns {number}** The number of nodes.
  * **@throws {layerError}** Throws Error if layer is not exist.
* `hasNodeInLayer(ID, index)`
  * Searches for the given node in the given layer.
  * **@param {number} ID** - ID of node to search.
  * **@param {number} index** - Index of layer.
  * **@returns {boolean}** True if node exist. Otherwise, False.
  * **@throws {layerError}** Throws Error if layer is not exist.
* `getNodeFromLayer(cell, layerIndex)`
  * Gets the ID node in the position: cell in layer at index: layerIndex.
  * **@param {number} cell** - Cell index.
  * **@param {number} layerIndex** - Layer index.
  * **@returns {number}** The node ID.
  * **@throws {layerError}** Throws Error if layer is not exist or the node in the layer.
* `getParentNode(ID)`
  * Gets the parent node ID of the given node ID.
  * **@param {number} ID** - ID of child node.
  * **@returns {number}** ID of parent node. Return -1 if there is no such node ID in the graph.
* `getLayerIndexOfNodeID(ID)`
  * Gets the index of layer where node ID is exist.
  * **@param {number} ID** - ID of node to search.
  * **@returns {number}** The index of layer. Returns -1 if there is no such node ID in the graph or in the layer.
* `printLayers()`
  * Prints all the nodes inside the layers.
  * **@returns {string}**
* `getPath(t)`
  * Gets the shortest path from the root node to node t.
  * **@param {number} t** - ID of end node in path.
  * **@returns {Path}** The Path object. Returns an empty Path object if node with ID: t not exist in the graph.
* `clone()`
  * Deep copies a bfs graph object.
  * **@returns {bfsGraph}** Cloned bfs Graph.

### FlowGraph

Implementation of Flow Graph. There are tools for building a Flow Graph that will return a correct max flow from the Edmonds Krap algorithm.
DO NOT use it to represent a normal graph!

1. Extends from **Graph**.
2. **edgesList {LinkedList}** - An linked list of **FlowEdge**.  
3. **s {number}** - The source node with ID: 0.
4. **t {number}** - The sink node with ID: 1.

* `addNode(ID)`
  * Inserts a new node to the graph. But the ID can not be 0 OR 1.
  * **@param {number} ID** - ID of start node edge.
  * **@returns {boolean}** True, if node added successfully to the graph. Otherwise, returns false.
* `deleteNode(ID)`
  * Deletes given node ID from the graph except node ID: 0 and 1. Deletes also all the edges that related to this ID.
  * **@param {number} ID** - ID of node to delete.
  * **@returns {boolean}** True, if node deleted successfully from the graph. Otherwise, returns false.
* `addEdge(from, to, capacity = 1, flow = 0)`
  * Inserts new edge to the graph - When '1' in (from, to) represent an edge from startNodeID to endNodeID, and also create an object for the edge.
  * **@param {number} from** - ID of start Node of edge.
  * **@param {number} to** - ID of end Node of edge.
  * **@param {number} capacity** - The capacity of edge. Default value is 1.
  * **@param {number} flow** - The flow of edge. Default value is 0.
  * **@returns {boolean}** True, if edge added successfully to the graph. Otherwise, returns false.
* `getEdge(from, to)`
  * Returns an edge that has the same 'from' and 'to' nodes as were given.
  * **@param {number} from** - ID of start node edge.
  * **@param {number} to** - ID of end node edge.
  * **@returns {object}** Edge from the list. Return null if its not exist.
* `reset()`
  * Resets the flow of all edges in the graph.
* `getPath(from, to)`
  * Returns the shortest path from the 'from' node to 'to' node.
  * **@param {number} from** - ID of start node edge.
  * **@param {number} to** - ID of end node edge.
  * **@returns {Path}** Path object.
* `clone()`
  * Deep copies a FlowGraph object.
  * **@returns {FlowGraph}** Cloned FlowGraph.

### Path

Implementation of path. The path is used for saving nodes of the minimum path from BFS Graph and edges. **There a method in bfsGraph class for creating a path object from the graph**.

1. **nodes** - An array for the nodes.
2. **edges** - An array for the edges.

* `size()`
  * Gets the number of edged in the path.
  * **@returns {number}** The number of edged.
* `reverseNodes()`
  * Reverse the order of path.
* `toString()`
  * Prints the edges of the path.
  * **@returns {string}**

### Edge

Implementation of edge class for edges of Path objects.

* `constructor(from, to)`
  * **@param {number} from** - ID of start Node of edge.
  * **@param {number} to** - ID of end Node of edge.
* `equals(edge)`
  * Checks if two edges are equals.
  * **@param {Edge} edge**
  * **@returns {boolean}** true if this instance variables are equals to edge instance variables. Otherwise. returns false.
* `clone()`
  * clones an Edge object.
  * **@returns {Edge}** cloned Edge.
* `toString()`
  * Returns string with data of edge.
  * **@returns {string}**

### FlowEdge

Implementation of edge class for the Flow Graph class. Each edge includes data for it nodes, the flow and the capacity.

1. Extends from **Edge**.
2. **capacity {number}** - The capacity of the edge.
3. **flow {number}** - The flow of the edge. The maximum amount of flow is the capacity.

* `constructor(from, to, capacity, flow)`
  * **@param {number} from** - ID of start Node of edge.
  * **@param {number} to** - ID of end Node of edge.
  * **@param {number} capacity** - The capacity of edge.
  * **@param {number} flow** - The flow of edge.
* `increaseFlow(addedFlow)`
  * Increases the flow in the edge.
  * **@param {number} addedFlow** - The amount of flow to increase in the edge.
* `decreaseFlow(reducedFlow)`
  * Decreases the flow in the edge.
  * **@param {number} reducedFlow** - The amount of flow to reduce in the edge.
* `resetFlow()`
  * Reset the flow in the edge.
* `changeFlowTo(flow)`
  * Replaces the flow in the edge with new value.
  * **@param {number} flow** - The new value of flow.
* `changeCapacityTo(capacity)`
  * Replaces the capacity in the edge with new value.
  * **@param {number} capacity** - The new value of capacity.
* `isCapacityFull()`
  * Check if the capacity is full.
  * **@returns {boolean}** - True if capacity of the edge is full. Otherwise, return false.
* `isEmpty()`
  * checks if it empty (zero flow).
  * **@returns {boolean}** - True if it empty. Otherwise, return false.

### BackwardFlowEdge

Implementation of backward edge class for edmonds krap algorithm.

1. Extends from **FlowEdge**.
2. **forwardEdge** - null.

### ForwardFlowEdge

Implementation of forward edge class for edmonds krap algorithm.

1. Extends from **FlowEdge**.
2. **backwardEdge** - null.

### LinkedList

Implementation of linked list. Used for saving the edges of the Flow Graph.

1. **head** - null

* `size()`
  * Returns the number of nodes in the graph.
  * **@returns {number}** The number of nodes.
* `addData(obj)`
  * Creates new node with the obj and add it to linked list.
  * Returns from a given list, an edge that has the same given nodes.
  * **@param {object} obj** - The object to insert.
* `removeData(obj)`
  * Checks if there a node with this obj, and if does, remove it.
  * **@param {object} obj** - The object to be removed.
  * **@returns {boolean}** True, if node with given data removed from linked list. Otherwise, false.
* `has(obj)`
  * Checks if there a node with this obj in the linked list.
  * **@param {object} obj** - The object to be checked.
  * **@returns {boolean}** True if there a such node. Otherwise, False.
* `toString()`
  * Returns the data inside all the nodes.
  * **@returns {string}**

### Node

Implementation of node for the linked list.

* `constructor(obj)`
  * **@param {any} obj**

## Author

### Amir Liberzon

[LinkedIn Profile](https://www.linkedin.com/in/amir-liberzon-23aa3a159/)  
[Github Profile](https://github.com/amirlib/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/babudabu/gca/blob/master/LICENSE) file for details.
