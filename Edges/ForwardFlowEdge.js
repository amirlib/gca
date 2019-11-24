const FlowEdge = require("./FlowEdge");
/**
 * Implementation of forward edge class for the Flow Graph class.
 * @class ForwardFlowEdge
 * @extends {FlowEdge}
 */
class ForwardFlowEdge extends FlowEdge {
  /**
   * Creates an instance of ForwardFlowEdge.
   * @param {number} from ID of start Node of edge.
   * @param {number} to ID of end Node of edge.
   * @param {number} capacity The capacity of edge.
   * @param {number} flow The flow of edge.
   * @memberof ForwardFlowEdge
   */
  constructor(from, to, capacity, flow) {
    super(from, to, capacity, flow);

    this.backwardEdge = null;
  }
  /**
   * clones a ForwardFlowEdge object.
   * @return {ForwardFlowEdge} cloned ForwardFlowEdge.
   * @memberof ForwardFlowEdge
   */
  clone() {
    let edge = new ForwardFlowEdge(this.from, this.to, this.capacity, this.flow);

    edge.backwardEdge = this.backwardEdge;
    return edge;
  }
}

module.exports = ForwardFlowEdge;
