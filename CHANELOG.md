## 2.2.0

* Fix spelling errors.  
* `Graph:`
  * From now on, the matrix property of the graph does not store the IDs of the nodes, but only whether there edges in (i, j) where i and j are the indexes in nodesID array that represents the correct IDs of the edge.  
* `BFS-Graph`
  * Improve the documentation of the class.  
  * Improve the readability of the code.  

## 2.1.2

* Edit CHANGELOG.md and README.md files.  
* Fix spelling errors.  
* `Graph:`  
  * Add new method to the graph class: isEmpty().  
  * Improve the documentation of the class.  
  * Improve the readability of the code.  

## 2.1.0

* `Enhancement`
  * ForwardFlowEdge:
      Now, it can hold his backward edge (BackwardFlowEdge object). This backward edge cannot be assigned in the constructor.
  * BackwardFlowEdge:
      Now, it can hold his forward edge (ForwardFlowEdge object). This forward edge cannot be assigned in the constructor.
  * EdmondsKrap:
      It now works more efficient.
  * FlowGraph:
      With getPath() method, you can get the shortest path in the graph.
  * bfsGraph:
      If getPath() method do not find a path, it will return an empty Path object.

## 2.0.1

* `Bug Fix`
  * FlowGraph:
      You could not initiate a new edge with flow.

## 2.0.0

* `Bug Fix`
  * FlowEdge:
      The decreaseFlow() method actually increased the flow.

* `New Feature`
  * LinkedList:
      1. New method: size().
      2. LinkedList object can be cloned (deep copy) with clone() method. It will use the data object's clone method.
  * Edge:
      1. Edge object can be cloned (deep copy) with clone() method.
      2. Edge object can check if it instance variables are equals to other Edge object with equals() method.
  * FlowEdge:
      1. FlowEdge object can be cloned (deep copy) with clone() method.
      2. FlowEdge object can check if it instance variables: from and to, are equals to other FlowEdge object with equals() method.
      3. FlowEdge can be declared with flow and capacity as you wish.
      4. FlowEdge can check if it is empty (zero flow) with isEmpty() method.
      5. FlowEdge can change it capacity with changeCapacityTo() method.
  * FlowGraph:
      reset() method will reset the flow for all the edges of the graph.  

* `Enhancement`
  * LinkedList:
      has() method will use the data object's equals method.
  * Graph:
      clone() method will deep copy the Graph object.
  * bfsGraph:
      1. clone() method returned false. Changed to null.
      2. getPath() method returned false. Changed to null.
  * FlowGraph:
      1. FlowGraph now has only one list of edges (FlowEdge objects).
      2. findEdgeInList() method would not receive 'list' argument any more. The name of this method was changed to getEdge().
      3. Now, you can add edges with a positive number of capacity and flow values to the graph.
  * EdmondsKrap:
      Re-write EdmondsKrap algorithm.
  * New files arrangement:  

```js
      before:  
        gca  
        ├── README.md  
        ├── example.js  
        ├── package.json  
        ├── index.js  
        ├── BFS  
        │   ├── BFS-Graph  
        |   |   ├── Discovers.js  
        |   |   ├── bfsGraph.js  
        |   |   ├── discoverError.js  
        |   |   └── layerError.js  
        │   ├── Path  
        |   |   ├── Edge.js  
        |   |   └── Path.js  
        │   └── index.js  
        ├── EdmondsKrap  
        │   ├── EKTools.js  
        │   └── index.js  
        ├── Flow-Graph  
        │   ├── LinkedList  
        |   |   ├── LinkedList.js  
        |   |   └── Node.js  
        |   ├── BackwardFlowEdge.js  
        |   ├── FlowEdge.js  
        |   ├── FlowGraph.js  
        |   └── ForwardFlowEdge.js  
        └── Graph  
            └── Graph.js  
      Now:  
        gca  
        ├── README.md  
        ├── example.js  
        ├── package.json  
        ├── index.js  
        ├── BFS  
        │   ├── BFS-Graph  
        |   |   ├── index.js  
        |   |   └── layerError.js  
        │   ├── Discover  
        |   |   ├── index.js  
        |   |   └── discoverError.js  
        │   └── index.js  
        ├── Edges  
        |   ├── BackwardFlowEdge.js  
        |   ├── Edge.js  
        |   ├── FlowEdge.js  
        |   └── ForwardFlowEdge.js  
        ├── EdmondsKrap  
        │   ├── EKTools.js  
        │   └── index.js  
        ├── Flow-Graph  
        │   ├── Residual-Graph  
        |   |   └── index.js  
        |   └── index.js  
        ├── Graph  
        |   └── index.js  
        ├── LinkedList  
        |   ├── index.js  
        |   └── Node.js  
        └── Path  
            └── index.js  
```
