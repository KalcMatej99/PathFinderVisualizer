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
            newDNode.isWall = rows[i][j].isWall;
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

    var isFoundPath = false;
    while (queue != null && queue.length > 0) {

        var cloneState = dgraph.clone();
        stateList.push(cloneState);

        var currNode = queue.shift();
        if (currNode == null || currNode.isWall) {
            continue;
        }

        currNode.visited = true;
        if (currNode.isEndNode) {
            isFoundPath = true;
            break;
        }

        var neighbors = dgraph.getNeighborsForNode(currNode.row, currNode.column)

        for (var i in neighbors) {
            if (neighbors[i] != null && !neighbors[i].visited && currNode.dist + 1 < neighbors[i].dist) { // +1 because we have a grid, each block is one currency of movement
                neighbors[i].dist = currNode.dist + 1;
                neighbors[i].previousNode = currNode;
                queue.push(neighbors[i]);

            }
        }


    }


    dgraph.pathIsFound = isFoundPath;
    var cloneState = dgraph.clone();
    stateList.push(cloneState);

    return stateList;
};