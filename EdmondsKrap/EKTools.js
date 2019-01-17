const ForwardFlowEdge = require('../Flow-Graph/ForwardFlowEdge');
const BackwardFlowEdge = require('../Flow-Graph/BackwardFlowEdge');
/**
 * Calculate the max flow of the graph.
 *
 * @param {FlowGraph} graph
 * @returns {number} The max flow.
 */
function flowMax(graph) {
    let flowIn = countFlow(graph.forwardEdgesList);
    let flowOut = countFlow(graph.backwardEdgesList);
    return flowIn + flowOut;
}
/**
 * Sums the flow of the edges from the given edges list of the node t (node ID 1).
 *
 * @param {LinkedList} list The given edges list (Can bew edges instanceof ForwardFlowEdge or BackwardFlowEdge).
 * @returns {number} The sum of flow.
 */
function countFlow(list) {
    let temp = list.head;
    let flow = 0;
    while (temp != null) {
        if (temp.data.to == 1) {
            flow = flow + temp.data.flow;
        }
        temp = temp.next;
    }
    return flow;
}
/**
 * Increases or decreases flow from each edge from the path.
 *
 * @param {FlowGraph} graphF From the graph, its gets edges list of ForwardFlowEdge and BackwardFlowEdge.
 * @param {Path} path Given path.
 */
function augment(graphF, path) {
    let temp, edge;
    for (let i = 0; i < path.size(); i++) {
        if (path.edges[i] instanceof ForwardFlowEdge) {
            edge = graphF.findEdgeInList(path.edges[i].from, path.edges[i].to, graphF.forwardEdgesList);
            temp = graphF.forwardEdgesList.head;
        } else {
            edge = graphF.findEdgeInList(path.edges[i].from, path.edges[i].to, graphF.backwardEdgesList);
            temp = graphF.backwardEdgesList.head;
        }
        while (temp != null) {
            if (temp.data == edge) {
                if (temp.data instanceof ForwardFlowEdge) {
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
 * @param {FlowGraph} graphF From the graph, its gets edges list of ForwardFlowEdge and BackwardFlowEdge.
 * @param {Path} path Given path.
 * @returns {FlowGraph} Updated FlowGraph.
 */
function updateFlowGraph(graphF, path) {
    let graph = graphF;
    let temp, edge;
    let length = path.size();
    for (let i = 0; i < length; i++) {
        if (path.edges[i] instanceof ForwardFlowEdge) {
            temp = graphF.backwardEdgesList.head;
            edge = graphF.findEdgeInList(path.edges[i].to, path.edges[i].from, graphF.backwardEdgesList);
            if (edge == null) {
                edge = new BackwardFlowEdge(path.edges[i].to, path.edges[i].from);
                graph.markEdge(edge.from, edge.to);
                graphF.backwardEdgesList.addData(edge);
            }
        } else {
            temp = graphF.forwardEdgesList.head;
            edge = graphF.findEdgeInList(path.edges[i].to, path.edges[i].from, graphF.forwardEdgesList);
        }
        if (path.edges[i].isCapacityFull()) {
            graph.unmarkEdge(path.edges[i].from, path.edges[i].to);
            graph.markEdge(path.edges[i].to, path.edges[i].from);
            edge.resetFlow();
        } else {
            edge.changeFlowTo(path.edges[i].capacity - path.edges[i].flow);
        }
        while (temp != null) {
            if (temp.data.from == edge.from && temp.data.to == edge.to) {
                temp.data = edge;
                break;
            }
            temp = temp.next;
        }
    }
    return graph;
}

module.exports = {flowMax, augment, updateFlowGraph};
