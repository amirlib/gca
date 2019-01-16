const FlowEdge = require('./FlowEdge');
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
     * @memberof BackwardFlowEdge
     */
    constructor(from, to) {
        super(from, to);
    }
}

module.exports = BackwardFlowEdge;
