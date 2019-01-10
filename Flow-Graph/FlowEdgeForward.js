const FlowEdge = require('./FlowEdge');
/**
 * Implementaion of forward edge class for the Flow Graph class.
 *
 * @class FlowEdgeForward
 * @extends {FlowEdge}
 */
class FlowEdgeForward extends FlowEdge {
    /**
     * Creates an instance of FlowEdgeForward.
     * @param {number} from ID of strat Node of edge.
     * @param {number} to ID of end Node of edge.
     * @memberof FlowEdgeForward
     */
    constructor(from, to) {
        super(from, to);
    }
}

module.exports = FlowEdgeForward;
