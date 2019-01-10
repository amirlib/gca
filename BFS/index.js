const bfsGraph = require('./BFS-Graph/bfsGraph');
const Discovers = require('./BFS-Graph/Discovers');

/**
 * BFS algorithm.
 * @param {Graph} graph The given graph for BFS
 * @param {number} s ID of root node.
 * @returns {bfsGraph} BFS graph. Return -1 if there no such s node in the original graph.
 */
function BFS(graph, s) {
    let indexStart = graph.indexOfNodeID(s) - 1;
    if (indexStart != -2) {
        try {
            let bfsG = new bfsGraph();
            let discovers = new Discovers(graph.nodesID, indexStart);
            bfsG.addLayer(bfsG.layerCounter);
            bfsG.addNodeToLayer(s, 0);
            let numberOfNodesInLayer = bfsG.countNodesInLayer(bfsG.layerCounter);
            while (numberOfNodesInLayer > 0) {
                bfsG.addLayer(bfsG.layerCounter + 1);
                for (let i = 0; i < numberOfNodesInLayer; i++) {
                    let NodeIDFromLayer = bfsG.getNodeIDFromLayer(i, bfsG.layerCounter);
                    if (bfsG.indexOfNodeID(NodeIDFromLayer) == -1) {
                        bfsG.addNode(NodeIDFromLayer);
                    }
                    let endNodesEdges = graph.findEndNodesEdgesFromNode(NodeIDFromLayer);
                    if (endNodesEdges.length != 0) {
                        for (let j = 0; j < endNodesEdges.length; j++) {
                            let nodeIndex = discovers.indexOfNodeID(endNodesEdges[j]);
                            if (discovers.hasDiscover(nodeIndex) == false) {
                                if (bfsG.indexOfNodeID(endNodesEdges[j]) == -1) {
                                    bfsG.addNode(endNodesEdges[j]);
                                }
                                bfsG.addEdge(NodeIDFromLayer, endNodesEdges[j]);
                                discovers.markNode(nodeIndex);
                                bfsG.addNodeToLayer(endNodesEdges[j], bfsG.layerCounter + 1);
                            }
                        }
                    }
                }
                bfsG.advanceLayerCounter();
                numberOfNodesInLayer = bfsG.countNodesInLayer(bfsG.layerCounter);
            }
            bfsG.layer.pop();
            return bfsG;
        } catch (error) {
            console.log(`${error.message}`);
        }
    }
    return -1;
}

module.exports = BFS;
