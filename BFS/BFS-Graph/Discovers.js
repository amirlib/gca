const discoverError = require('./discoverError');
/**
 * Implementaion of Discovers nodes array. Each node from the original graph is exist in this array.
 * All node are initial to False. Set True to node, if the BFS algorithm met the node.
 * The BFS algorithm use this class for creating the BFS graph.
 *
 * @class Discovers
 */
class Discovers {
    constructor(nodesID) {
        this.matrix = new Array(2);
        this.matrix[0] = nodesID;
        this.matrix[1] = new Array(nodesID.length);
    }
    /**
     * Initiate the matrix: Insert False to evrey cell except the root node.
     * @param {number} indexS The index of the root BFS graph node.
     * @param {number} size Number of nodes in the original graph.
     * @memberof Discovers
     */
    init(indexS, size) {
        for (let i = 0; i < size; i++) {
            this.matrix[1][i] = false;
        }
        this.matrix[1][indexS] = true;
    }
    /**
     * Sets true on a dicovered node.
     * @param {number} index Index of node to set true.
     * @memberof Discovers
     */
    setDiscover(index) {
        if (index >= this.matrix[0].length) {
            throw new discoverError(`There is no node to discover with this index.`);
        }
        this.matrix[1][index] = true;
    }
    /**
     * Checks if node was discovered.
     * @param {number} index Index of node to check
     * @returns {boolean} True if node was discovered. Otherwise, False.
     * @memberof Discovers
     */
    checkDiscover(index) {
        if (index >= this.matrix[0].length) {
            throw new discoverError(`There is nothing in Discover with this index.`);
        }
        return this.matrix[1][index];
    }
    /**
     * Searches the node ID in the Discovers Matrix and return it index.
     * @param {number} ID ID of node to search.
     * @returns The ID of node. Return -1 if there is no such node.
     * @memberof Discovers
     */
    searchIndexOfNodeID(ID) {
        for (let i = 0; i < this.matrix[0].length; i++) {
            if (this.matrix[0][i] == ID) {
                return i;
            }
        }
        return -1;
    }
    /**
     * Print all the nodes and there discovered values.
     *
     * @memberof Discovers
     */
    print() {
        let print = "";
        console.log(`----Discovers----`);
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < this.matrix[0].length; j++) {
                print = print + "     " + this.matrix[i][j];
            }
            console.log(`${print}`);
            print = "";
        }
    }
}

module.exports = Discovers;
