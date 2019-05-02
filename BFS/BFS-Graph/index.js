const Graph = require("../../Graph");
const Path = require("../../Path");
const layerError = require("./layerError");
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
   * Increases the layer counter by one.
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
   * @throws {layerError} Throws Error if layer is not exist.
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
   * @throws {layerError} Throws Error if layer is already exist or the graph miss some layers before the given one.
   * @memberof bfsGraph
   */
  addLayer(index) {
    if (index < this.layer.length) {
      throw new layerError(`Layer number: ${index} already Exist.`);
    }
    if (index > this.layer.length) {
      throw new layerError(
        `Some layers before layer number: ${index}, not exists.`
      );
    }
    this.layer[index] = [];
  }
  /**
   * Inserts node to layer.
   * @param {number} ID ID of node to insert.
   * @param {number} index Index of layer.
   * @throws {layerError} Throws Error if layer is not exist or the node is already exist in the layer.
   * @memberof bfsGraph
   */
  addNodeToLayer(ID, index) {
    if (index >= this.layer.length) {
      throw new layerError(`There is no such layer number: ${index}.`);
    }
    if (this.hasNodeInLayer(ID, index) == true) {
      throw new layerError(
        `You are trying to insert node ID: ${ID} that already exist in layer number: ${index}.`
      );
    }
    this.layer[index].push(ID);
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
    if (index >= this.layer.length) {
      throw new layerError(`There is no such layer number: ${index}.`);
    }
    let length = this.countNodesInLayer(index);
    for (let i = 0; i < length; i++) {
      if (this.getNodeIDFromLayer(i, index) == ID) {
        return true;
      }
    }
    return false;
  }
  /**
   * Gets the ID node in the position: cellInLayer in layer at index: indexLayer.
   * @param {number} cellLayer Index of the cell in layer.
   * @param {number} indexLayer Index of layer.
   * @returns {number} The node ID.
   * @throws {layerError} Throws Error if layer is not exist or the node in the layer.
   * @memberof bfsGraph
   */
  getNodeIDFromLayer(cellLayer, indexLayer) {
    if (indexLayer >= this.layer.length) {
      throw new layerError(`There is no such layer number: ${indexLayer}.`);
    }
    if (cellLayer >= this.layer[indexLayer].length) {
      throw new layerError(
        `There is no node in cell: ${cellLayer} at layer number: ${indexLayer}.`
      );
    }
    return this.layer[indexLayer][cellLayer];
  }
  /**
   * Gets the parent node ID of the given node ID.
   * @param {number} ID ID of child node.
   * @returns {number} ID of parent node. Return -1 if there is no such node ID in the graph.
   * @memberof bfsGraph
   */
  getParentNodeID(ID) {
    let nodeIndex = this.indexOfNodeID(ID);
    if (nodeIndex != -1) {
      for (let i = 1; i < this.size(); i++) {
        if (this.matrix[i][nodeIndex] == 1) {
          return this.matrix[i][0];
        }
      }
    }
    return -1;
  }
  /**
   * Gets the index of layer where node ID is exist.
   * @param {number} ID ID of node to search.
   * @returns {number} The index of layer. Retrun -1 if there is no such node ID in the graph or in the layer.
   * @memberof bfsGraph
   */
  getLayerIndexOfNodeID(ID) {
    if (this.indexOfNodeID(ID) != -1) {
      for (let i = 0; i < this.layerCounter; i++) {
        if (this.hasNodeInLayer(ID, i)) {
          return i;
        }
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
    let path = new Path();
    if (this.hasNode(t) == true) {
      let childNode = t;
      let length = this.getLayerIndexOfNodeID(t);
      path.addNode(t);
      for (let i = 1; i <= length; i++) {
        let parentNode = this.getParentNodeID(childNode);
        path.addNode(parentNode);
        childNode = parentNode;
      }
      path.reverseNodes();
      path.createEdgesFromNodes();
    }
    return path;
  }
  /**
   * bfsGraph object cannot be cloned.
   * @returns {boolean} False
   * @memberof bfsGraph
   */
  clone() {
    return null;
  }
  /**
   * Prints all the nodes inside the layers.
   * @returns {string} string
   * @memberof bfsGraph
   */
  printLayer() {
    let print = ``;
    for (let i = 0; i < this.layerCounter; i++) {
      for (let j = 0; j < this.countNodesInLayer(i); j++) {
        print = `${print}${this.getNodeIDFromLayer(j, i)}   `;
      }
      if (i != this.layerCounter - 1) {
        print = `${print}\n`;
      }
    }
    return print;
  }
}

module.exports = bfsGraph;
