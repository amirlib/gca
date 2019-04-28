# 2.0.0

- `Bug Fix`
  * FlowEdge:
      The decreaseFlow method actually increased the flow.
  * bfsGraph:
      Clone method returned false. Changed to null.

- `New Feature`
  * LinkedList:
      New method: size().
  * Edge:
      Edge object can be cloned (deep copy).
  * FlowEdge:
      1. FlowEdge object can be cloned (deep copy).
      2. FlowEdge can be declared with flow and capacity as you wish.
  * ForwardFlowEdge:
      ForwardFlowEdge object can be cloned (deep copy).
  * BackwardFlowEdge:
      BackwardFlowEdge object can be cloned (deep copy).

- `Enhancement`
  * Graph:
      Clone method will deep copy the Graph object.
  * FlowGraph:
      1. Clone method will deep copy the FlowGraph object.
      2. FlowGraph now has only one list of edges (FlowEdge objects).
      3. findEdgeInList method would not recive 'list' arument any more.
      4. Now, you can add edges with capacity and flow to the graph.
  * EdmondsKrap:
      1. Edmonds Krap algorithm works with cloned FlowGraph only.
      2. updateFlowGraph Method updates cloned FlowGraph only.
      3. The original graph's edges will not recieve flow (for now).
  * New files arrangement -
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
        |   └── index.js
        ├── Graph
        |   └── index.js
        ├── LinkedList
        |   ├── index.js
        |   └── Node.js
        └── Path
            └── index.js