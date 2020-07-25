function findDifferenceBetweenStates(state1, state2) {
    var differences = [];

    for (var i = 0; i < state1.numberOfRows; i++) {
        for (var j = 0; j < state1.numberOfColumns; j++) {
            if (!state1.getNode(i, j).isEqual(state2.getNode(i, j)))
                differences.push(state2.getNode(i, j));
        }
    }

    return differences;
}

function clearAllTimeouts() {
    var highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }
    
    setAnimationIsExecuting(false);
}

function getIdFor(r, c) {
    return 'node-' + r + '-' + c;
}

function getRowAndColumnFromId(id) {
    return [id.split("-")[1], id.split("-")[2]];
}

var isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

function deviceIsPhone() {
    return isMobile.any() != null;
}

function findFrePositionInCenter(graph) {
    return this.findFrePositionInPosition(graph, parseInt(nRows/2, 10), parseInt(nColumns/2, 10));
}

function findFrePositionInPosition(graph, row, column) {
    var rows = graph.nodes;

    var dgraph = new DijkstraGraph(graph.numberOfRows, graph.numberOfColumns);

    for (var i = 0; i < rows.length; i++) {                  // Node of bool visited, bool isStartNode, bool isEndNode, int dist, ArrayList neighbors
        for (var j = 0; j < rows[i].length; j++) {
            //Nov node: DijkstraNode ki ima lastnosti node: GridNode 

            var newDNode = new DijkstraNode(i, j, false);
            newDNode.isWall = rows[i][j].isWall;
            if (rows[i][j].isStartNode) {
                newDNode.visited = true;
                newDNode.makeStartNode();
            } else if (rows[i][j].isEndNode) {
                newDNode.makeEndNode();
            }
            dgraph.setNode(i, j, newDNode);
        }
    }

    var queue = [dgraph.getNode(row, column)];

    while(queue != null && queue != []) {
        var elem = queue.shift();

        if(!elem.visited && !elem.isWall && !elem.isStartNode && !elem.isEndNode && !elem.isIntermidNode) return elem;

        elem.visited = true;
        
        var neighbors = dgraph.getNearNodes(elem.row, elem.column);
        for(var i in neighbors) {
            if(neighbors[i] != null && !neighbors[i].visited) {
                queue.push(neighbors[i]);
            }
        }

    }

    return null;
}
