/**
 * Returns the smallest capacity of the edges in the path.
 * @param  {Path} path 
 * @return {number} the smallest capacity.
 */
function bottleneck(path) {
  const iterator = path.edges.values();
  let minCapacity = path.edges[0].capacity;

  for (const edge of iterator) {
    if (minCapacity > edge.capacity) {
      minCapacity = edge.capacity;
    }
  }

  return minCapacity;
}
/**
 * Increases or decreases flow, of the edges in the original graph.
 * @param {FlowGraph} flowGraph the original graph.
 * @param {Path} path
 */
function augment(flowGraph, path) {
  const b = bottleneck(path);

  for (let i = 0; i < path.size(); i++) {
    let edge = flowGraph.getEdge(path.edges[i].from, path.edges[i].to);

    if (edge != null) {
      edge.increaseFlow(b);
    } else {
      edge = flowGraph.getEdge(path.edges[i].to, path.edges[i].from);
      edge.decreaseFlow(b);
    }
  }

  return b;
}
/**
 * Updates the residual graph as a result of the augment method.
 * @param {FlowGraph} flowGraph the original graph.
 * @param {ResidualGraph} residualGraph the residual graph of the original graph.
 * @param {Path} path given path.
 */
function updateFlowGraph(flowGraph, residualGraph, path) {
  for (let i = 0; i < path.size(); i++) {
    let edge = flowGraph.getEdge(path.edges[i].from, path.edges[i].to);

    if (edge == null) {
      edge = flowGraph.getEdge(path.edges[i].to, path.edges[i].from);
    }

    const forwardEdge = residualGraph.getEdge(edge.from, edge.to, residualGraph.edgesList);
    const backwardEdge = forwardEdge.backwardEdge;
    
    forwardEdge.changeCapacityTo(edge.capacity - edge.flow);
    backwardEdge.changeCapacityTo(edge.flow);
    residualGraph.ChooseToMarkOrUnmarkEdge(forwardEdge);
    residualGraph.ChooseToMarkOrUnmarkEdge(backwardEdge);
  }
}

module.exports = { augment, updateFlowGraph };
