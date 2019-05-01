const Edge = require("./Edge");
/**
 * Implementaion of edge class for the Flow Graph class. Each edge includes data for it nodes, the flow and the capacity.
 *
 * @class FlowEdge
 * @extends {Edge}
 */
class FlowEdge extends Edge {
  /**
   * Creates an instance of FlowEdge.
   * @param {number} from ID of strat Node of edge.
   * @param {number} to ID of end Node of edge.
   * @param {number} capacity The capacity of edge.
   * @param {number} flow The flow of edge.
   * @memberof FlowEdge
   */
  constructor(from, to, capacity, flow) {
    super(from, to);
    this.capacity = capacity;
    this.flow = flow;
    if (flow > capacity) {
      this.flow = this.capacity;
    } else if (flow < 0) {
      this.flow = 0;
    }
  }
  /**
   * Increases the flow in the edge.
   * @param {number} addedFlow The amount of flow to increase in the edge.
   * @memberof FlowEdge
   */
  increaseFlow(addedFlow) {
    this.flow = this.flow + addedFlow;
    if (this.flow > this.capacity) {
      this.flow = this.capacity;
    }
  }
  /**
   * Decreases the flow in the edge.
   * @param {number} reducedFlow The amount of flow to reduce in the edge.
   * @memberof FlowEdge
   */
  decreaseFlow(reducedFlow) {
    this.flow = this.flow - reducedFlow;
    if (this.flow < this.capacity) {
      this.flow = 0;
    }
  }
  /**
   * Reset the flow in the edge.
   * @memberof FlowEdge
   */
  resetFlow() {
    this.flow = 0;
  }
  /**
   * Replaces the flow in the edge with new value.
   * @param {number} flow The new value of flow.
   * @memberof FlowEdge
   */
  changeFlowTo(flow) {
    this.flow = flow;
    if (this.flow > this.capacity) {
      this.flow = this.capacity;
    } else if (this.flow < 0) {
      this.flow = 0;
    }
  }
  /**
   * Replaces the capacity in the edge with new value.
   * @param  {number} capaity the new value of capacity.
   * @memberof FlowEdge
   */
  changeCapacityTo(capaity) {
    this.capacity = capaity;
    if (this.capacity < 0) {
      this.capacity = 0;
    }
  }
  /**
   * Checks if the capacity is full.
   * @returns {boolean} True if capacity of the edge is full. Otherwise, return false.
   * @memberof FlowEdge
   */
  isCapacityFull() {
    if (this.flow == this.capacity) {
      return true;
    }
    return false;
  }
  /**
   * checks if it empty (zero flow).
   * @returns {boolean} True if it empty. Otherwise, return false.
   * @memberof FlowEdge
   */
  isEmpty() {
    if (this.flow == 0) {
      return true;
    }
    return false;
  }
  /**
   * clones a FlowEdge object.
   * @return {FlowEdge} cloned FlowEdge.
   * @memberof FlowEdge
   */
  clone() {
    let clonedEdge = new FlowEdge(this.from, this.to);
    clonedEdge.capacity = this.capacity;
    clonedEdge.flow = this.flow;
    return clonedEdge;
  }
  /**
   * Returns string with the data of edge.
   * @returns {string}
   * @memberof FlowEdge
   */
  toString() {
    return `${super.toString()} with capacity: ${this.capacity} and flow: ${
      this.flow
    }`;
  }
}

module.exports = FlowEdge;
