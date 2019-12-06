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
  const iterator = path.edges.values();

  for (const edge of iterator) {
    if (flowGraph.hasEdge(edge.from, edge.to)) {
      let flowEdge = flowGraph.getEdge(edge.from, edge.to);

      flowEdge.increaseFlow(b);
    } else {
      let flowEdge = flowGraph.getEdge(edge.to, edge.from);

      flowEdge.decreaseFlow(b);
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
function updateResidualGraph(flowGraph, residualGraph, path) {
  const iterator = path.edges.values();
  let flowEdge = undefined;

  for (const edge of iterator) {
    if (flowGraph.hasEdge(edge.from, edge.to)) {
      flowEdge = flowGraph.getEdge(edge.from, edge.to);
    } else {
      flowEdge = flowGraph.getEdge(edge.to, edge.from);
    }

    const forwardEdge = residualGraph.getEdge(flowEdge.from, flowEdge.to);
    const backwardEdge = forwardEdge.backwardEdge;
    
    forwardEdge.changeCapacityTo(flowEdge.capacity - flowEdge.flow);
    backwardEdge.changeCapacityTo(flowEdge.flow);
    residualGraph.ChooseToMarkOrUnmarkEdge(forwardEdge);
    residualGraph.ChooseToMarkOrUnmarkEdge(backwardEdge);
  }
}

module.exports = { augment, updateResidualGraph };
