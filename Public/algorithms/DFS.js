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

    var noPathFound = false;

    /*
    function blabla(currNode) {
        path.push(currNode);
        var cloneState = dfsgraph.clone();
        stateList.push(cloneState);
        neighborTop = dfsgraph.getTopNeighborOfNode(currNode.row, currNode.column);
        neighborRight = dfsgraph.getRightNeighborOfNode(currNode.row, currNode.column);
        neighborBottom = dfsgraph.getBottomNeighborOfNode(currNode.row, currNode.column);
        neighborLeft = dfsgraph.getLeftNeighborOfNode(currNode.row, currNode.column);
        if (neighborTop != null && !neighborTop.visited && currNode.row > 0 && !neighborTop.isWall) {
            
            /* Smo dobili pot? 
            pot = blabla(zgornji sosed)
            return pot
            //...
        }
        if (neighborRight != null && !neighborRight.visited && currNode.column < dfsgraph.numberOfColumns - 1 && !neighborRight.isWall) {
            /* Smo dobili pot? 
            pot = blabla(desni sosed)
            return pot
            //...
        } 
        if (neighborBottom != null && !neighborBottom.visited && currNode.row < dfsgraph.numberOfRows - 1 && !neighborBottom.isWall) {
            
            return pot
            //...
        }
        if (neighborLeft != null && !neighborLeft.visited && currNode.column > 0 && !neighborLeft.isWall) {
            
            return pot
            //...
        }

        return null;
    }*/

    /*while (!currNode.isEndNode && !noPathFound) {
        path.push(currNode);
        var cloneState = dfsgraph.clone();
        stateList.push(cloneState);
        neighborTop = dfsgraph.getTopNeighborOfNode(currNode.row, currNode.column);
        neighborRight = dfsgraph.getRightNeighborOfNode(currNode.row, currNode.column);
        neighborBottom = dfsgraph.getBottomNeighborOfNode(currNode.row, currNode.column);
        neighborLeft = dfsgraph.getLeftNeighborOfNode(currNode.row, currNode.column);
        if (neighborTop != null && !neighborTop.visited && currNode.row > 0 && !neighborTop.isWall) {
            currNode.visited = true;
            currNode = neighborTop;
        } else if (neighborRight != null && !neighborRight.visited && currNode.column < dfsgraph.numberOfColumns - 1 && !neighborRight.isWall) {
            currNode.visited = true;
            currNode = neighborRight;
        } else if (neighborBottom != null && !neighborBottom.visited && currNode.row < dfsgraph.numberOfRows - 1 && !neighborBottom.isWall) {
            currNode.visited = true;
            currNode = neighborBottom;
        } else if (neighborLeft != null && !neighborLeft.visited && currNode.column > 0 && !neighborLeft.isWall) {
            currNode.visited = true;
            currNode = neighborLeft;
        } else {
            noPathFound = true;
        }
    }

    if (!noPathFound) {

        path.push(currNode);                // add endNode to path and set as visited since we ended the loop as we reached it
        dfsgraph.getEndNode().visited = true;
        cloneState = dfsgraph.clone();

        dfsgraph.setPath(path);
        cloneState.setPath(path);
        dfsgraph.pathIsFound = true;
        cloneState.pathIsFound = true;
        stateList.push(cloneState);
    } else {

        dfsgraph.pathIsFound = false;
        cloneState.pathIsFound = false;
        stateList.push(cloneState);
    }*/
    //debugger;
    dfsgraph.setPath(recursion(dfsgraph.getStartNode(),dfsgraph, [], [dfsgraph]));
    dfsgraph.pathIsFound = true;
    debugger;
    stateList.push(dfsgraph);
    return stateList;
};

var stateListGlobal = [];

function recursion (currNode, dfsgraph, path, stateList){
    debugger;
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
    var yo = false;
    //debugger;
    if (neighborTop != null && !neighborTop.visited && currNode.row > 0 && !neighborTop.isWall) {
        if (recursion(neighborTop,dfsgraph,path)!=null) {
            yo = true;
            //path.push(currNode);
            //path = recursion(neighborTop,dfsgraph,path)
            //currNode = neighborTop;
        } else {
            //debugger;
            neighborTop = dfsgraph.getTopNeighborOfNode(currNode.row, currNode.column);
            neighborRight = dfsgraph.getRightNeighborOfNode(currNode.row, currNode.column);
            neighborBottom = dfsgraph.getBottomNeighborOfNode(currNode.row, currNode.column);
            neighborLeft = dfsgraph.getLeftNeighborOfNode(currNode.row, currNode.column);
            yo = false;
            currNode.visited = false;
            path.pop();
            stateList.pop();
        }
    } 
    if (!yo && neighborRight != null && !neighborRight.visited && currNode.column < dfsgraph.numberOfColumns - 1 && !neighborRight.isWall) {
        if (recursion(neighborRight,dfsgraph,path)!=null) {
            yo = true;
            //path = recursion(neighborRight,dfsgraph,path)
            //currNode = neighborRight;
        } else {
            yo = false;
            neighborTop = dfsgraph.getTopNeighborOfNode(currNode.row, currNode.column);
            neighborRight = dfsgraph.getRightNeighborOfNode(currNode.row, currNode.column);
            neighborBottom = dfsgraph.getBottomNeighborOfNode(currNode.row, currNode.column);
            neighborLeft = dfsgraph.getLeftNeighborOfNode(currNode.row, currNode.column);
            currNode.visited = false;
            path.pop();
            stateList.pop();
        }
     } 
     if (!yo && neighborBottom != null && !neighborBottom.visited && currNode.row < dfsgraph.numberOfRows - 1 && !neighborBottom.isWall) {
        if (recursion(neighborBottom,dfsgraph,path)!=null) {
            yo = true;
            //path = recursion(neighborBottom,dfsgraph,path)
            //currNode = neighborBottom;
        } else {
            yo = false;
            neighborTop = dfsgraph.getTopNeighborOfNode(currNode.row, currNode.column);
            neighborRight = dfsgraph.getRightNeighborOfNode(currNode.row, currNode.column);
            neighborBottom = dfsgraph.getBottomNeighborOfNode(currNode.row, currNode.column);
            neighborLeft = dfsgraph.getLeftNeighborOfNode(currNode.row, currNode.column);
            currNode.visited = false;
            path.pop();
            stateList.pop();
        }
    } 
    if (!yo && neighborLeft != null && !neighborLeft.visited && currNode.column > 0 && !neighborLeft.isWall) {
        if (recursion(neighborLeft,dfsgraph,path)!=null) {
            yo = true;
            //path = recursion(neighborLeft,dfsgraph,path)
            //currNode = neighborLeft;
        } else {
            yo = false;
            neighborTop = dfsgraph.getTopNeighborOfNode(currNode.row, currNode.column);
            neighborRight = dfsgraph.getRightNeighborOfNode(currNode.row, currNode.column);
            neighborBottom = dfsgraph.getBottomNeighborOfNode(currNode.row, currNode.column);
            neighborLeft = dfsgraph.getLeftNeighborOfNode(currNode.row, currNode.column);
            currNode.visited = false;
            path.pop();
            stateList.pop();
        }
    }
    if (!yo) return null;
    else return path;
}