
var stateList = [];

function DFS(graph) {

    rows = graph.nodes;
    currNode = null;
    stateList = [];

    // initialize nodes

    var dfsgraph = new DFSGraph(graph.numberOfRows, graph.numberOfColumns);

    for (var i = 0; i < rows.length; i++) {                 // similar to Dijkstra initialization, here we initialize the DFS Graph
        for (var j = 0; j < rows[i].length; j++) {
            var newDNode = new DFSNode(i, j, false);
            newDNode.isWall = rows[i][j].isWall;
            if (rows[i][j].isStartNode) {
                newDNode.visited = true;
                newDNode.makeStartNode();
                currNode = newDNode;
            } else if (rows[i][j].isEndNode) {
                newDNode.makeEndNode();
            }
            dfsgraph.setNode(i, j, newDNode);
        }
    }


    //DFS: Go up until you can't or it is already visited, same for right, down and left. Repeat until endnode found.
    // if the node is a wall, we simply skip it
    recursion(dfsgraph.getStartNode(), dfsgraph, [], []);
    stateList[stateList.length - 1].pathIsFound = true;
    return stateList;
};


function recursion(currNode, dfsgraph) {
    dfsgraph.getNode(currNode.row, currNode.column).visited = true;
    stateList.push(dfsgraph.clone());
    if (dfsgraph.getNode(currNode.row, currNode.column).isEndNode) {
        return true;
    }
    var neighborTop = dfsgraph.getTopNeighborOfNode(currNode.row, currNode.column);
    var neighborRight = dfsgraph.getRightNeighborOfNode(currNode.row, currNode.column);
    var neighborBottom = dfsgraph.getBottomNeighborOfNode(currNode.row, currNode.column);
    var neighborLeft = dfsgraph.getLeftNeighborOfNode(currNode.row, currNode.column);

    if (neighborTop != null && !neighborTop.visited && currNode.row > 0 && !neighborTop.isWall) {
        dfsgraph.getNode(neighborTop.row, neighborTop.column).previousNode = dfsgraph.getNode(currNode.row, currNode.column);
        if (recursion(neighborTop, dfsgraph)) {
            return true;
        }
        dfsgraph.getNode(neighborTop.row, neighborTop.column).previousNode = null;
    }

    if (neighborRight != null && !neighborRight.visited && currNode.column < dfsgraph.numberOfColumns - 1 && !neighborRight.isWall) {
        dfsgraph.getNode(neighborRight.row, neighborRight.column).previousNode = dfsgraph.getNode(currNode.row, currNode.column);
        if (recursion(neighborRight, dfsgraph)) {
            return true;
        }
        dfsgraph.getNode(neighborRight.row, neighborRight.column).previousNode = null;
    }

    if (neighborBottom != null && !neighborBottom.visited && currNode.row < dfsgraph.numberOfRows - 1 && !neighborBottom.isWall) {
        dfsgraph.getNode(neighborBottom.row, neighborBottom.column).previousNode = dfsgraph.getNode(currNode.row, currNode.column);
        if (recursion(neighborBottom, dfsgraph)) {
            return true;
        }
        dfsgraph.getNode(neighborBottom.row, neighborBottom.column).previousNode = null;
    }

    if (neighborLeft != null && !neighborLeft.visited && currNode.column > 0 && !neighborLeft.isWall) {
        dfsgraph.getNode(neighborLeft.row, neighborLeft.column).previousNode = dfsgraph.getNode(currNode.row, currNode.column);
        if (recursion(neighborLeft, dfsgraph)) {
            return true;
        }
        dfsgraph.getNode(neighborLeft.row, neighborLeft.column).previousNode = null;
    }

    dfsgraph.getNode(currNode.row, currNode.column).visited = false;
    return false;
}