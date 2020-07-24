function prim (graph){
    rows = graph.nodes;
    var visitedSet = [];
    stateList = []; // Here we save the states
    
    var pgraph = new PrimGraph(graph.numberOfRows, graph.numberOfColumns);

    for (var i = 0; i < rows.length; i++) {                  // Node of bool visited, bool isStartNode, bool isEndNode, int dist, ArrayList neighbors
        for (var j = 0; j < rows[i].length; j++) {
            var newPNode = new PrimNode(i, j);
            newPNode.isWall = rows[i][j].isWall;
            if (rows[i][j].isStartNode) {
                newPNode.setDist(0);
                newPNode.visited = true;
                visitedSet.push(newPNode);
                newPNode.makeStartNode();
            } else if (rows[i][j].isEndNode) {
                newPNode.makeEndNode();
            }
            pgraph.setNode(i, j, newPNode);
        }
    }

    //choose arbitrary node, add to visited
    //find minimum edge to unvisited node, add endNode to visited
    //repeat: find minimum edge from set of visited nodes

    var yo = [];
    while (visitedSet!=null){
        var cloneState = pgraph.clone();
        stateList.push(cloneState);
        var min = Number.MAX_VALUE;
        var ix = -1;
        var minNode = null;
        var sourceNode = null;
        for (var i=0;i<visitedSet.length;i++){  // all possible nodes
            var currNode = visitedSet[i];
            var neighbors = pgraph.getNeighborsForNode(currNode.row, currNode.column);

            for (var j in neighbors) {
                if (neighbors[j] != null && !neighbors[j].visited && currNode.dist + 1 < min) { // +1 because we have a grid, each block is one currency of movement
                    min = currNode.dist+1;
                    ix = j;
                    minNode = neighbors[j];
                    sourceNode = currNode;
                }
            }
            if (ix==-1) {
                visitedSet.splice(i,1);   // ix hasn't changed -> all neighboring nodes of currNode are visited or walls, we won't ever continue from this node
            }  
        }
        //check?
        if (ix==-1){
            debugger;   // ix hasn't changed -> all remaining nodes are visited or walls
            break;
        } else {
            if (yo.length==943) debugger;
            yo.push(minNode);
            minNode.visited = true;
            minNode.dist = sourceNode.dist+1;
            visitedSet.push(minNode);
        }
        
    }
    debugger;
    pgraph.pathIsFound = true;
    var cloneState = pgraph.clone();
    stateList.push(cloneState);
    return stateList;
}