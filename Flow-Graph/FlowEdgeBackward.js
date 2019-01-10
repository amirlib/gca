const FlowEdge = require('./FlowEdge');
/**
 * Implementaion of backward edge class for the Flow Graph class.
 *
 * @class FlowEdgeBackward
 * @extends {FlowEdge}
 */
class FlowEdgeBackward extends FlowEdge {
    /**
     * Creates an instance of FlowEdgeBackward.
     * @param {number} from ID of strat Node of edge.
     * @param {number} to ID of end Node of edge.
     * @memberof FlowEdgeBackward
     */
    constructor(from, to) {
        super(from, to);
    }
}

module.exports = FlowEdgeBackward;
