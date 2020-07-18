function drawGraph(graph) {

    tableBody.innerHTML = '';

    for (var i = 0; i < numberOfRows; i += 1) {
        var newRow = '<tr row="' + i + '" id="row-' + i + '" height="' + heightOfNode + '"></tr>';
        tableBody.insertAdjacentHTML('beforeend', newRow);
        var tableRow = document.getElementById("row-" + i);

        for (var j = 0; j < numberOfColumns; j += 1) {
            var newNode = '<td class="node" row="' + i + '" column="' + j + '" id="node-' + i + '-' + j + '" \
            height="' + heightOfNode + '" width="' + widthOfNode + '" ondragstart="drag(event)" ondrop="drop(event)" \
            ondragover="allowDrop(event)" onmouseover="makeWall(' + i + ',' + j + ')"></td>';
            tableRow.insertAdjacentHTML('beforeend', newNode);

            var nodeID = getIdFor(i, j);
            var nodeElement = document.getElementById(nodeID);

            nodeElement.style.padding = 0;

            if (graph.getNode(i, j).isWall) {
                nodeElement.classList.add("node-wall");
            } else {

                nodeElement.classList.remove("node-wall");

                if (graph.getNode(i, j).visited) {
                    nodeElement.classList.add("node-visited");
                } else {
                    nodeElement.classList.remove("node-visited");
                }

            }

            nodeElement.classList.remove("node-in-path");

        }
    }

    var startNode = graph.getStartNode();
    displayStartNode(startNode.row, startNode.column);

    var endNode = graph.getEndNode();
    displayEndNode(endNode.row, endNode.column);

    if (graph.pathIsFound) {
        drawPathInGraph(graph);
    }

    this.graph = graph;
}

function drawDifferences(diff) {

    for (var i = 0; i < diff.length; i++) {
        var node = diff[i];
        var row = node.row;
        var column = node.column;

        var elementNode = document.getElementById(getIdFor(row, column));

        if (node.isWall) {
            elementNode.classList.add("node-wall");
        } else {

            elementNode.classList.remove("node-wall");
            if (node.visited) {
                elementNode.classList.add("node-visited");
            } else {
                elementNode.classList.remove("node-visited");
            }
        }

        if (node.isStartNode) {
            displayStartNode(row, column);
        }

        if (node.isEndNode) {
            displayEndNode(row, column);
        }
    }
}



function drawPathInGraph(graph) {
    var path = graph.path();
    var indexNode = 0;
    //clearAllTimeouts();

    for (var count = 0; count < path.length; count++) {

        setTimeout(() => {

            if (path != null && indexNode < path.length) {

                var nodeInPath = path[indexNode];
                var rowOfNodeInPath = nodeInPath.row;
                var columnOfNodeInPath = nodeInPath.column;
                document.getElementById(getIdFor(rowOfNodeInPath, columnOfNodeInPath)).classList.add("node-in-path");
                indexNode += 1;
                if (indexNode >= path.length) {
                    //clearAllTimeouts();
                    isShownPath = true;
                    path = null;
                    animationIsExecuting = false;
                }
            }
        }, speedOfAnimation * count);
    }
}

function displayStartNode(r, c) {
    document.getElementById(getIdFor(r, c)).classList.add("startNode");
    document.getElementById(getIdFor(r, c)).draggable = true;
    document.getElementById(getIdFor(r, c)).innerHTML = '';
    document.getElementById(getIdFor(r, c)).insertAdjacentHTML('beforeend', '<img style="object-fit: cover;" width="28px" height="28px" src="' + pathToGoSign + '"></img>');
}
function displayEndNode(r, c) {
    document.getElementById(getIdFor(r, c)).classList.add("endNode");
    document.getElementById(getIdFor(r, c)).draggable = true;
    document.getElementById(getIdFor(r, c)).innerHTML = '';
    document.getElementById(getIdFor(r, c)).insertAdjacentHTML('beforeend', '<img style="object-fit: cover;" width="28px" height="28px" src="' + pathToFinishFlag + '"></img>');
}

function displayStates(states, speed) {
    drawGraph(states[0]);
    var indexState = 1;
    for (var count = 1; count < states.length; count++) {

        setTimeout(() => {
            if (states != null && indexState < states.length) {
                if (indexState - 1 == states.length) isShownPath = true;

                //drawGraph(states[indexState])
                var differences = findDifferenceBetweenStates(this.graph, states[indexState]);
                drawDifferences(differences);

                if (states[indexState].pathIsFound) {
                    drawPathInGraph(states[indexState]);
                }

                this.graph = states[indexState];
                indexState++;
                if (indexState >= states.length) {
                    //clearAllTimeouts();
                    states = null;
                    animationIsExecuting = false;
                }
            }
        }, speed * count);
    }
}

function makeWall(row, column) {

    if(mouseDown && !graph.getNode(row, column).isStartNode && !graph.getNode(row, column).isEndNode) {
        
        var oldGraph = this.graph.clone();
        this.graph.setWall(row, column);

        console.log(row, column);
        console.log(oldGraph);
        console.log(graph);

        var differences = findDifferenceBetweenStates(oldGraph, this.graph);
        console.log(differences);
        drawDifferences(differences);
    }
}

var mouseDown = false;
document.body.onmousedown = function() { 
    console.log("hello3");
  mouseDown = true;
}
document.body.onmouseup = function() {
    mouseDown = false;
}