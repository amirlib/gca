const ForwardFlowEdge = require("../Edges/ForwardFlowEdge");
const BackwardFlowEdge = require("../Edges/BackwardFlowEdge");
/**
 * Calculate the max flow of the graph.
 *
 * @param {FlowGraph} graph
 * @returns {number} The max flow.
 */
function flowMax(graph) {
  console.log(`enter flowMax`);
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
    if (temp.data.from == 1) {
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
  console.log(`enter augment`);
  for (let i = 0; i < path.size(); i++) {
    if (path.edges[i] instanceof ForwardFlowEdge) {
      let forwardEdge = graphF.findEdgeInList(
        path.edges[i].from,
        path.edges[i].to,
        graphF.forwardEdgesList
      );
      console.log(`before augment ForwardFlowEdge: ${forwardEdge}`);
      forwardEdge.increaseFlow(1);
    } else {
      let backwardEdge = graphF.findEdgeInList(
        path.edges[i].from,
        path.edges[i].to,
        graphF.backwardEdgesList
      );
      console.log(`before augment BackwardFlowEdge: ${backwardEdge}`);
      backwardEdge.decreaseFlow(1);
    }
  }
  console.log(`exit augment`);
}
/**
 * Updates the graph as a result of the augment method. Changes the edges as in the given path.
 *
 * @param {FlowGraph} graphF From the graph, its gets edges list of ForwardFlowEdge and BackwardFlowEdge.
 * @param {Path} path Given path.
 * @returns {FlowGraph} Updated FlowGraph.
 */
function updateFlowGraph(graphF, path) {
  console.log(`enter updateFlowGraph`);
  let graph = graphF;
  let backwardEdge, forwardEdge;
  let length = path.size();
  for (let i = 0; i < length; i++) {
    if (path.edges[i] instanceof ForwardFlowEdge) {
      backwardEdge = graphF.findEdgeInList(
        path.edges[i].to,
        path.edges[i].from,
        graphF.backwardEdgesList
      );
      if (backwardEdge == null) {
        backwardEdge = new BackwardFlowEdge(path.edges[i].to, path.edges[i].from);
        graph.markEdge(backwardEdge.from, backwardEdge.to);
        graphF.backwardEdgesList.addData(backwardEdge);
      }
      backwardEdge.increaseFlow(1);
      graph.markEdge(backwardEdge.from, backwardEdge.to);
      forwardEdge = graphF.findEdgeInList(
        path.edges[i].from,
        path.edges[i].to,
        graphF.forwardEdgesList
      );
      forwardEdge.decreaseFlow(1);
      graph.unmarkEdge(forwardEdge.from, forwardEdge.to);
    } else {
      forwardEdge = graphF.findEdgeInList(
        path.edges[i].to,
        path.edges[i].from,
        graphF.forwardEdgesList
      );
      forwardEdge.increaseFlow(1);
      graph.markEdge(forwardEdge.from, forwardEdge.to);
      backwardEdge = graphF.findEdgeInList(
        path.edges[i].from,
        path.edges[i].to,
        graphF.backwardEdgesList
      );
      backwardEdge.decreaseFlow(1);
      graph.unmarkEdge(backwardEdge.from, backwardEdge.to);
    }
    // if (path.edges[i].isCapacityFull()) {
    //   console.log(`isCapacityFull`);

    //   graph.markEdge(path.edges[i].to, path.edges[i].from);
    //   edge.resetFlow();
    // } else {
    //   edge.changeFlowTo(path.edges[i].capacity - path.edges[i].flow);
    // }
    // while (temp != null) {
    //   if (temp.data.from == edge.from && temp.data.to == edge.to) {
    //     temp.data = edge;
    //     break;
    //   }
    //   temp = temp.next;
    // }
  }
  console.log(`exit updateFlowGraph`);
  return graph;
}

module.exports = { flowMax, augment, updateFlowGraph };
