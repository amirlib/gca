/**
 * If capacity of the edge is zero, unmark from the graph. Otherwise, mark it.
 * @param  {ResidualGraph} residualGraph the graph. 
 * @param  {FlowEdge} edge the edge.
 */
function ifCapacityZero(residualGraph, edge) {
  if (edge.capacity == 0) {
    residualGraph.unmarkEdge(edge.from, edge.to);
  } else {
    residualGraph.markEdge(edge.from, edge.to);
  }
}
/**
 * Returns the smallest capacity one of the edges in the path.
 * @param  {Path} path 
 * @return {number} the smallest capacity.
 */
function bottleneck(path) {
  const length = path.size();
  let minCapacityLeft = path.edges[0].capacity;

  for (let i = 0; i < length; i++) {
    const res = path.edges[i].capacity;

    if (minCapacityLeft > res) {
      minCapacityLeft = res;
    }
  }

  return minCapacityLeft;
}
/**
 * Increases or decreases flow, of the edges in the original graph.
 * @param {FlowGraph} flowGraph the original graph.
 * @param {Path} path
 */
function augment(flowGraph, path) {
  const b = bottleneck(path);
  const length = path.size();

  for (let i = 0; i < length; i++) {
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
  const length = path.size();

  for (let i = 0; i < length; i++) {
    let edge = flowGraph.getEdge(path.edges[i].from, path.edges[i].to);

    if (edge == null) {
      edge = flowGraph.getEdge(path.edges[i].to, path.edges[i].from);
    }

    const forwardEdge = residualGraph.getEdge(edge.from, edge.to, residualGraph.edgesList);
    const backwardEdge = forwardEdge.backwardEdge;
    
    forwardEdge.changeCapacityTo(edge.capacity - edge.flow);
    backwardEdge.changeCapacityTo(edge.flow);
    ifCapacityZero(residualGraph, forwardEdge);
    ifCapacityZero(residualGraph, backwardEdge);
  }
}

module.exports = { augment, updateFlowGraph };
