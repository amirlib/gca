/**
 * Implementaion of edge class for edges of Path objects.
 *
 * @class Edge
 */
class Edge {
    constructor(startNodeID, endNodeID) {
        this.startNodeID = startNodeID;
        this.endNodeID = endNodeID;
    }
    /**
     * Prints the details of the edge. You CAN just print the object without calling toString method.
     * @returns String with the data.
     * @memberof Edge
     */
    toString() {
        return `${this.startNodeID} to ${this.endNodeID}`;
    }
}

module.exports = Edge;
