function setupOriginalPointerArray(arrayLength) {
    originalPointerArray = [];
    originalPointerArray.push(0);
    originalPointerArray.push(arrayLength-1);
}

function calculateNextIteration() {
    newNumberArray = originalNumberArray.slice();
    if (originalPointerArray[1] == 1) {
        if (originalNumberArray[originalPointerArray[0]] > originalNumberArray[originalPointerArray[1]]) {
            var temp = newNumberArray[originalPointerArray[1]];
            newNumberArray[ponters[0]] = newNumberArray[originalPointerArray[1]];
            newNumberArray[originalPointerArray[1]] = temp;
        }
        return;
    }
    newPointerArray = originalPointerArray.slice();
    newPointerArray[0] = originalPointerArray[0];
    newPointerArray[1] = originalPointerArray[1];
    if (newNumberArray[newPointerArray[0]+1] < newNumberArray[newPointerArray[0]]) {
        var temp = newNumberArray[newPointerArray[0]+1];
        newNumberArray[newPointerArray[0]+1] = newNumberArray[newPointerArray[0]];
        newNumberArray[newPointerArray[0]] = temp;
    }
    if (newPointerArray[0] < newPointerArray[1] - 1) {
        newPointerArray[0]++;
    } else {
        newPointerArray[1]--;
        newPointerArray[0] = 0;
    }
}

function isAlgorithmFinished() {
    if (newPointerArray[1] == 1 && originalNumberArray[newPointerArray[0]] <= originalNumberArray[newPointerArray[1]]) {
        return true;
    }
    return false;
}