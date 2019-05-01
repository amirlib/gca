const FlowEdge = require("./FlowEdge");
/**
 * Implementaion of forward edge class for the Flow Graph class.
 *
 * @class ForwardFlowEdge
 * @extends {FlowEdge}
 */
class ForwardFlowEdge extends FlowEdge {
  /**
   * Creates an instance of ForwardFlowEdge.
   * @param {number} from ID of strat Node of edge.
   * @param {number} to ID of end Node of edge.
   * @param {number} capacity The capacity of edge.
   * @param {number} flow The flow of edge.
   * @memberof ForwardFlowEdge
   */
  constructor(from, to, capacity, flow) {
    super(from, to, capacity, flow);
  }
  /**
   * clones a ForwardFlowEdge object.
   * @return {ForwardFlowEdge} cloned ForwardFlowEdge.
   * @memberof ForwardFlowEdge
   */
  clone() {
    let clonedEdge = new ForwardFlowEdge(this.from, this.to);
    clonedEdge.capacity = this.capacity;
    clonedEdge.flow = this.flow;
    return clonedEdge;
  }
}

module.exports = ForwardFlowEdge;
