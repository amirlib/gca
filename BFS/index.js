const bfsGraph = require("./BFS-Graph");

/**
 * BFS algorithm.
 * @param {Graph} graph The given graph for BFS
 * @param {number} s ID of root node.
 * @returns {bfsGraph} BFS graph. Return -1 if there no such s node in the original graph.
 */
function BFS(graph, s) {
  if (!graph.hasNode(s)) return -1;

  const bfsG = new bfsGraph();
  const explored = new Set();

  bfsG.addLayer();
  bfsG.addNodeToLayer(s, 0);

  let numberOfNodesInLayer = bfsG.countNodesInLayer(bfsG.layersNumber() - 1);

  while (numberOfNodesInLayer > 0) {
    bfsG.addLayer();

    const parents = bfsG.getNodesFromLayer(bfsG.layersNumber() - 2);
    const parentsIterator = parents.values();

    for (const parent of parentsIterator) {
      if (!bfsG.hasNode(parent)) bfsG.addNode(parent);

      const children = graph.getNodesOfEdgesStartingNode(parent);
      const childrenExplored = children.filter(node => !explored.has(node));
      const childrenExploredIterator = childrenExplored.values();

      for (const child of childrenExploredIterator) {
        if (!bfsG.hasNode(child)) bfsG.addNode(child);

        bfsG.addEdge(parent, child);
        bfsG.addNodeToLayer(child, bfsG.layersNumber() - 1);
        explored.add(child);
      }
    }

    numberOfNodesInLayer = bfsG.countNodesInLayer(bfsG.layersNumber() - 1);
  }

  bfsG.layers.pop();
  return bfsG;
}

module.exports = BFS;
