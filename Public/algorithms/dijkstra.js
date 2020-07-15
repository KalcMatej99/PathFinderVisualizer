function dijkstra (graph) {
    console.log("DIJKSTRA");
    console.log(graph);
    
    rows = graph.nodes;
    queue = [];
    stateList = [];

    // initialize nodes

    for (var i=0;i<rows.length;i++) {                  // Node of bool visited, bool isStartNode, bool isEndNode, int dist, ArrayList neighbors
        for (var j=0;j<rows[i].length;j++){ 
            if (rows[i][j].isStartNode) {
                rows[i][j].dist = 0;
                rows[i][j].visited = true;
                queue.push(rows[i][j]);
            }
            else {
                rows[i][j].visited = false;
                rows[i][j].dist = Number.MAX_VALUE;
            }
        }
    }
  
    stateList.push(graph);          // array of states
    while(queue!=null){
        var cloneState = graph.clone();
        currNode = queue.shift();
        currNode.visited = true;
        //console.log(currNode);
        if (currNode.isEndNode) break;
        var neighbors = graph.getNeighborsForNode(currNode.row,currNode.column)

        for (var i in neighbors) {
            if (neighbors[i]!=null && !neighbors[i].visited && currNode.dist + 1 < neighbors[i].dist) { // +1 because we have a grid, each block is one currency of movement
                queue.push(neighbors[i]);
                if (currNode.dist==Number.MAX_VALUE) neighbors[i].dist = 1; 
                else neighbors[i].dist = currNode.dist + 1;  
            }
        }
 
        //console.log(neighbors);
        stateList.push(cloneState);
    }
    console.log(stateList);
    return stateList;
};