const Edge = require('./Edge');
/**
 * Implementaion of path. Path is used for saving nodes of the minimum path from BFS Graph and creates from then edges.
 *
 * @class Path
 */
class Path {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }
    /**
     * Gets the number of nodes in the path.
     * @returns The number of nodes.
     * @memberof Path
     */
    getPathLength() {
        return this.edges.length;
    }
    /**
     * Adds new node to the path.
     * @param {} ID ID of node.
     * @memberof Path
     */
    addNodeToPath(ID) {
        this.nodes.push(ID);
    }
    /**
     * Adds new edge to path.
     *
     * @param {Edge} edge
     * @memberof Path
     */
    addEdgeToPath(edge) {
        this.edges.push(edge);
    }
    /**
     * Reverse the order of path.
     * @memberof Path
     */
    reverseNodes() {
        let newNodes = this.nodes.reverse();
        this.nodes = newNodes;
    }
    /**
     * Adds edges from the the flow graph as menntion in the minimum path. 
     * @memberof Path
     */
    createEdgesFromNodes() {
        for (let i = 0; i < this.nodes.length - 1; i++) {
            let edge = new Edge(this.nodes[i], this.nodes[i + 1]);
            this.addEdgeToPath(edge);
        }
    }
    /**
     * Prints the edges of the path.
     *
     * @memberof Path
     */
    print() {
        let print = "";
        console.log(`----Path----`);
        for (let i = 0; i < this.getPathLength(); i++) {
            print = print + "     " + this.edges[i].startNodeID + " to " + this.edges[i].endNodeID;
            console.log(`${print}`);
            print = "";
        }
    }
}

module.exports = Path;
