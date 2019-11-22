const Graph = require("../../Graph");
const Path = require("../../Path");
const layerError = require("./layerError");
/**
 * Implementation of BFS Graph. There are tools for building a Graph that it result of the BFS algorithm.
 *
 * @class bfsGraph
 * @extends {Graph}
 */
class bfsGraph extends Graph {
  constructor() {
    super();

    this.layers = [];
  }
  /**
   * Returns the number of layers in the graph.
   * @returns {number} The number of layers.
   * @memberof bfsGraph
   */
  layersNumber() {
    return this.layers.length;
  }
  /**
   * Counts the nodes in the layer.
   * @param {number} index Index of layer.
   * @returns {number} The number of nodes.
   * @throws {layerError} Throws Error if layer is not exist.
   * @memberof bfsGraph
   */
  countNodesInLayer(index) {
    if (index >= this.layersNumber()) {
      throw new layerError(`There is no such layer number: ${index}.`);
    }

    return this.layers[index].length;
  }
  /**
   * Adds new layer.
   * @memberof bfsGraph
   */
  addLayer() {
    this.layers.push([]);
  }
  /**
   * Inserts node to layer.
   * @param {number} ID ID of node to insert.
   * @param {number} index Index of layer.
   * @throws {layerError} Throws Error if layer is not exist or the node is already exist in the layer.
   * @memberof bfsGraph
   */
  addNodeToLayer(ID, index) {
    if (index >= this.layersNumber()) {
      throw new layerError(`There is no such layer number: ${index}.`);
    }

    if (this.hasNodeInLayer(ID, index) == true) {
      throw new layerError(
        `You are trying to insert node ID: ${ID} that already exist in layer number: ${index}.`
      );
    }

    this.layers[index].push(ID);
  }
  /**
   * Searches for the given node in the given layer.
   * @param {number} ID ID of node to search.
   * @param {number} index Index of layer.
   * @returns {boolean} True if node exist. Otherwise, False.
   * @throws {layerError} Throws Error if layer is not exist.
   * @memberof bfsGraph
   */
  hasNodeInLayer(ID, index) {
    if (index >= this.layersNumber()) {
      throw new layerError(`There is no such layer number: ${index}.`);
    }

    const length = this.countNodesInLayer(index);

    for (let i = 0; i < length; i++) {
      if (this.getNodeFromLayer(i, index) == ID) {
        return true;
      }
    }

    return false;
  }
  /**
   * Gets the ID node in the position: cell in layer at index: layerIndex.
   * @param {number} cell Cell index.
   * @param {number} layerIndex Layer index.
   * @returns {number} The node ID.
   * @throws {layerError} Throws Error if layer is not exist or the node in the layer.
   * @memberof bfsGraph
   */
  getNodeFromLayer(cell, layerIndex) {
    if (layerIndex >= this.layersNumber()) {
      throw new layerError(`There is no such layer number: ${layerIndex}.`);
    }

    if (cell >= this.layers[layerIndex].length) {
      throw new layerError(
        `There is no node in cell: ${cell} at layer number: ${layerIndex}.`
      );
    }

    return this.layers[layerIndex][cell];
  }
  /**
   * Gets the parent node ID of the given node ID.
   * @param {number} ID ID of child node.
   * @returns {number} ID of parent node. Return -1 if there is no such node ID in the graph.
   * @memberof bfsGraph
   */
  getParentNodeID(ID) {
    const nodeIndex = this.indexOfNodeID(ID);

    if (nodeIndex == -1) return -1;

    for (let i = 0; i < this.size(); i++) {
      if (this.matrix[i][nodeIndex] == 1) {
        return this.nodesID[i];
      }
    }
    
    return -1;
  }
  /**
   * Gets the index of layer where node ID is exist.
   * @param {number} ID ID of node to search.
   * @returns {number} The index of layer. Returns -1 if there is no such node ID in the graph or in the layer.
   * @memberof bfsGraph
   */
  getLayerIndexOfNodeID(ID) {
    if (this.indexOfNodeID(ID) == -1) return -1;

    for (let i = 0; i < this.layersNumber(); i++) {
      if (this.hasNodeInLayer(ID, i)) {
        return i;
      }
    }

    return -1;
  }
  /**
   * Gets the shortest path from the root node to node t.
   * @param {number} t ID of end node in path.
   * @returns {Path} Path object.
   * @memberof bfsGraph
   */
  getPath(t) {
    const path = new Path();

    if (!this.hasNode(t)) return path;

    const length = this.getLayerIndexOfNodeID(t);
    let childNode = t;
  
    path.addNode(t);

    for (let i = 0; i < length; i++) {
      const parentNode = this.getParentNodeID(childNode);

      path.addNode(parentNode);
      childNode = parentNode;
    }

    path.reverseNodes();
    path.createEdgesFromNodes();
    
    return path;
  }
  /**
   * Deep copies a bfs graph object.
   * @returns {bfsGraph} Cloned bfs Graph.
   * @memberof bfsGraph
   */
  clone() {
    let graph = new bfsGraph();

    for (let i = 0; i < this.size(); i++) {
      graph.matrix[i] = Array.from(this.matrix[i]);
    }

    graph.nodesID = Array.from(this.nodesID);

    for (let i = 0; i < this.layersNumber(); i++) {
      graph.layer[i] = Array.from(this.layer[i]);
    }

    return graph;
  }
  /**
   * Prints all the nodes inside the layers.
   * @returns {string} string
   * @memberof bfsGraph
   */
  printLayers() {
    const space = `   `
    let print = ``;

    for (let i = 0; i < this.layersNumber(); i++) {
      print = `${print}layer ${i}:`

      for (let j = 0; j < this.countNodesInLayer(i); j++) {
        print = `${print}${space}${this.getNodeFromLayer(j, i)}`;
      }

      if (i != this.layersNumber() - 1) {
        print = `${print}\n`;
      }
    }
    
    return print;
  }
}

module.exports = bfsGraph;
