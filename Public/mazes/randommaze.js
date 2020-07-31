function generateRandomMaze(graph) {

    for (var r = 0; r < graph.numberOfRows; r++) {
        for (var c = 0; c < graph.numberOfColumns; c++) {
            var rand = parseInt(Math.random() * 3, 10);
            var node = graph.getNode(r,c);
            if(rand == 0 && !node.isStartNode && !node.isEndNode && !node.isIntermidNode) {
                graph.setWall(r,c);
            }
        }
    }

    return graph;
}