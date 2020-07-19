function bidirectional (graph){
    rows = graph.nodes;
    queueStart = [];
    queueFinish = [];
    stateList = []; // Here we save the states
    // initialize nodes

    var bgraph = new BidirectionalGraph(graph.numberOfRows, graph.numberOfColumns);

    for (var i = 0; i < rows.length; i++) {                  // Node of bool visited, bool isStartNode, bool isEndNode, int dist, ArrayList neighbors
        for (var j = 0; j < rows[i].length; j++) {

            var newBNode = new BidirectionalNode(i, j);
            newBNode.isWall = rows[i][j].isWall;
            if (rows[i][j].isStartNode) {
                newBNode.setDist(0);
                newBNode.visitedStart = true;
                newBNode.makeStartNode();
                queueStart.push(newBNode);
            } else if (rows[i][j].isEndNode) {
                newBNode.setDist(0);
                newBNode.visitedFinish = true;
                newBNode.makeEndNode();
                queueFinish.push(newBNode);
            } 
            bgraph.setNode(i, j, newBNode);
        }
    }
    console.log(bgraph);
    console.log(bgraph.nodes);
    console.log(queueStart);
    console.log(queueFinish);
    // debugger;
    while (queueStart != null || queueFinish !=null) {
        var cloneState = bgraph.clone();
        stateList.push(cloneState);

        var currNodeStart = queueStart.shift();
        var currNodeFinish = queueFinish.shift();
        
        if(currNodeStart != null && !currNodeStart.isWall){
            currNodeStart.visitedStart = true;
            if (currNodeStart.visitedFinish) break;
            var neighbors = bgraph.getNeighborsForNode(currNodeStart.row, currNodeStart.column)

            for (var i in neighbors) {
                if (neighbors[i] != null && !neighbors[i].visitedStart && currNodeStart.dist + 1 < neighbors[i].dist) { // +1 because we have a grid, each block is one currency of movement
                    neighbors[i].dist = currNodeStart.dist + 1;
                    neighbors[i].previousNode = currNodeStart;
                    queueStart.push(neighbors[i]);
                }
            }
        } 

        if(currNodeFinish != null && !currNodeFinish.isWall){
            currNodeFinish.visited = true;
            if (currNodeFinish.visitedStart) break;
            var neighbors = bgraph.getNeighborsForNode(currNodeFinish.row, currNodeFinish.column)

            for (var i in neighbors) {
                if (neighbors[i] != null && !neighbors[i].visitedFinish && currNodeFinish.dist + 1 < neighbors[i].dist) { // +1 because we have a grid, each block is one currency of movement
                    neighbors[i].dist = currNodeFinish.dist + 1;
                    neighbors[i].previousNode = currNodeFinish;
                    queueFinish.push(neighbors[i]);
                }
            }
        }  
    }
    console.log("YO");
    
    bgraph.pathIsFound = true;
    var cloneState = bgraph.clone();
    stateList.push(cloneState);
    
    return stateList;
}