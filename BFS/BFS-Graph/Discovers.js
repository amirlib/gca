const discoverError = require('./discoverError');
/**
 * Implementaion of Discovers nodes array. Each node from the original graph is exist in this array.
 * All node are initial to False. Set True to node, if the BFS algorithm met the node.
 * The BFS algorithm use this class for creating the BFS graph.
 *
 * @class Discovers
 */
class Discovers {
    /**
     * Creates an instance of Discovers.
     * @param {number[]} nodesID Array of nodes ID.
     * @param {number} indexS The index of the root BFS graph node.
     * @memberof Discovers
     */
    constructor(nodesID, indexS) {
        this.matrix = [2];
        this.matrix[0] = nodesID;
        this.matrix[1] = [nodesID.length];
        this.init(indexS);
    }
    /**
     * Initiate the matrix: Insert False to evrey cell except the root node.
     * @param {number} indexS The index of the root BFS graph node.
     * @memberof Discovers
     */
    init(indexS) {
        for (let i = 0; i < this.matrix[0].length; i++) {
            this.matrix[1][i] = false;
        }
        this.matrix[1][indexS] = true;
    }
    /**
     * Sets true on a dicovered node.
     * @param {number} index Index of node to set true.
     * @throws {discoverError} Throws Error if node ID is not exist in Discovers.
     * @memberof Discovers
     */
    markNode(index) {
        if (index >= this.matrix[0].length) {
            throw new discoverError(`There is no node to discover with this index.`);
        }
        this.matrix[1][index] = true;
    }
    /**
     * Checks if node was discovered.
     * @param {number} index Index of node to check
     * @returns {boolean} True if node was discovered. Otherwise, False.
     * @throws {discoverError} Throws Error if node ID is not exist in Discovers.
     * @memberof Discovers
     */
    hasDiscover(index) {
        if (index >= this.matrix[0].length) {
            throw new discoverError(`There is nothing in Discover with this index.`);
        }
        return this.matrix[1][index];
    }
    /**
     * Searches the node ID in the Discovers Matrix and return it index.
     * @param {number} ID ID of node to search.
     * @returns {number} The ID of node. Return -1 if there is no such node.
     * @memberof Discovers
     */
    indexOfNodeID(ID) {
        for (let i = 0; i < this.matrix[0].length; i++) {
            if (this.matrix[0][i] == ID) {
                return i;
            }
        }
        return -1;
    }
    /**
     * Print all the nodes and there discovered values.
     * @returns {string}
     * @memberof Discovers
     */
    toString() {
        let print = ``;
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < this.matrix[0].length; j++) {
                print = `${print}${this.matrix[i][j]}   `;
            }
            if (i != this.matrix[0].length - 1) {
                print = `${print}\n`;
            }
        }
        return print;
    }
}

module.exports = Discovers;
