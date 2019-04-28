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
   * clones an Edge object.
   * @return {Edge} cloned Edge.
   * @memberof Edge
   */
  clone() {
    return new Edge(this.from, this.to);
  }
  /**
   * Returns string with the data of edge.
   * @returns {string}
   * @memberof Edge
   */
  toString() {
    return `${this.from} to ${this.to}`;
  }
}

module.exports = Edge;
