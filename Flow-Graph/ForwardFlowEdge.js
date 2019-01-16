const FlowEdge = require('./FlowEdge');
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
     * @memberof ForwardFlowEdge
     */
    constructor(from, to) {
        super(from, to);
    }
}

module.exports = ForwardFlowEdge;
