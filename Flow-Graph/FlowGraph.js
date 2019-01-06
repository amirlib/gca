const Graph = require('../Graph/Graph');
const LinkedList = require('./LinkedList/LinkedList');
const FlowEdgeForward = require('./FlowEdgeForward');
/**
 * Implementaion of Flow Graph. There are tools for building a Flow Graph that will return a correct max flow from Edmonds Krap alogritem.
 * DONOT use it to reperesent normal graph!
 *
 * @class FlowGraph
 * @extends {Graph}
 */
class FlowGraph extends Graph {
    constructor() {
        super();
        this.s = 0;
        this.t = 1;
        this.edgesForwardList = new LinkedList(); //Save the forward edges of this graph.
        this.edgesBackwardList = new LinkedList(); //Save the backward edges of this graph.
        super.insertNode(this.s);
        super.insertNode(this.t);
    }
    /**
     * Marks in the Graph's matrix new edge. USE it only when use need to update the forward edge that was deleted beacuse the capacity of the edge was full.
     * @param {number} startNodeID ID of start node edge.
     * @param {number} endNodeID ID of the end node edge. 
     * @memberof FlowGraph
     */
    markEdge(startNodeID, endNodeID) {
        let startNodeIndex = this.searchIndexOfNodeID(startNodeID);
        let endNodeIndex = this.searchIndexOfNodeID(endNodeID);
        this.matrix[startNodeIndex][endNodeIndex] = 1;
    }  
    /**
     * Inserts a new node to the graph. But the ID can not be 0 OR 1.
     * @param {number} ID ID of node to insert.  
     * @memberof FlowGraph
     */
    insertNode(ID) {
        if (ID == 0 || ID == 1) {
            console.log(`You can not create new node with ID: 0 AND 1`);
        } else {
            super.insertNode(ID);
        }
    }
    /**
     * EDITED: Inserts new edge to the graph - When '1' in (startNodeID, endNodeID) represent an edge from startNodeID to endNodeID, and also create an object for the edge.
     * @param {number} startNodeID ID of strat Node of edge.
     * @param {number} endNodeID ID of end Node of edge.
     * @memberof FlowGraph
     */
    insertEdge(startNodeID, endNodeID) {
        let startNodeIndex = this.searchIndexOfNodeID(startNodeID);
        let endNodeIndex = this.searchIndexOfNodeID(endNodeID);
        if (startNodeIndex == -1) {
            console.log(`Node ID: ${startNodeID} does not exist`);
        } else if (endNodeIndex == -1) {
            console.log(`Node ID: ${endNodeID} does not exist`);
        } else if (this.searchEdge(startNodeID, endNodeID) == true) {
            console.log(`The edge you are trying to insert, is already exist`);
        } else {
            this.matrix[startNodeIndex][endNodeIndex] = 1;
            this.edgesForwardList.addData(new FlowEdgeForward(startNodeID, endNodeID));
        }
    }
    /**
     * Returns from given list an edge that have the same given nodes.
     * @param {number} startNodeID ID of start node edge.
     * @param {number} endNodeID ID of end node edge.
     * @param {LinkedList} list The list.
     * @returns Edge from the list.
     * @memberof FlowGraph
     */
    findIfEdgeExistInList(startNodeID, endNodeID, list) {
        let currNode = list.head;
        while (currNode != null) {
            if (currNode.data.startNodeID == startNodeID && currNode.data.endNodeID == endNodeID) {
                return currNode.data;
            }
            currNode = currNode.next;
        }
        return null;
    }
    /**
     * Change the each edge in path to its edge of the graph
     *
     * @param {Path} path The path's edges.
     * @memberof FlowGraph
     */
    changeEdgesToFlowEdges(path) {
        let length = path.getPathLength();
        let newEdges = [];
        for (let i = 0; i < length; i++) {
            let edge = this.findIfEdgeExistInList(path.nodes[i], path.nodes[i + 1], this.edgesForwardList);
            if (edge == null) {
                edge = this.findIfEdgeExistInList(path.nodes[i], path.nodes[i + 1], this.edgesBackwardList);
                newEdges.push(edge);
            } else {
                newEdges.push(edge);
            }
        }
        path.edges = newEdges;
    }
    /**
     * Throw error. Can serch for path only from BFS Graph.
     * @param {number} ID 
     * @memberof Graph
     */
    getPath(ID) {
        throw new Error(`Can not search for path. Path must be created from BFS Graph.`);
    }
}

module.exports = FlowGraph;
