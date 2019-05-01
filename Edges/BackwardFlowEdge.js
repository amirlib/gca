const FlowEdge = require("./FlowEdge");
/**
 * Implementaion of backward edge class for the Flow Graph class.
 *
 * @class BackwardFlowEdge
 * @extends {FlowEdge}
 */
class BackwardFlowEdge extends FlowEdge {
  /**
   * Creates an instance of BackwardFlowEdge.
   * @param {number} from ID of strat Node of edge.
   * @param {number} to ID of end Node of edge.
   * @param {number} capacity The capacity of edge.
   * @param {number} flow The flow of edge.
   * @memberof BackwardFlowEdge
   */
  constructor(from, to, capacity, flow) {
    super(from, to, capacity, flow);
  }
  /**
   * clones a BackwardFlowEdge object.
   * @return {BackwardFlowEdge} cloned BackwardFlowEdge.
   * @memberof BackwardFlowEdge
   */
  clone() {
    let clonedEdge = new BackwardFlowEdge(this.from, this.to);
    clonedEdge.capacity = this.capacity;
    clonedEdge.flow = this.flow;
    return clonedEdge;
  }
}

module.exports = BackwardFlowEdge;
