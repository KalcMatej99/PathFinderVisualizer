
//Basic Node class
class Node {
    constructor(id) {
        this.id = id;
        this.isStartNode = false;
        this.isEndNode = false;
    }

    isStartNode() {
        return this.isStartNode;
    }

    makeStartNode() {
        this.isStartNode = true;
    }

    unmakeStartNode() {
        this.isStartNode = false;
    }

    isEndNode() {
        return this.isEndNode;
    }

    makeEndNode() {
        this.isEndNode = true;
    }
    unmakeEndNode() {
        this.isEndNode = false;
    }
}

//GridNode is the default class in use
class GridNode extends Node {
    constructor(row, column) {
        super(row + "-" + column);
        this.row = row;
        this.column = column;
    }
}

class DijkstraNode extends GridNode {
    constructor(id, row, column) {
        super(id);
        this.row = row;
        this.column = column;
        this.visited = false; // Add other variables - NINO
    }

    /*constructor(node) {
        super(node.id);
        this.row = node.row;
        this.column = node.column;
        this.visited = false;
    }*/
}