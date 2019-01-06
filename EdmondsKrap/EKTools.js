const FlowEdgeForward = require('../Flow-Graph/FlowEdgeForward');
const FlowEdgeBackward = require('../Flow-Graph/FlowEdgeBackward');
/**
 * Calculate the max flow of the graph.
 *
 * @param {FlowGraph} graph
 * @returns The max flow.
 */
function flowMax(graph) {
    let flowIn = countFlow(graph.edgesForwardList);
    let flowOut = countFlow(graph.edgesBackwardList);
    return flowIn + flowOut;
}
/**
 * Sums the flow of the edges from the given edges list of the node t (node ID 1).
 *
 * @param {LinkedList} list The given edges list (Can bew edges instanceof FlowEdgeForward or FlowEdgeBackward).
 * @returns The sum of flow.
 */
function countFlow(list) {
    let temp = list.head;
    let flow = 0;
    while (temp != null) {
        if (temp.data.endNodeID == 1) {
            flow = flow + temp.data.flow;
        }
        temp = temp.next;
    }
    return flow;
}
/**
 * Increases or decreases flow from each edge from the path.
 *
 * @param {FlowGraph} graphF From the graph, its gets edges list of FlowEdgeForward and FlowEdgeBackward.
 * @param {Path} path Given path.
 */
function augment(graphF, path) {
    let length = path.getPathLength();
    let temp, edge;
    for (let i = 0; i < length; i++) {
        if (path.edges[i] instanceof FlowEdgeForward) {
            edge = graphF.findIfEdgeExistInList(path.edges[i].startNodeID, path.edges[i].endNodeID, graphF.edgesForwardList);
            temp = graphF.edgesForwardList.head;
        } else {
            edge = graphF.findIfEdgeExistInList(path.edges[i].startNodeID, path.edges[i].endNodeID, graphF.edgesBackwardList);
            temp = graphF.edgesBackwardList.head;
        }
        while (temp != null) {
            if (temp.data == edge) {
                if (temp.data instanceof FlowEdgeForward) {
                    temp.data.increaseFlow(1);
                } else {
                    temp.data.decreaseFlow(1);
                }
                break;
            }
            temp = temp.next;
        }
    }
}
/**
 * Updates the graph as a result of the augment method. Changesthe edges as in the given path.
 *
 * @param {FlowGraph} graphF From the graph, its gets edges list of FlowEdgeForward and FlowEdgeBackward.
 * @param {Path} path Given path.
 * @returns Updated FlowGraph.
 */
function updateFlowGraph(graphF, path) {
    let graph = graphF;
    let temp, edge;
    let length = path.getPathLength();
    for (let i = 0; i < length; i++) {
        if (path.edges[i] instanceof FlowEdgeForward) {
            temp = graphF.edgesBackwardList.head;
            edge = graphF.findIfEdgeExistInList(path.edges[i].endNodeID, path.edges[i].startNodeID, graphF.edgesBackwardList);
            if (edge == null) {
                edge = new FlowEdgeBackward(path.edges[i].endNodeID, path.edges[i].startNodeID);
                graph.markEdge(edge.startNodeID, edge.endNodeID);
                graphF.edgesBackwardList.addData(edge);
            }
        } else {
            temp = graphF.edgesForwardList.head;
            edge = graphF.findIfEdgeExistInList(path.edges[i].endNodeID, path.edges[i].startNodeID, graphF.edgesForwardList);
        }
        if (path.edges[i].checkIfCapacityIsFull()) {
            graph.deleteEdge(path.edges[i].startNodeID, path.edges[i].endNodeID);
            graph.markEdge(path.edges[i].endNodeID, path.edges[i].startNodeID);
            edge.resetFlow();
        } else {
            edge.changeFlowTo(path.edges[i].capacity - path.edges[i].flow);
        }
        while (temp != null) {
            if (temp.data.startNodeID == edge.startNodeID && temp.data.endNodeID == edge.endNodeID) {
                temp.data = edge;
                break;
            }
            temp = temp.next;
        }
    }
    return graph;
}

module.exports = {flowMax, augment, updateFlowGraph};
