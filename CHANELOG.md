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
      FlowEdge object can be cloned (deep copy).
  * ForwardFlowEdge:
      ForwardFlowEdge object can be cloned (deep copy).
  * BackwardFlowEdge:
      BackwardFlowEdge object can be cloned (deep copy).

- `Enhancement`
  * Graph:
      Clone method will deep copy the Graph object.
  * FlowGraph:
      Clone method will deep copy the FlowGraph object.
  * EdmondsKrap:
      1. Edmonds Krap algorithm will work with cloned FlowGraph.
      2. updateFlowGraph Method will update the cloned FlowGraph.
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