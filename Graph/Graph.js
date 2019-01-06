/**
 * Implementaion of Graph, includes the BFS algorithm.
 * @class Graph
 */
class Graph {
    constructor() {
        this.nodesID = []; //Array of Nodes ID - When the ID inside index 'i' in this array represent the ID inside index of 'i + 1' in the Matrix array.
        this.matrix = []; //2d Array that represent the Graph as 'Adjacency matrix'
        this.matrix[0] = ['M'];
    }
    /**
     * Gets the number of nodes in the graph.
     * @returns {number} The number of nodes.
     * @memberof Graph
     */
    getNodesSize() {
        return this.nodesID.length;
    }
    /**
     * Inserts a new node to the graph.
     * @param {number} ID ID of node to insert.
     * @memberof Graph
     */
    insertNode(ID) {
        if (this.searchIndexOfNodeID(ID) != -1) {
            console.log(`This node already exists`);
        } else {
            let length = this.matrix.length;
            this.nodesID.push(ID);
            this.matrix[0].push(ID);
            this.matrix[length] = [ID];
            for (let i = 1; i < length; i++) {
                this.matrix[i][length] = 0;
            }
            for (let i = 1; i <= length; i++) {
                this.matrix[length][i] = 0;
            }
        }
    }
    /**
     * Inserts new edge to the graph: when '1' in (startNodeID, endNodeID) represent an edge from startNodeID to endNodeID.
     * @param {number} startNodeID ID of strat Node of edge.
     * @param {number} endNodeID ID of end Node of edge.
     * @memberof Graph
     */
    insertEdge(startNodeID, endNodeID) {
        let startNodeIndex = this.searchIndexOfNodeID(startNodeID);
        let endNodeIndex = this.searchIndexOfNodeID(endNodeID);
        if (startNodeIndex == -1) {
            console.log(`Node ID: ${startNodeID} does not exist`);
        } else if (endNodeIndex == -1) {
            console.log(`Node ID: ${endNodeID} does not exist`);
        } else if (this.searchEdge(startNodeID, endNodeID) == true) {
            console.log(`The edge you are trying to insert, is already exist`);
        } else {
            this.matrix[startNodeIndex][endNodeIndex] = 1;
        }
    }
    /**
     * Deletes given node ID from the graph, include all the edges that related to this ID.
     * @param {number} ID ID of node to delete.
     * @memberof Graph
     */
    deleteNode(ID) {
        let length = this.matrix.length;
        let nodeIndex = this.searchIndexOfNodeID(ID);
        if (nodeIndex == -1) {
            console.log(`This node does not exist`);
        } else {
            for (let i = 0; i < length; i++) {
                for (let j = nodeIndex; j < length - 1; j++) {
                    this.matrix[i][j] = this.matrix[i][j + 1];
                }
                this.matrix[i].pop();
            }
            for (let i = nodeIndex; i < length; i++) {
                this.matrix[i] = this.matrix[i + 1];
            }
            this.matrix.pop();
            /* Delete the ID from the nodeID array. */
            length = this.nodesID.length;
            nodeIndex = this.searchIndexOfNodeID(ID) - 1;
            for (let i = nodeIndex; i < length; i++) {
                this.nodesID[i] = this.nodesID[i + 1];
            }
            this.nodesID.pop();
        }
    }
    /**
     * Deletes edge from the graph.
     * @param {number} startNodeID ID of strat Node of edge.
     * @param {number} endNodeID ID of end Node of edge.
     * @memberof Graph
     */
    deleteEdge(startNodeID, endNodeID) {
        let startNodeIndex = this.searchIndexOfNodeID(startNodeID);
        let endNodeIndex = this.searchIndexOfNodeID(endNodeID);
        if (startNodeIndex != -1 && endNodeIndex != -1) {
            this.matrix[startNodeIndex][endNodeIndex] = 0;
        }
    }
    /**
     * Searchs for index of node with id: ID, that will represented in the matrix of graph.
     * @param {number} ID ID of node to search.
     * @returns The index of node that represent the same index in the matrix of the graph. Returns -1 if there is no such ID.
     * @memberof Graph
     */
    searchIndexOfNodeID(ID) {
        let length = this.nodesID.length;
        for (let i = 0; i < length; i++) {
            if (this.nodesID[i] == ID) {
                return i + 1;
            }
        }
        return -1;
    }
    /**
     * Finds edges that have the endNodeID of the node with id: ID
     * @param {number} ID ID of node.
     * @returns Array of IDs that are the startNodeID of the edges. Returns empty array if there are no edges like that.
     * @memberof Graph
     */
    findEdgesFromNode(ID) {
        let nodeIndex = this.searchIndexOfNodeID(ID);
        let result = [];
        if (nodeIndex == -1) {
            return result;
        } else {
            for (let i = 1; i < this.matrix.length; i++) {
                if (this.matrix[nodeIndex][i] == 1) {
                    result.push(this.matrix[0][i]);
                }
            }
        }
        return result;
    }
    /**
     * Searchs if exist an edge: (startNodeID, endNodeID).
     * @param {number} startNodeID ID of strat Node of edge.
     * @param {number} endNodeID ID of end Node of edge.
     * @returns True if there is such edge. Otherwise, False.
     * @memberof Graph
     */
    searchEdge(startNodeID, endNodeID) {
        let startNodeIndex = this.searchIndexOfNodeID(startNodeID);
        let endNodeIndex = this.searchIndexOfNodeID(endNodeID);
        if (startNodeIndex == -1 || endNodeIndex == -1) {
            return false;
        } else {
            if (this.matrix[startNodeIndex][endNodeIndex] == 1) {
                return true;
            }
        }
        return false;
    }
    /**
     * Checks if given node is exist in the graph.
     * @param {number} ID The given node ID.
     * @returns True if exist, otherwise False.
     * @memberof Graph
     */
    checkExistNodeInGraph(ID) {
        let length = this.nodesID.length;
        for (let i = 0; i < length; i++) {
            if (this.nodesID[i] == ID) {
                return true;
            }
        }
        return false;
    }
    /**
     * Prints the matrix of the graph.
     *
     * @memberof Graph
     */
    printGraph() {
        let length = this.matrix.length;
        let print = "";
        console.log(`----Graph----`);
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                print = print + "     " + this.matrix[i][j];
            }
            console.log(`${print}`);
            print = "";
        }
    }
    /**
     * Prints the nodes that are in NodesID array.
     *
     * @memberof Graph
     */
    printNodesID() {
        let length = this.nodesID.length;
        let print = "";
        console.log(`----Nodes ID----`);
        for (let i = 0; i < length; i++) {
            print = print + " " + this.nodesID[i];
        }
        console.log(`${print}`);
    }
    /**
     * Throw error. Can serch for path only from BFS Graph.
     * @param {number} ID 
     * @memberof Graph
     */
    getPath(ID) {
        throw new Error(`Can not search for path. Path must be created from BFS Graph.`);
    }
}

module.exports = Graph;
