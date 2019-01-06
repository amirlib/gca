const FlowEdge = require('./FlowEdge');
/**
 * Implementaion of forward edge class for the Flow Graph class.
 *
 * @class FlowEdgeForward
 * @extends {FlowEdge}
 */
class FlowEdgeForward extends FlowEdge {
    constructor(startNodeID, endNodeID) {
        super(startNodeID, endNodeID);
    }
}

module.exports = FlowEdgeForward;
