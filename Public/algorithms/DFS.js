function DFS(graph) {

    rows = graph.nodes;
    currNode = null ;
    stateList = []; // Here we save the states
    var path = []; // here we save the path

    // initialize nodes

    var dfsgraph = new DFSGraph(graph.numberOfRows, graph.numberOfColumns);

    for (var i = 0; i < rows.length; i++) {                 // similar to Dijkstra initialization, here we initialize the DFS Graph
        for (var j = 0; j < rows[i].length; j++) {
            var newDNode = new DFSNode(i, j, false);
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
    while (!currNode.isEndNode){
        var cloneState = dfsgraph.clone();
        stateList.push(cloneState);
        neighborTop = dfsgraph.getTopNeighborOfNode(currNode.row,currNode.column);
        neighborRight = dfsgraph.getRightNeighborOfNode(currNode.row,currNode.column);
        neighborBottom = dfsgraph.getBottomNeighborOfNode(currNode.row,currNode.column);
        neighborLeft = dfsgraph.getLeftNeighborOfNode(currNode.row,currNode.column);
        if (neighborTop!=null && !neighborTop.visited && currNode.row > 0 ){
            currNode.visited = true;
            currNode = neighborTop;
        } else if (neighborRight!=null && !neighborRight.visited && currNode.column < dfsgraph.numberOfColumns-1 ) {
            currNode.visited = true;
            currNode = neighborRight;
        } else if (neighborBottom!=null && !neighborBottom.visited && currNode.row < dfsgraph.numberOfRows-1 ) {
            currNode.visited = true;
            currNode = neighborBottom;
        } else if (neighborLeft!=null && !neighborLeft.visited && currNode.column > 0 ) {
            currNode.visited = true;
            currNode = neighborLeft;
        }
        path.push(currNode);
    }

    dfsgraph.getEndNode().visited=true; // set endNode as visited since we ended the loop as we reached it
    cloneState = dfsgraph.clone();
    
    dfsgraph.setPath(path);
    cloneState.setPath(path);
    dfsgraph.pathIsFound = true;
    cloneState.pathIsFound = true;
    stateList.push(cloneState);
    //console.log(dfsgraph.pathIsFound);

    return stateList;
};