function dijkstra(graph) {

    rows = graph.nodes;
    queue = [];
    stateList = []; // Here we save the states

    // initialize nodes

    var dgraph = new DijkstraGraph(graph.numberOfRows, graph.numberOfColumns);

    for (var i = 0; i < rows.length; i++) {                  // Node of bool visited, bool isStartNode, bool isEndNode, int dist, ArrayList neighbors
        for (var j = 0; j < rows[i].length; j++) {
            //Nov node: DijkstraNode ki ima lastnosti node: GridNode 

            var newDNode = new DijkstraNode(i, j, false);
            if (rows[i][j].isStartNode) {
                newDNode.setDist(0);
                newDNode.visited = true;
                newDNode.makeStartNode();
                queue.push(newDNode);
            } else if (rows[i][j].isEndNode) {
                newDNode.makeEndNode();
            } 
            dgraph.setNode(i, j, newDNode);
        }
    }

    while (queue != null) {
        var cloneState = dgraph.clone();
        stateList.push(cloneState);

        var currNode = queue.shift();
        currNode.visited = true;
        if (currNode.isEndNode) break;
        var neighbors = dgraph.getNeighborsForNode(currNode.row, currNode.column)

        for (var i in neighbors) {
            if (neighbors[i] != null && !neighbors[i].visited && currNode.dist + 1 < neighbors[i].dist) { // +1 because we have a grid, each block is one currency of movement
                neighbors[i].dist = currNode.dist + 1;
                neighbors[i].previousNode = currNode;
                queue.push(neighbors[i]);

            }
        }

        //console.log(neighbors);
    }

    cloneState = dgraph.clone();
    stateList.push(cloneState);

    console.log(stateList);
    console.log(dgraph.path());   // array of used nodes from start <-> finish (in reverse)

    return stateList;
};