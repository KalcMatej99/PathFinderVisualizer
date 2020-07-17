
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
    constructor(row, column, visited) {
        super(row, column);
        this.visited = visited;
        this.previousNode = null;
        this.dist = Number.MAX_VALUE; 
    }
    
    setDist(dist){
        this.dist = dist;
    }

    setPreviousNode(previousNode){
        this.previousNode = previousNode;
    }

    isVisited(){
        return this.visited;
    }

}

class DFSNode extends GridNode {
    constructor(row, column, visited) {
        super(row, column);
        this.visited = visited;
    }
}