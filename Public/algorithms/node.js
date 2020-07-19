
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
        this.isWall = false;
    }

    isEqual(node){  // returns true if "this" is equal to node
        return this.isWall == node.isWall && this.row == node.row && this.column == node.column && this.isStartNode == node.isStartNode && this.isEndNode == node.isEndNode;
    }
}

class DijkstraNode extends GridNode {
    constructor(row, column, visited) {
        super(row, column);
        this.visited = visited;
        this.previousNode = null;
        this.dist = Number.MAX_VALUE; 
    }
    
    isEqual(node){
        if(this.previousNode == null || node.previousNode == null)
            return super.isEqual(node) && this.visited == node.visited && this.dist == node.dist;
        return super.isEqual(node) && this.visited == node.visited && this.previousNode.id == node.previousNode.id && this.dist == node.dist;
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

    isEqual(node){
        return super.isEqual(node) && this.visited == node.visited;
    }
}

class BidirectionalNode extends GridNode {
    constructor(row, column){
        super(row, column);
        this.visitedStart = false;
        this.visitedFinish = false;
        this.previousNode = null;
        this.dist = Number.MAX_VALUE;
    }

    setVisitedStart(visitedStart){
        this.visitedStart = visitedStart;
    }

    setVisitedFinish(visitedFinish){
        this.visitedFinish = visitedFinish;
    }

    setDist(dist){
        this.dist = dist;
    }

    setPreviousNode(previousNode){
        this.previousNode = previousNode;
    }

    isEqual (node){
        if(this.previousNode == null || node.previousNode == null)
            return super.isEqual(node) && this.visitedStart == node.visitedStart && this.visitedFinish == node.visitedFinish && this.dist == node.dist;
        return super.isEqual(node) && this.visitedStart == node.visitedStart && this.visitedFinish == node.visitedFinish && this.previousNode.id == node.previousNode.id && this.dist == node.dist;
    }
}