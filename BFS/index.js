const bfsGraph = require("./BFS-Graph");
const Discovers = require("./Discover");

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
    const discovers = new Discovers(graph.nodesID, indexStart);

    bfsG.addLayer();
    bfsG.addNodeToLayer(s, 0);

    let numberOfNodesInLayer = bfsG.countNodesInLayer(bfsG.layersNumber() - 1);

    while (numberOfNodesInLayer > 0) {
      bfsG.addLayer();

      for (let i = 0; i < numberOfNodesInLayer; i++) {
        const NodeIDFromLayer = bfsG.getNodeIDFromLayer(i, bfsG.layersNumber() - 2);

        if (bfsG.indexOfNodeID(NodeIDFromLayer) == -1) {
          bfsG.addNode(NodeIDFromLayer);
        }

        const endNodesEdges = graph.findEndNodesEdgesFromNode(NodeIDFromLayer);

        if (endNodesEdges.length != 0) {
          for (let j = 0; j < endNodesEdges.length; j++) {
            const nodeIndex = discovers.indexOfNodeID(endNodesEdges[j]);

            if (discovers.hasDiscover(nodeIndex) == false) {
              if (bfsG.indexOfNodeID(endNodesEdges[j]) == -1) {
                bfsG.addNode(endNodesEdges[j]);
              }

              bfsG.addEdge(NodeIDFromLayer, endNodesEdges[j]);
              discovers.markNode(nodeIndex);
              bfsG.addNodeToLayer(endNodesEdges[j], bfsG.layersNumber() - 1);
            }
          }
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
