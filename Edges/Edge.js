/**
 * Implementation of edge class for edges of Path objects.
 *
 * @class Edge
 */
class Edge {
  /**
   * Creates an instance of Edge.
   * @param {number} from ID of start Node of edge.
   * @param {number} to ID of end Node of edge.
   * @memberof Edge
   */
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
  /**
   * Checks if two edges are equals.
   * @param  {Edge} edge 
   * @return {boolean} true if this instance variables are equals to edge instance variables. Otherwise. returns false.
   * @memberof Edge
   */
  equals(edge) {
    if (this.from != edge.from || this.to != edge.to) return false;
    
    return true;
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
