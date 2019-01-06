const FlowEdge = require('./FlowEdge');
/**
 * Implementaion of backward edge class for the Flow Graph class.
 *
 * @class FlowEdgeBackward
 * @extends {FlowEdge}
 */
class FlowEdgeBackward extends FlowEdge {
    constructor(startNodeID, endNodeID) {
        super(startNodeID, endNodeID);
    }
}

module.exports = FlowEdgeBackward;
