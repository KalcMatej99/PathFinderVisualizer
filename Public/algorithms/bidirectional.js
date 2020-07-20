function bidirectional(graph) {
    rows = graph.nodes;
    queueStart = [];
    queueFinish = [];   // separate queue to visualize progress both from start and nodes 
    stateList = []; // Here we save the states

    var bgraph = new BidirectionalGraph(graph.numberOfRows, graph.numberOfColumns);

    for (var i = 0; i < rows.length; i++) {                  // Node of bool visited, bool isStartNode, bool isEndNode, int dist, ArrayList neighbors
        for (var j = 0; j < rows[i].length; j++) {
            var newBNode = new BidirectionalNode(i, j);
            newBNode.isWall = rows[i][j].isWall;
            if (rows[i][j].isStartNode) {
                newBNode.setDistStart(0);
                newBNode.visitedStart = true;
                newBNode.makeStartNode();
                queueStart.push(newBNode);
            } else if (rows[i][j].isEndNode) {
                newBNode.visitedFinish = true;
                newBNode.makeEndNode();
                newBNode.setDistFinish(0);
                queueFinish.push(newBNode);
            }
            bgraph.setNode(i, j, newBNode);
        }
    }

    var middle1 = null;
    var middle2 = null;

    while ((queueStart != null && queueStart.length > 0 || queueFinish != null && queueFinish.length > 0) && middle1 == null && middle2 == null) {
        var cloneState = bgraph.clone();
        stateList.push(cloneState);
        var currNodeStart = queueStart.shift();
        var currNodeFinish = queueFinish.shift();

        if (middle1 == null && middle2 == null && currNodeStart != null && !currNodeStart.isWall) {
            currNodeStart.visitedStart = true;
            var neighbors = bgraph.getNeighborsForNode(currNodeStart.row, currNodeStart.column)

            for (var i in neighbors) {
                if (middle1 == null && middle2 == null && neighbors[i] != null && !neighbors[i].visitedStart && currNodeStart.distStart + 1 < neighbors[i].distStart) { // +1 because we have a grid, each block is one currency of movement
                    if (neighbors[i].visitedFinish) {       // we already flagged this from the other side
                        middle1 = currNodeStart;
                        middle2 = neighbors[i];

                        break;
                    } else if (neighbors[i].previousNode == null) {
                        neighbors[i].distStart = currNodeStart.distStart + 1;
                        neighbors[i].previousNode = currNodeStart;
                        queueStart.push(neighbors[i]);
                    }
                }
            }
        }

        //var cloneState = bgraph.clone();              when should we save states? after neighbors of startNode, or after both neighbors?
        //stateList.push(cloneState);

        if (middle1 == null && middle2 == null && currNodeFinish != null && !currNodeFinish.isWall) {
            currNodeFinish.visitedFinish = true;
            /*if (currNodeFinish.visitedStart) {
                break;
            }*/
            var neighbors = bgraph.getNeighborsForNode(currNodeFinish.row, currNodeFinish.column)

            for (var i in neighbors) {
                if (middle1 == null && middle2 == null && neighbors[i] != null && !neighbors[i].visitedFinish && currNodeFinish.distFinish + 1 < neighbors[i].distFinish) { // +1 because we have a grid, each block is one currency of movement
                    if (neighbors[i].visitedStart) {        // we already flagged this from the other side
                        middle1 = neighbors[i];
                        middle2 = currNodeFinish;
                        break;
                    } else if (neighbors[i].previousNode == null) {
                        neighbors[i].distFinish = currNodeFinish.distFinish + 1;
                        neighbors[i].previousNode = currNodeFinish;
                        queueFinish.push(neighbors[i]);
                    }
                }
            }
        }
    }

    bgraph.pathIsFound = true;
    var cloneState = bgraph.clone();
    cloneState.setMiddle1(middle1);
    cloneState.setMiddle2(middle2);
    stateList.push(cloneState);

    return stateList;
}