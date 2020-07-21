function DFS(graph) {

    rows = graph.nodes;
    currNode = null;
    stateList = []; // Here we save the states
    var path = []; // here we save the path

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

    dfsgraph.setPath(recursion(dfsgraph.getStartNode(),dfsgraph, [], []));
    dfsgraph.pathIsFound = true;
    stateListGlobal.push(dfsgraph);
    return stateListGlobal;
};

var stateListGlobal = [];

function recursion (currNode, dfsgraph, path, stateList){
    path.push(currNode);
    stateList.push(dfsgraph.clone());
    currNode.visited = true;
    if (currNode.isEndNode) {
        stateListGlobal = stateList;
        return path;
    }
    neighborTop = dfsgraph.getTopNeighborOfNode(currNode.row, currNode.column);
    neighborRight = dfsgraph.getRightNeighborOfNode(currNode.row, currNode.column);
    neighborBottom = dfsgraph.getBottomNeighborOfNode(currNode.row, currNode.column);
    neighborLeft = dfsgraph.getLeftNeighborOfNode(currNode.row, currNode.column);
    var success = false;
    if (neighborTop != null && !neighborTop.visited && currNode.row > 0 && !neighborTop.isWall) {
        if (recursion(neighborTop,dfsgraph,path, stateList)!=null) {
            success = true;
        } else {
            neighborTop = dfsgraph.getTopNeighborOfNode(currNode.row, currNode.column);             // here because it worked?
            neighborRight = dfsgraph.getRightNeighborOfNode(currNode.row, currNode.column);
            neighborBottom = dfsgraph.getBottomNeighborOfNode(currNode.row, currNode.column);
            neighborLeft = dfsgraph.getLeftNeighborOfNode(currNode.row, currNode.column);
            success = false;                                                                             // option didn't succed, we remove the visited attribute, the last entry in path and last state in stateList
            currNode.visited = false;                                                                    // success set to false so algorithm/recursion proceeds to search in other directions
            path.pop();
            stateList.pop();
        }
    } 
    if (!success && neighborRight != null && !neighborRight.visited && currNode.column < dfsgraph.numberOfColumns - 1 && !neighborRight.isWall) {
        if (recursion(neighborRight,dfsgraph,path, stateList)!=null) {
            success = true;
        } else {
            success = false;
            neighborTop = dfsgraph.getTopNeighborOfNode(currNode.row, currNode.column);
            neighborRight = dfsgraph.getRightNeighborOfNode(currNode.row, currNode.column);
            neighborBottom = dfsgraph.getBottomNeighborOfNode(currNode.row, currNode.column);
            neighborLeft = dfsgraph.getLeftNeighborOfNode(currNode.row, currNode.column);
            currNode.visited = false;
            path.pop();
            stateList.pop();
        }
     } 
     if (!success && neighborBottom != null && !neighborBottom.visited && currNode.row < dfsgraph.numberOfRows - 1 && !neighborBottom.isWall) {
        if (recursion(neighborBottom,dfsgraph,path, stateList)!=null) {
            success = true;
        } else {
            success = false;
            neighborTop = dfsgraph.getTopNeighborOfNode(currNode.row, currNode.column);
            neighborRight = dfsgraph.getRightNeighborOfNode(currNode.row, currNode.column);
            neighborBottom = dfsgraph.getBottomNeighborOfNode(currNode.row, currNode.column);
            neighborLeft = dfsgraph.getLeftNeighborOfNode(currNode.row, currNode.column);
            currNode.visited = false;
            path.pop();
            stateList.pop();
        }
    } 
    if (!success && neighborLeft != null && !neighborLeft.visited && currNode.column > 0 && !neighborLeft.isWall) {
        if (recursion(neighborLeft,dfsgraph,path, stateList)!=null) {
            success = true;
        } else {
            success = false;
            neighborTop = dfsgraph.getTopNeighborOfNode(currNode.row, currNode.column);
            neighborRight = dfsgraph.getRightNeighborOfNode(currNode.row, currNode.column);
            neighborBottom = dfsgraph.getBottomNeighborOfNode(currNode.row, currNode.column);
            neighborLeft = dfsgraph.getLeftNeighborOfNode(currNode.row, currNode.column);
            currNode.visited = false;
            path.pop();
            stateList.pop();
        }
    }
    if (!success) return null;
    else return path;
}