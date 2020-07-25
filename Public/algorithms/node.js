
//Basic Node class
class Node {
    constructor(id) {
        this.id = id;
        this.isStartNode = false;
        this.isEndNode = false;
        this.isIntermidNode = false;
        this.priotityIntermidNode = -1;
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

    isWall() {
        return false;
    }

    makeIntermidNode(priority) {
        this.isIntermidNode = true;
        this.priotityIntermidNode = priority;
    }

    unmakeIntermidNode() {
        this.isIntermidNode = false;
        this.priotityIntermidNode = -1;
    }

    isIntermidNode() {
        return this.isIntermidNode;
    }

    clone() {
        var newNode = new Node(this.id);
        if(this.isStartNode) newNode.makeStartNode();
        if(this.isEndNode) newNode.makeEndNode();
        if(this.isIntermidNode) newNode.makeIntermidNode(this.priority);
        return newNode;
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
    isVisited(){
        return false;
    }

    clone() {
        var newNode = super.clone();
        if(this.isWall) newNode.isWall = true;
        return newNode;
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

    /*clone() {
        var newNode = super.clone();

        if(this.visited) newNode.visited = true;
        if(this.previousNode != null) newNode.previousNode = this.previousNode.clone();
    }*/

}

class DFSNode extends GridNode {
    constructor(row, column, visited) {
        super(row, column);
        this.visited = visited;
        this.previousNode = null;
    }

    isEqual(node){
        if(this.previousNode == null || node.previousNode == null)
            return super.isEqual(node) && this.visited == node.visited;
        return super.isEqual(node) && this.visited == node.visited && this.previousNode.id == node.previousNode.id;
    }

    isVisited(){
        return this.visited;
    }
    setPreviousNode(previousNode){
        this.previousNode = previousNode;
    }
}

class BidirectionalNode extends GridNode {
    constructor(row, column){
        super(row, column);
        this.visitedStart = false;
        this.visitedFinish = false;
        this.previousNode = null;
        this.distStart = Number.MAX_VALUE;
        this.distFinish = Number.MAX_VALUE;
    }

    isVisited() {
        return this.visitedStart || this.visitedFinish;
    }

    setVisitedStart(visitedStart){
        this.visitedStart = visitedStart;
    }

    setVisitedFinish(visitedFinish){
        this.visitedFinish = visitedFinish;
    }

    setDistStart(distStart){
        this.distStart = distStart;
    }

    setDistFinish(distFinish){
        this.distFinish = distFinish;
    }

    setPreviousNode(previousNode){
        this.previousNode = previousNode;
    }

    isEqual (node){
        if(this.previousNode == null || node.previousNode == null)
            return super.isEqual(node) && this.visitedStart == node.visitedStart && this.visitedFinish == node.visitedFinish && this.distStart == node.distStart && this.distFinish == node.distFinish;
        return super.isEqual(node) && this.visitedStart == node.visitedStart && this.visitedFinish == node.visitedFinish && this.previousNode.id == node.previousNode.id && this.distStart == node.distStart && this.distFinish == node.distFinish;
    }
}

class PrimNode extends GridNode {
    constructor(row, column, visited) {
        super(row, column);
        this.visited = visited;
        this.dist = Number.MAX_VALUE; 
    }
    
    isEqual(node){
        return super.isEqual(node) && this.visited == node.visited && this.dist == node.dist;
    }

    setDist(dist){
        this.dist = dist;
    }

    isVisited(){
        return this.visited;
    }
}