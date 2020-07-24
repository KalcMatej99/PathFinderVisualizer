class GridGraph {

    //Construct empty grid graph of size rows * columns
    constructor(numberOfRows, numberOfColumns) {
        this.nodes = Array.from({ length: numberOfRows });
        for (var row = 0; row < numberOfRows; row++) {
            this.nodes[row] = Array.from({ length: numberOfColumns });
        }
        this.numberOfRows = numberOfRows;
        this.numberOfColumns = numberOfColumns;
        this.pathIsFound = false;
    }

    //Get node at position (r, c)
    getNode(r, c) {
        return this.nodes[r][c];
    }

    //Set node at position (r, c)
    setNode(r, c, node) {
        this.nodes[r][c] = node;
    }

    setWall(r, c) {
        this.nodes[r][c].isWall = true;
    }

    unsetWall(r, c) {
        this.nodes[r][c].isWall = false;
    }

    getWalls() {
        var walls = [];
        for (var r = 0; r < numberOfRows; r++) {
            for (var c = 0; c < numberOfColumns; c++) {
                if (this.getNode(r, c).isWall) {
                    walls.push(this.getNode(r, c));
                }
            }
        }
        return walls;
    }

    //Get starting node in grid graph
    getStartNode() {
        for (var row = 0; row < this.numberOfRows; row++) {
            for (var column = 0; column < this.numberOfColumns; column++) {
                if (this.nodes[row][column] != null && this.nodes[row][column].isStartNode) {
                    return this.nodes[row][column];
                }
            }
        }
        return null;
    }

    //Set starting node in grid graph
    setStartNode(row, column) {
        var currentStartNode = this.getStartNode();
        if (currentStartNode != null) currentStartNode.unmakeStartNode();
        this.getNode(row, column).makeStartNode();
    }

    //Remove intermind point
    removeIntermidNode(row, column) {
        this.getNode(row, column).unmakeIntermidNode();
    }

    //Set intermind point
    setIntermindNode(row, column, priority) {
        this.getNode(row, column).makeIntermidNode(priority);
    }

    //Set intermind point
    getIntermindNodes() {
        var nodes = [];
        for (var row = 0; row < this.numberOfRows; row++) {
            for (var column = 0; column < this.numberOfColumns; column++) {
                if (this.nodes[row][column] != null && this.nodes[row][column].isIntermidNode) {
                    nodes.push(this.getNode(row, column));
                }
            }
        }
        return nodes;
    }

    getNumberOfIntermidNodes() {
        return this.getIntermindNodes().length;
    }


    //get end node in grid graph
    getEndNode() {
        for (var row = 0; row < this.numberOfRows; row++) {
            for (var column = 0; column < this.numberOfColumns; column++) {
                if (this.nodes[row][column] != null && this.nodes[row][column].isEndNode) {
                    return this.nodes[row][column];
                }
            }
        }
        return null;
    }

    //Set end node in grid graph
    setEndNode(row, column) {
        var currentEndNode = this.getEndNode();
        if (currentEndNode != null) currentEndNode.unmakeEndNode();
        this.getNode(row, column).makeEndNode();
    }

    // Get top neighbor for node at position (r, c)
    getTopNeighborOfNode(r, c) {
        if (r > 0)
            return this.getNode(r - 1, c).isWall ? null : this.getNode(r - 1, c);
        return null;
    }

     // Get top neighbor for node at position (r, c)
     getTopNode(r, c) {
        if (r > 0)
            return this.getNode(r - 1, c);
        return null;
    }

    // Get bottom neighbor for node at position (r, c)
    getBottomNeighborOfNode(r, c) {
        if (r < this.numberOfRows - 1)
            return this.getNode(r + 1, c).isWall ? null : this.getNode(r + 1, c);
        return null;
    }

    // Get bottom neighbor for node at position (r, c)
    getBottomNode(r, c) {
        if (r < this.numberOfRows - 1)
            return this.getNode(r + 1, c);
        return null;
    }

    // Get right neighbor for node at position (r, c)
    getRightNeighborOfNode(r, c) {
        if (c < this.numberOfColumns - 1)
            return this.getNode(r, c + 1).isWall ? null : this.getNode(r, c + 1);
        return null;
    }

    // Get right neighbor for node at position (r, c)
    getRightNode(r, c) {
        if (c < this.numberOfColumns - 1)
            return this.getNode(r, c + 1);
        return null;
    }

    // Get left neighbor for node at position (r, c)
    getLeftNeighborOfNode(r, c) {
        if (c > 0)
            return this.getNode(r, c - 1).isWall ? null : this.getNode(r, c - 1);
        return null;
    }

    // Get left neighbor for node at position (r, c)
    getLeftNode(r, c) {
        if (c > 0)
            return this.getNode(r, c - 1);
        return null;
    }

    // Get neighbors for node at position (r, c); TOP, RIGHT, BOTTOM, LEFT
    getNeighborsForNode(r, c) {
        return [this.getTopNeighborOfNode(r, c), this.getRightNeighborOfNode(r, c), this.getBottomNeighborOfNode(r, c), this.getLeftNeighborOfNode(r, c)];
    }

    getNearNodes(r, c) {
        return [this.getTopNode(r, c), this.getRightNode(r, c), this.getBottomNode(r, c), this.getLeftNode(r, c)];
    }

    clean() {
        this.pathIsFound = false;
        this.nodes = Array.from({ length: numberOfRows });
        for (var row = 0; row < numberOfRows; row++) {
            this.nodes[row] = Array.from({ length: numberOfColumns });
        }
    }

    path() {
        return [];
    }

    isPathFound() {
        if (this.path() != [] && this.path().length > 0) return true;
        return false;
    }

    clone() {
        var tmp = new GridGraph(this.numberOfRows, this.numberOfColumns)

        for (var i = 0; i < this.numberOfRows; i++) {
            for (var j = 0; j < this.numberOfColumns; j++) {

                var newDNode = new GridNode(i, j);

                if (this.nodes[i][j].isStartNode)
                    newDNode.makeStartNode();
                if (this.nodes[i][j].isEndNode)
                    newDNode.makeEndNode();
                if (this.nodes[i][j].isWall)
                    newDNode.isWall = true;
                tmp.setNode(i, j, newDNode);

            }
        }
        return tmp;
    }

    isNodeInPath(r, c) {
        var path = this.path();
        for(var i = 0; path != null && i < path.length; i++) {
            if(path[i].row == r && path[i].column == c) return true;
        }
        return false;
    }

    generateIntermidGraphs() {
        var graphs = [];
        var intermidNodes = this.getIntermindNodes();
        var numIntermidNodes = intermidNodes.length;
        for(var i = 0; i <= numIntermidNodes; i++) {
            var first = this.clone();
            if(i > 0) {
                first.setStartNode(intermidNodes[i - 1].row, intermidNodes[i - 1].column);
            }

            if(i < numIntermidNodes) {
                first.setEndNode(intermidNodes[i].row, intermidNodes[i].column);
            }

            graphs.push(first);

        }
        return graphs;
    }

    combineWithGraph(graph) {
        console.log(this);
        var newGraph = this.clone();
        console.log(newGraph);

        var endNodeOfSecondGraph = graph.getEndNode();
        newGraph.setEndNode(endNodeOfSecondGraph.row, endNodeOfSecondGraph.column);

        for(var r = 0; r < graph.numberOfRows; r++) {
            for(var c = 0; c < graph.numberOfColumns; c++) {

                var nodeInSecondGraph = graph.getNode(r,c);
                if(nodeInSecondGraph.visited) newGraph.getNode(r,c).visited = true;

            }
        }
        
        return newGraph;
    }
}

class DijkstraGraph extends GridGraph {
    clone() {
        var tmp = new DijkstraGraph(this.numberOfRows, this.numberOfColumns)
        tmp.pathIsFound = this.pathIsFound;
        for (var i = 0; i < this.numberOfRows; i++) {
            for (var j = 0; j < this.numberOfColumns; j++) {
                var visited = this.nodes[i][j].visited;
                var previous = this.nodes[i][j].previousNode;
                var dist = this.nodes[i][j].dist;
                var wall = this.nodes[i][j].isWall;

                var newDNode = new DijkstraNode(i, j, visited);
                if(previous != null) newDNode.setPreviousNode(previous);
                newDNode.setDist(dist);
                if (wall) newDNode.isWall = true;

                if (this.nodes[i][j].isStartNode)
                    newDNode.makeStartNode();
                if (this.nodes[i][j].isEndNode)
                    newDNode.makeEndNode();
                tmp.setNode(i, j, newDNode);

            }
            console.log(tmp);
        }
        return tmp;
    }

    path() {
        var endNode = this.getEndNode();
        var pathArray = [];
        if (endNode == null) return null;
        else {
            while (endNode != null) {
                pathArray.push(endNode);
                endNode = endNode.previousNode;
            }
            return pathArray;
        }
    }

    combineWithGraph(graph) {
        console.log(this);
        var newGraph = super.combineWithGraph(graph);

        console.log(newGraph);
        for(var r = 0; r < graph.numberOfRows; r++) {
            for(var c = 0; c < graph.numberOfColumns; c++) {

                var nodeInSecondGraph = graph.getNode(r,c);
                if(nodeInSecondGraph.previousNode != null) newGraph.getNode(r,c).previousNode = nodeInSecondGraph.previousNode;

            }
        }

        console.log(newGraph);


        return newGraph;
    }

    isPathFound() {
        var endNode = this.getEndNode();
        while (endNode != null && !endNode.isStartNode) {
            endNode = endNode.previousNode;
        }
        return endNode != null && endNode.isStartNode;
    }
}

class DFSGraph extends DijkstraGraph {
    pathAtt = [];               // pathAtt because we can't have an attribute and function with identical names
    setPath(path) {
        this.pathAtt = path;
    }

    path() {
        return this.pathAtt;
    }

    clone() {
        var tmp = new DFSGraph(this.numberOfRows, this.numberOfColumns)
        tmp.pathIsFound = this.pathIsFound;
        for (var i = 0; i < this.numberOfRows; i++) {
            for (var j = 0; j < this.numberOfColumns; j++) {
                var visited = this.nodes[i][j].visited;
                var wall = this.nodes[i][j].isWall;
                var newDNode = new DFSNode(i, j, visited);

                if (wall) newDNode.isWall = true;
                if (this.nodes[i][j].isStartNode)
                    newDNode.makeStartNode();
                if (this.nodes[i][j].isEndNode)
                    newDNode.makeEndNode();
                tmp.setNode(i, j, newDNode);

            }
        }
        return tmp;
    }
}

class BidirectionalGraph extends GridGraph {
    constructor(numberOfRows, numberOfColumns) {
        super(numberOfRows, numberOfColumns);
        this.middle1 = null;
        this.middle2 = null;
    }

    path() {
        var pathArray = [];
        var middle1 = this.getMiddle1();
        var middle2 = this.getMiddle2();
        while (middle1 != null) {
            pathArray.push(middle1);
            middle1 = middle1.previousNode;
        }

        pathArray.reverse();
        while (middle2 != null) {
            pathArray.push(middle2);
            middle2 = middle2.previousNode;
        }

        return pathArray;
    }

    getMiddle1() {
        return this.middle1;
    }

    getMiddle2() {
        return this.middle2;
    }

    setMiddle1(middle1) {
        this.middle1 = middle1;
    }

    setMiddle2(middle2) {
        this.middle2 = middle2;
    }

    clone() {
        var tmp = new BidirectionalGraph(this.numberOfRows, this.numberOfColumns)
        tmp.pathIsFound = this.pathIsFound;
        for (var i = 0; i < this.numberOfRows; i++) {
            for (var j = 0; j < this.numberOfColumns; j++) {
                var visitedStart = this.nodes[i][j].visitedStart;
                var visitedFinish = this.nodes[i][j].visitedFinish;
                var previous = this.nodes[i][j].previousNode;
                var distStart = this.nodes[i][j].distStart;
                var distFinish = this.nodes[i][j].distFinish;
                var wall = this.nodes[i][j].isWall;

                var newBNode = new BidirectionalNode(i, j);
                if (visitedStart) newBNode.setVisitedStart(visitedStart);
                if (visitedFinish) newBNode.setVisitedFinish(visitedFinish);
                newBNode.setPreviousNode(previous);
                newBNode.setDistStart(distStart);
                newBNode.setDistFinish(distFinish);
                if (wall) newBNode.isWall = true;

                if (this.nodes[i][j].isStartNode)
                    newBNode.makeStartNode();
                if (this.nodes[i][j].isEndNode)
                    newBNode.makeEndNode();
                tmp.setNode(i, j, newBNode);

            }
        }
        return tmp;
    }
}

class PrimGraph extends GridGraph {
    clone() {
        var tmp = new PrimGraph(this.numberOfRows, this.numberOfColumns)
        tmp.pathIsFound = this.pathIsFound;
        for (var i = 0; i < this.numberOfRows; i++) {
            for (var j = 0; j < this.numberOfColumns; j++) {
                var visited = this.nodes[i][j].visited;
                var dist = this.nodes[i][j].dist;
                var wall = this.nodes[i][j].isWall;

                var newPNode = new PrimNode(i, j, visited);
                newPNode.setDist(dist);
                if (wall) newPNode.isWall = true;

                if (this.nodes[i][j].isStartNode)
                    newPNode.makeStartNode();
                if (this.nodes[i][j].isEndNode)
                    newPNode.makeEndNode();
                tmp.setNode(i, j, newPNode);

            }
            //console.log(tmp);
        }
        return tmp;
    }
    path (){
        return [];
    }
}