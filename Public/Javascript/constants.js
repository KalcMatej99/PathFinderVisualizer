const tableBody = document.getElementById("tableBody");
const widthOfNode = 30;
const heightOfNode = 30;
const numberOfColumns = parseInt(tableBody.getBoundingClientRect().width / widthOfNode, 10);
const numberOfRows = parseInt((window.innerHeight - tableBody.getBoundingClientRect().y) / heightOfNode, 10);
const pathToGoSign = "./Public/Images/goSign.png";
const pathToFinishFlag = "./Public/Images/finishFlag.png";
const pathToWallImage = "./Public/Images/wall.png";
const speedOfAnimation = 25;