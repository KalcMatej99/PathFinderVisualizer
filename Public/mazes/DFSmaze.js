
function generateDFSMaze(graph) {

    function recursionDFSMaze(r, c) {
        var randTurn = generateRandomTurn();
        
        for (var i = 0; i < 4; i++) {
            switch (randTurn[i]) {
                case 0:
                    if (r - 2 >= 0) {
                        var oneUp = graph.getNode(r - 1, c);
                        var twoUp = graph.getNode(r - 2, c);

                        if (!oneUp.isStartNode && !oneUp.isEndNode && !oneUp.isWall && !oneUp.isIntermidNode && !twoUp.isStartNode &&
                            !twoUp.isEndNode && !twoUp.isWall && !twoUp.isIntermidNode) {
                            graph.setWall(r - 1, c);
                            graph.setWall(r - 2, c);
                            graph = recursionDFSMaze(r - 2, c);
                        }
                    }
                    break;
                case 1:
                    if (c + 2 < graph.numberOfColumns) {
                        var oneUp = graph.getNode(r, c + 1);
                        var twoUp = graph.getNode(r, c + 2);

                        if (!oneUp.isStartNode && !oneUp.isEndNode && !oneUp.isWall && !oneUp.isIntermidNode && !twoUp.isStartNode &&
                            !twoUp.isEndNode && !twoUp.isWall && !twoUp.isIntermidNode) {
                            graph.setWall(r, c + 1);
                            graph.setWall(r, c + 2);
                            graph = recursionDFSMaze(r, c + 2);
                        }
                    } break;
                case 2:
                    if (r + 2 < graph.numberOfRows) {
                        var oneUp = graph.getNode(r + 1, c);
                        var twoUp = graph.getNode(r + 2, c);

                        if (!oneUp.isStartNode && !oneUp.isEndNode && !oneUp.isWall && !oneUp.isIntermidNode && !twoUp.isStartNode &&
                            !twoUp.isEndNode && !twoUp.isWall && !twoUp.isIntermidNode) {
                            graph.setWall(r + 1, c);
                            graph.setWall(r + 2, c);
                            graph = recursionDFSMaze(r + 2, c);
                        }
                    } break;
                case 3:
                    if (c - 2 >= 0) {
                        var oneUp = graph.getNode(r, c - 1);
                        var twoUp = graph.getNode(r, c - 2);

                        if (!oneUp.isStartNode && !oneUp.isEndNode && !oneUp.isWall && !oneUp.isIntermidNode && !twoUp.isStartNode &&
                            !twoUp.isEndNode && !twoUp.isWall && !twoUp.isIntermidNode) {
                            graph.setWall(r, c - 1);
                            graph.setWall(r, c - 2);
                            graph = recursionDFSMaze(r, c - 2);
                        }
                    } break;
                default: break;
            }
        }

        return graph;
    }
    
    return recursionDFSMaze(0, 0);
}

function generateRandomTurn() {
    return shuffle([0, 1, 2, 3]);
}

