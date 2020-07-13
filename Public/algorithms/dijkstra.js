function dijkstra (nodes) {
    queue = [];
    for (var i in nodes) {                  // Node of bool visited, bool start, bool finish, int dist, ArrayList neighbors
        if (nodes[i].start) {
            nodes.dist = 0;
            nodes.visited = true;
            queue.push(nodes[i]);
        }
        else nodes.dist = inf;
    }

    while(queue!=null){
        currNode = queue.pop;
        currNode.visited = true;
        if (currNode.finish) break;
        for (var i in currNode.neighbors) {
            if (!currNode.neighbors[i].visited && currNode.dist + 1 < currNode.neighbors[i].dist) { // +1 because we have a grid, each block is one currency of movement
                queue.push(currNode.neighbors[i]);
                currNode.neighbors[i].dist = currNode.dist + 1;  
            }
        }
    }
    return;
};