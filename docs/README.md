# gca

Graph Classic Algorithms: Use classic algorithms like BFS and Edmonds Krap on graphs.

## Installation

```bash
npm i gca
```

## Usage

```js
const gca = require('gca');
const tool = new gca();

let graph = tool.CreateGraph();
let bfsGraph = tool.BFS(graph, s);
let flowGraph = tool.CreateFlowGraph();
let maxFlow = tool.EdmondsKarp(flowGraph);
```
## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## API

The full documentation can be found in each class.

### gca

- `CreateGraph()`
    * Creates an empty graph object from Graph class.
- `BFS(graph, s)`
    * BFS algorithm.
    * **@param {Graph} graph** - The given graph for BFS
    * **@param {number} s** - ID of root node.
    * **@returns {bfsGraph}** BFS graph object. Return -1 if there no such s node in the original graph.
- `CreateFlowGraph()`
    * Creates an empty flow-network graph object from FlowGraph class.
- `EdmondsKarp(flowGraph)`
    * Edmonds karp algorithm.
    * **@param {FlowGraph} graph** - The graph for Edmonds karp algorithm.
    *  **@returns {number}** The max flow. Return -1, if the graph is not instance of FlowGraph.

### Graph

1. **matrix** (2d array) - The graph represented in matrix array when: in the first row and the first column there the IDs of nodes. At cell (0, 0): 'M'.
2. '1' in the matrix in row i and column j represent an edge: (node in the first row at index i, node in the first column at index j).  
3. **nodesID** - An array of nodes ID.


- `size()`
    * Returns the number of nodes in the graph.
    * **@returns {number}** The number of nodes.
- `addNode(ID)`
    * Inserts a new node to the graph. The ID must be number.
    * **@param {number} ID** - ID of node to insert.
    * **@returns {boolean}** True, if node ID added successfully to the graph. Otherwise, returns false.
- `addEdge(from, to)`
    * Inserts new edge to the graph: when (from, to) represent an edge from startNodeID to endNodeID.
    * **@param {number} from** - ID of strat Node of edge.
    * **@param {number} to** - ID of end Node of edge.
    * **@returns {boolean}** True, if edge added successfully to the graph. Otherwise, returns false.
- `deleteNode(ID)`
    * Deletes given node ID from the graph, including all the edges that related to this ID.
    * **@param {number} ID** - ID of node to delete.
    * **@returns {boolean}** True, if the node was deleted successfully from the graph. Otherwise, returns false.
- `deleteEdge(from, to)`
    * Deletes edge from the graph.
    * **@param {number} from** - ID of strat Node of edge.
    * **@param {number} to** - ID of end Node of edge.
    * **@returns {boolean}** True, if edge deleted successfully from the graph. Otherwise, returns false.
- `indexOfNodeID(ID)`
    * Searches for an index of the node with id: ID, that will be represented in the matrix of the graph.
    * **@param {number} ID** - ID of node to search.
    * **@returns {number}** The index of the node that represents the same index in the matrix of the graph. Returns -1 if there is no such ID.
- `findEndNodesEdgesFromNode(ID)`
    * Finds edges that have the fromNode of the node with id: ID.
    * **@param {number} ID** - ID of node.
    * **@returns {number[]}** An array of IDs that are the toNodes of the edges. Returns empty array if there are no edges like that.
- `findStartNodesEdgesFromNode(ID)`
    * Finds edges that have the toNode of the node with id: ID.
    * **@param {number} ID** - ID of node.
    * **@returns {number[]}** An array of IDs that are the fromNodes of the edges. Returns empty array if there are no edges like that.
- `hasEdge(from, to)`
    * Checks if an edge: (from, to) exist in the graph.
    * **@param {number} from** - ID of strat Node of edge.
    * **@param {number} to** - ID of end Node of edge.
    * **@returns {boolean}** True if graph has such edge. Otherwise, False.
- `hasNode(ID)`
    * Checks if the given node exists in the graph.
    * **@param {number}** - ID The given node ID.
    * **@returns {boolean}** True if exist, otherwise False.
- `clone()`
    * New Graph object creates an exact copy of its own. Will clone bfsGraph and FlowGraph objects too, but only their nodesID and matrix arrays.Checks if the given node exists in the graph.
    * **@returns {Graph}** Copied Graph.
- `printNodesID()`
    * Returns the nodes that are in NodesID array.
    * **@returns {string}**
- `toString()`
    * Returns the matrix of the graph.
    * **@returns {string}**

### bfsGraph

Implementaion of BFS Graph. There are tools for building a Graph that it result of the BFS algorithm.

1. Extends from **Graph**.
2. **layer** - An array of nodes in each layer of the graph.
3. **layerCounter** - Counts number of layers.


- `countNodesInLayer(index)`
    * Counts the nodes in the layer.
    * **@param {number} index** - Index of layer.
    * **@returns {number}** The number of nodes.
    * **@throws {layerError}** Throws Error if layer is not exist.
- `hasNodeInLayer(ID, index)`
    * Searches for the given node in the given layer.
    * **@param {number} ID** - ID of node to search.
    * **@param {number} index** - Index of layer.
    * **@returns {boolean}** True if node exist. Otherwise, False.
    * **@throws {layerError}** Throws Error if layer is not exist.
- `getNodeIDFromLayer(cellLayer, indexLayer)`
    * Gets the ID node in the position: cellInLayer in layer at index: indexLayer.
    * **@param {number} cellLayer** - Index of the cell in layer.
    * **@param {number} indexLayer** - Index of layer.
    * **@returns {number}** The node ID.
    * **@throws {layerError}** Throws Error if layer is not exist or the node in the layer.
- `getParentNodeID(ID)`
    * Gets the parent node ID of the given node ID.
    * **@param {number} ID** - ID of child node.
    * **@returns {number}** ID of parent node. Return -1 if there is no such node ID in the graph.
- `getLayerIndexOfNodeID(ID)`
    * Gets the index of layer where node ID is exist.
    * **@param {number} ID** - ID of node to search.
    * **@returns {number}** The index of layer. Retrun -1 if there is no such node ID in the graph or in the layer.
- `printLayer()`
    * Prints all the nodes inside the layers.
    * **@returns {string}**
- `getPath(ID)`
    * Gets the shortest path from the root node to node t.
    * **@param {number} t** - ID of end node in path.
    * **@returns {Path}** The Path object. Returns -1 if node with ID: t not exist in the graph.

### Path

Implementaion of path. Path is used for saving nodes of the minimum path from BFS Graph and edges. **There a method in bfsGraph class for creating a path object from the graph**.

1. **nodes** - An array for the nodes.
2. **edges** - An array for the edges.


- `size()`
    * Gets the number of edged in the path.
    * **@returns {number}** The number of nodes.
- `toString()`
    * Prints the edges of the path.
    * **@returns {string}**

### Edge

Implementaion of edge class for edges of Path objects.

- `constructor(from, to)`
    * **@param {number} from** - ID of strat Node of edge.
    * **@param {number} to** - ID of end Node of edge.
- `toString()`
    * Returns sring with data of edge.
    * **@returns {string}**

### FlowEdge

Implementaion of edge class for the Flow Graph class. Each edge includes data for it nodes, the flow and the capacity.

1. Extends from **Edge**.
2. **capacity {number}** - The capacity of the edge.
3. **flow {number}** - The flow of the edge. The maximum amount of flow is the capacity.


- `constructor(from, to)`
    * **@param {number} from** - ID of strat Node of edge.
    * **@param {number} to** - ID of end Node of edge.
- `increaseFlow(addedFlow)`
    * Increases the flow in the edge.
    * **@param {number} addedFlow** - The amount of flow to increase in the edge.
- `decreaseFlow(reducedFlow)`
    * Decreases the flow in the edge.
    * **@param {number} reducedFlow** - The amount of flow to reduce in the edge.
- `resetFlow()`
    * Reset the flow in the edge.
- `changeFlowTo(flow)`
    * Replaces the flow in the edge with new value.
    * **@param {number} flow** - The new value of flow.
- `isCapacityFull()`
    * Check if the capacity is full.
    * **@returns {boolean}** True if capacity of the edge is full. Otherwise, return false.
- `toString()`
    * Returns string with the data of edge.
    * **@returns {string}**

### BackwardFlowEdge

Implementaion of backward edge class for the Flow Graph class.

1. Extends from **FlowEdge**.


- `constructor(from, to)`
    * **@param {number} from** - ID of strat Node of edge.
    * **@param {number} to** - ID of end Node of edge.

### ForwardFlowEdge

Implementaion of forward edge class for the Flow Graph class.

1. Extends from **FlowEdge**.


- `constructor(from, to)`
    * **@param {number} from** - ID of strat Node of edge.
    * **@param {number} to** - ID of end Node of edge.

### FlowGraph

Implementaion of Flow Graph. There are tools for building a Flow Graph that will return a correct max flow from Edmonds Krap alogritem.
DONOT use it to reperesent normal graph!

1. Extends from **Graph**.
2. **forwardEdgesList {LinkedList}** - An linkedlist of **ForwardFlowEdge**.  
3. **backwardEdgesList {LinkedList}** - An linkedlist of **BackwardFlowEdge**.
4. **s {number}** - The source node with ID: 0.
5. **t {number}** - The sink node with ID: 1.


- `findEdgeInList(from, to, list)`
    * Returns from a given list, an edge that has the same given nodes.
    * **@param {number} from** - ID of start node edge.
    * **@param {number} to** - ID of end node edge.
    * **@param {LinkedList} list** - The list.
    * **@returns {FlowEdge}** Edge from the list.

### LinkedList

Implementaion of linked list. Used for saveing the edges of the Flow Graph.

1. **head** - null


- `addData(obj)`
    * Creates new node with the obj and add it to linked list.
    * Returns from a given list, an edge that has the same given nodes.
    * **@param {object} obj** - The object to insert.
- `removeData(obj)`
    * Checks if there a node with this obj, and if does, remove it.
    * **@param {object} obj** - The object to be removed.
    * **@returns {boolean}** True, if node with given data removed from linkedlist. Otherwise, false.
- `has(obj)`
    * Checks if there a node with this obj in the linked list.
    * **@param {object} obj** - The object to be checked.
    * **@returns {boolean}** True if there a such node. Otherwise, False.
- `toString()`
    * Returns the data inside all the nodes.
    * **@returns {string}**

### Node

Implementaion of node for the linkedlist.

- `constructor(obj)`
    * **@param {object} obj**


## Author

### Amir Liberzon

[LinkedIn Profile](https://www.linkedin.com/in/amir-liberzon-23aa3a159/)  
[Github Profile](https://github.com/amirlib/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/babudabu/gca/blob/master/LICENSE) file for details.
