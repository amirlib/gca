const bfsGraph = require("./BFS-Graph");

/**
 * BFS algorithm.
 * @param {Graph} graph The given graph for BFS
 * @param {number} s ID of root node.
 * @returns {bfsGraph} BFS graph. Return -1 if there no such s node in the original graph.
 */
function BFS(graph, s) {
  const indexStart = graph.indexOfNodeID(s);

  if (indexStart == -1) return -1;

  try {
    const bfsG = new bfsGraph();
    const explored = new Set();

    bfsG.addLayer();
    bfsG.addNodeToLayer(s, 0);

    let numberOfNodesInLayer = bfsG.countNodesInLayer(bfsG.layersNumber() - 1);

    while (numberOfNodesInLayer > 0) {
      bfsG.addLayer();

      for (let i = 0; i < numberOfNodesInLayer; i++) {
        const parent = bfsG.getNodeFromLayer(i, bfsG.layersNumber() - 2);

        if (!bfsG.hasNode(parent)) bfsG.addNode(parent);

        const childeNodes = graph.findEndNodesEdgesFromNode(parent);
        const childeNodesNotExplored = childeNodes.filter(node => !explored.has(node));

        if (childeNodesNotExplored.length == 0) continue;

        const iterator = childeNodesNotExplored.values();

        for (const child of iterator) {
          if (!bfsG.hasNode(child)) bfsG.addNode(child);

          bfsG.addEdge(parent, child);
          explored.add(child);
          bfsG.addNodeToLayer(child, bfsG.layersNumber() - 1);
        }
      }

      numberOfNodesInLayer = bfsG.countNodesInLayer(bfsG.layersNumber() - 1);
    }

    bfsG.layers.pop();
    return bfsG;
  } catch (error) {
    console.log(`${error.message}`);
    return -1;
  }
}

module.exports = BFS;
