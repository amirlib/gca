const bfsGraph = require('./BFS-Graph/bfsGraph');
const Discovers = require('./BFS-Graph/Discovers');

/**
 * BFS algorithm.
 * @param {Graph} graph The given graph for BFS
 * @param {number} s ID of root node.
 * @returns BFS graph. Return -1 if there no such s node in the original graph.
 */
function BFS(graph, s) {
    let indexStart = graph.searchIndexOfNodeID(s) - 1;
    if (indexStart == -2) {
        return -1;
    }
    try {
        let bfsG = new bfsGraph();
        let discovers = new Discovers(graph.nodesID);
        discovers.init(indexStart, graph.getNodesSize());
        let layerCounter = bfsG.getLayerCounter();
        bfsG.addNewLayer(layerCounter);
        bfsG.addNewNodeToLayer(0, s);
        let numberOfNodesInLayer = bfsG.countNodesInLayer(layerCounter);
        while (numberOfNodesInLayer > 0) {
            bfsG.addNewLayer(layerCounter + 1);
            for (let i = 0; i < numberOfNodesInLayer; i++) {
                let NodeIDFromLayer = bfsG.getNodeIDFromLayer(layerCounter, i);
                if (bfsG.searchIndexOfNodeID(NodeIDFromLayer) == -1) {
                    bfsG.insertNode(NodeIDFromLayer);
                }
                let edges = graph.findEdgesFromNode(NodeIDFromLayer);
                if (edges.length != 0) {
                    for (let j = 0; j < edges.length; j++) {
                        let nodeIndex = discovers.searchIndexOfNodeID(edges[j]);
                        if (discovers.checkDiscover(nodeIndex) == false) {
                            if (bfsG.searchIndexOfNodeID(edges[j]) == -1) {
                                bfsG.insertNode(edges[j]);
                            }
                            bfsG.insertEdge(NodeIDFromLayer, edges[j]);
                            discovers.setDiscover(nodeIndex);
                            bfsG.addNewNodeToLayer(layerCounter + 1, edges[j]);
                        }
                    }
                }
            }
            bfsG.advanceLayerCounter();
            layerCounter = bfsG.getLayerCounter();
            numberOfNodesInLayer = bfsG.countNodesInLayer(layerCounter);
        }
        bfsG.layer.pop();
        return bfsG;
    } catch (error) {
        console.log(`${error.message}`);
        return -1;
    }
}

module.exports = BFS;
