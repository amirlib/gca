const FlowEdge = require("../Edges/FlowEdge");
/**
 * Calculate the max flow of the graph.
 * @param {LinkedList} list
 * @returns {number} The max flow.
 */
function flowMax(list) {
  console.log(`flowMax`);
  let temp = list.head;
  let flow = 0;
  while (temp != null) {
    if (temp.data.to == 1) {
      flow = flow - temp.data.flow;
    }
    if (temp.data.from == 1) {
      flow = flow + temp.data.flow;
    }
    temp = temp.next;
  }
  return flow;
}
/**
 * Increases or decreases flow from each edge from the path.
 * @param {FlowGraph} graphF From the graph, its gets edges list of ForwardFlowEdge and BackwardFlowEdge.
 * @param {Path} path Given path.
 */
function augment(graphF, path) {
  console.log(`enter augment`);
  for (let i = 0; i < path.size(); i++) {
    let edge = graphF.findEdgeInList(path.edges[i].from, path.edges[i].to);
    if (edge.isCapacityFull()) {
      edge = graphF.findEdgeInList(path.edges[i].to, path.edges[i].from);
    }
    console.log(`before augment edge: ${edge}`);
    edge.increaseFlow(1);
  }
  console.log(`exit augment`);
}
/**
 * Updates the graph as a result of the augment method. Changes the edges as in the given path.
 * @param {FlowGraph} graphF From the graph, its gets edges list of ForwardFlowEdge and BackwardFlowEdge.
 * @param {Path} path Given path.
 */
function updateFlowGraph(graphF, path) {
  console.log(`enter updateFlowGraph`);
  let length = path.size();
  for (let i = 0; i < length; i++) {
    let forwardEdge = graphF.findEdgeInList(
      path.edges[i].from,
      path.edges[i].to
    );
    let backwardEdge = graphF.findEdgeInList(
      path.edges[i].to,
      path.edges[i].from
    );
    if (backwardEdge == null) {
      backwardEdge = new FlowEdge(path.edges[i].to, path.edges[i].from);
      graphF.edgesList.addData(backwardEdge);
    }
    backwardEdge.increaseFlow(1);
    graphF.markEdge(backwardEdge.from, backwardEdge.to);
    forwardEdge.decreaseFlow(1);
    graphF.unmarkEdge(forwardEdge.from, forwardEdge.to);
  }
  console.log(`exit updateFlowGraph`);
}

module.exports = { flowMax, augment, updateFlowGraph };
