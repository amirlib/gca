/**
 * Implementaion of edge class for edges of Path objects.
 *
 * @class Edge
 */
class Edge {
    /**
     * Creates an instance of Edge.
     * @param {number} from ID of strat Node of edge.
     * @param {number} to ID of end Node of edge.
     * @memberof Edge
     */
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
    /**
     * Prints the details of the edge.
     * @returns {string} String with the data.
     * @memberof Edge
     */
    toString() {
        return `${this.from} to ${this.to}`;
    }
}

module.exports = Edge;
