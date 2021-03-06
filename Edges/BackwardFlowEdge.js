const FlowEdge = require("./FlowEdge");
/**
 * Implementation of backward edge class for the Flow Graph class.
 * @class BackwardFlowEdge
 * @extends {FlowEdge}
 */
class BackwardFlowEdge extends FlowEdge {
  /**
   * Creates an instance of BackwardFlowEdge.
   * @param {number} from ID of start Node of edge.
   * @param {number} to ID of end Node of edge.
   * @param {number} capacity The capacity of edge.
   * @param {number} flow The flow of edge.
   * @memberof BackwardFlowEdge
   */
  constructor(from, to, capacity, flow) {
    super(from, to, capacity, flow);

    this.forwardEdge = null;
  }
  /**
   * clones a BackwardFlowEdge object.
   * @return {BackwardFlowEdge} cloned BackwardFlowEdge.
   * @memberof BackwardFlowEdge
   */
  clone() {
    const edge = new BackwardFlowEdge(this.from, this.to, this.capacity, this.flow);

    edge.forwardEdge = this.forwardEdge;
    return edge;
  }
}

module.exports = BackwardFlowEdge;
