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

    //Construct grid graph from nodes: [[]]
    /*constructor(nodes) {
        this.nodes = nodes;
        this.numberOfRows = nodes.length;
        this.numberOfColumns = nodes[0].length;
    }*/

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

    // Get bottom neighbor for node at position (r, c)
    getBottomNeighborOfNode(r, c) {
        if (r < this.numberOfRows - 1)
            return this.getNode(r + 1, c).isWall ? null : this.getNode(r + 1, c);
        return null;
    }

    // Get right neighbor for node at position (r, c)
    getRightNeighborOfNode(r, c) {
        if (c < this.numberOfColumns - 1)
            return this.getNode(r, c + 1).isWall ? null : this.getNode(r, c + 1);
        return null;
    }

    // Get left neighbor for node at position (r, c)
    getLeftNeighborOfNode(r, c) {
        if (c > 0)
            return this.getNode(r, c - 1).isWall ? null : this.getNode(r, c - 1);
        return null;
    }

    // Get neighbors for node at position (r, c); TOP, RIGHT, BOTTOM, LEFT
    getNeighborsForNode(r, c) {
        return [this.getTopNeighborOfNode(r, c), this.getRightNeighborOfNode(r, c), this.getBottomNeighborOfNode(r, c), this.getLeftNeighborOfNode(r, c)];
    }

    clean() {
        this.pathIsFound = false;
        this.nodes = Array.from({ length: numberOfRows });
        for (var row = 0; row < numberOfRows; row++) {
            this.nodes[row] = Array.from({ length: numberOfColumns });
        }
    }

    isPathFound() {
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
                newDNode.setPreviousNode(previous);
                newDNode.setDist(dist);
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

    isPathFound() {
        if (this.path() != []) return true;
        else return false;
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
        //debugger;
        var middle1 = this.getMiddle1();
        var middle2 = this.getMiddle2();
        if (middle1 == null) return null;
        else {
            while (middle1 != null){
                pathArray.push(middle1);
                middle1 = middle1.previousNode;
            }
        }
        if (middle2 == null) return null;
        else {
            while (middle2 != null){
                pathArray.push(middle2);
                middle2 = middle2.previousNode;
            }
        }
        return pathArray;
    }

    getMiddle1(){
        return this.middle1;
    }

    getMiddle2(){
        return this.middle2;
    }

    setMiddle1 (middle1){
        this.middle1 = middle1;
    }

    setMiddle2 (middle2){
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