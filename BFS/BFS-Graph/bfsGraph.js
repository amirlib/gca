const Graph = require('../../Graph/Graph');
const Path = require('../Path/Path');
const layerError = require('./layerError');
/**
 * Implementaion of BFS Graph. There are tools for building a Graph that it result of the BFS algorithm.
 *
 * @class bfsGraph
 * @extends {Graph}
 */
class bfsGraph extends Graph {
    constructor() {
        super();
        this.layerCounter = 0;
        this.layer = [];
    }
    /**
     * Gets the layer Counter.
     *
     * @returns The counter.
     * @memberof bfsGraph
     */
    getLayerCounter() {
        return this.layerCounter;
    }
    /**
     * Increases the layer Counter by one.
     *
     * @memberof bfsGraph
     */
    advanceLayerCounter() {
        this.layerCounter++;
    }
    /**
     * Counts the nodes in the layer.
     * @param {number} index Index of layer.
     * @returns {number} The number of nodes.
     * @memberof bfsGraph
     */
    countNodesInLayer(index) {
        if (index >= this.layer.length) {
            throw new layerError(`There is no such layer number: ${index}.`);
        }
        return this.layer[index].length;
    }
    /**
     * Adds new layer.
     * @param {number} index Index of layer.
     * @memberof bfsGraph
     */
    addNewLayer(index) {
        if (index < this.layer.length) {
            throw new layerError(`Layer number: ${index} already Exist.`);
        }
        if (index > this.layer.length) {
            throw new layerError(`There missing some layers before layer number: ${index}.`);
        }
        this.layer[index] = [];
    }
    /**
     * Inserts node to layer.
     * @param {number} index Index of layer.
     * @param {number} ID ID of node to insert.
     * @memberof bfsGraph
     */
    addNewNodeToLayer(index, ID) {
        if (index >= this.layer.length) {
            throw new layerError(`There is no such layer number: ${index}.`);
        }
        if (this.searchNodeInLayer(index, ID) == true) {
            throw new layerError(`You are trying to insert node ID: ${ID} that already exist in layer number: ${index}.`);
        }
        this.layer[index].push(ID);
    }
    /**
     * searchs given node in given layer.
     * @param {number} index Index of layer.
     * @param {number} ID ID of node to search.
     * @returns True if node exist. Otherwise, False.
     * @memberof bfsGraph
     */
    searchNodeInLayer(index, ID) {
        if (index >= this.layer.length) {
            throw new layerError(`There is no such layer number: ${index}.`);
        }
        let length = this.countNodesInLayer(index);
        for (let i = 0; i < length; i++) {
            if (this.getNodeIDFromLayer(index, i) == ID) {
                return true;
            }
        }
        return false;
    }
    /**
     * Gets the ID node in the position: cellInLayer in layer at index: indexLayer.
     * @param {number} indexLayer Index of layer.
     * @param {number} cellInLayer Index of the cell in layer.
     * @returns {number} The node ID.
     * @memberof bfsGraph
     */
    getNodeIDFromLayer(indexLayer, cellInLayer) {
        if (indexLayer >= this.layer.length) {
            throw new layerError(`There is no such layer number: ${indexLayer}.`);
        }
        if (cellInLayer >= this.layer[indexLayer].length) {
            throw new layerError(`There is no node in cell: ${cellInLayer} at layer number: ${indexLayer}.`);
        }
        return this.layer[indexLayer][cellInLayer];
    }
    /**
     * Gets the parent node ID of given node ID.
     * @param {number} ID ID of child node.
     * @returns {number} ID of parent node. Return -1 if there is no such node ID in the graph.
     * @memberof bfsGraph
     */
    getNodeIDParent(ID) {
        let nodeIndex = this.searchIndexOfNodeID(ID);
        if (nodeIndex == -1) {
            return -1;
        }
        let length = this.getNodesSize();
        for (let i = 1; i < length; i++) {
            if (this.matrix[i][nodeIndex] == 1) {
                return this.matrix[i][0];
            }
        }
    }
    /**
     * Gets the index of layer where node ID is.
     * @param {number} ID ID of node to search.
     * @returns The index of layer. Retrun -1 if there is no such node ID in the graph or in the layer.
     * @memberof bfsGraph
     */
    getLayerIndexOfIDNode(ID) {
        if (this.searchIndexOfNodeID(ID) == -1) {
            return -1;
        }
        for (let i = 0; i < this.getLayerCounter(); i++) {
            if (this.searchNodeInLayer(i, ID)) {
                return i;
            }
        }
        return -1;
    }
    /**
     * Gets the shortest path from the root node to node t. Search path from the last node of the path to the first.
     * @param {number} t ID of end node in path.
     * @returns The Path object. Throw Error if node t is not exist in the graph.
     * @memberof bfsGraph
     */
    getPath(t) {
        if (this.searchIndexOfNodeID(t) == -1) {
            throw new Error(`Can not search fot path. Node ID: ${t}, not exist in the graph.`);
        }
        let path = new Path();
        let childNode = t;
        let length = this.getLayerIndexOfIDNode(t);
        path.addNodeToPath(t);
        for (let i = 1; i <= length; i++) {
            let parentNode = this.getNodeIDParent(childNode);
            path.addNodeToPath(parentNode);
            childNode = parentNode;
        }
        path.reverseNodes();
        path.createEdgesFromNodes();
        return path;
    }
    /**
     * Prints all the nodes inside all the layers.
     *
     * @memberof bfsGraph
     */
    printLayer() {
        let print = "";
        console.log(`----Layers----`);
        for (let i = 0; i < this.getLayerCounter(); i++) {
            for (let j = 0; j < this.countNodesInLayer(i); j++) {
                print = print + "     " + this.getNodeIDFromLayer(i, j);
            }
            console.log(`${print}`);
            print = "";
        }
    }
}

module.exports = bfsGraph;
