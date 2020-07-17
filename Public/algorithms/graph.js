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
            return this.getNode(r - 1, c);
        return null;
    }

    // Get bottom neighbor for node at position (r, c)
    getBottomNeighborOfNode(r, c) {
        if (r < this.numberOfRows - 1)
            return this.getNode(r + 1, c);
        return null;
    }

    // Get right neighbor for node at position (r, c)
    getRightNeighborOfNode(r, c) {
        if (c < this.numberOfColumns - 1)
            return this.getNode(r, c + 1);
        return null;
    }

    // Get left neighbor for node at position (r, c)
    getLeftNeighborOfNode(r, c) {
        if (c > 0)
            return this.getNode(r, c - 1);
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

                var newDNode = new DijkstraNode(i, j, visited);
                newDNode.setPreviousNode(previous);
                newDNode.setDist(dist);

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
