class GridGraph {

    //Construct empty grid graph of size rows * columns
    constructor(numberOfRows, numbeOfColumns) {
        this.nodes = Array.from({ length: numberOfRows });
        for (var row = 0; row < numberOfRows; row++) {
            this.nodes[row] = Array.from({ length: numbeOfColumns });
        }
        this.numberOfRows = numberOfRows;
        this.numbeOfColumns = numbeOfColumns;
    }

    //Construct grid graph from nodes: [[]]
    /*constructor(nodes) {
        this.nodes = nodes;
        this.numberOfRows = nodes.length;
        this.numbeOfColumns = nodes[0].length;
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
            for (var column = 0; column < this.numbeOfColumns; column++) {
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
        this.getNode(row,column).makeStartNode();
    }


    //get end node in grid graph
    getEndNode() {
        for (var row = 0; row < this.numberOfRows; row++) {
            for (var column = 0; column < this.numbeOfColumns; column++) {
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
        if (c < this.numbeOfColumns - 1)
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

    clone (){
        var tmp = new GridGraph(this.numberOfRows,this.numbeOfColumns)
        for (var i = 0; i < this.numberOfRows; i++) {
            for (var j = 0; j < this.numbeOfColumns; j++) {
                isVisited = this.nodes[i][j].isVisited;
                graph.setNode(i, j, new DijkstraNode(i, j,isVisited));
            }
        }
        return tmp;
    } 
}