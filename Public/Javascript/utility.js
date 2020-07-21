function findDifferenceBetweenStates(state1, state2) {
    var differences = [];

    for (var i = 0; i < state1.numberOfRows; i++) {
        for (var j = 0; j < state1.numberOfColumns; j++) {
            if (!state1.getNode(i, j).isEqual(state2.getNode(i, j)))
                differences.push(state2.getNode(i, j));
        }
    }

    return differences;
}

function clearAllTimeouts() {
    var highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }
    
    setAnimationIsExecuting(false);
}

function getIdFor(r, c) {
    return 'node-' + r + '-' + c;
}

function getRowAndColumnFromId(id) {
    return [id.split("-")[1], id.split("-")[2]];
}

var isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

function deviceIsPhone() {
    return isMobile.any() != null;
}