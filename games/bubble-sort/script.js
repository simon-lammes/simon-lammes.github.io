function calculateNextIteration() {
    newArray = array.slice();
    if (secondPointer == 1) {
        if (array[firstPointer] > array[secondPointer]) {
            var temp = newArray[firstPointer];
            newArray[firstPointer] = newArray[secondPointer];
            newArray[secondPointer] = temp;
        }
        return;
    }
    newFirstPointer = firstPointer;
    newSecondPointer = secondPointer;
    if (newArray[newFirstPointer+1] < newArray[newFirstPointer]) {
        var temp = newArray[newFirstPointer+1];
        newArray[newFirstPointer+1] = newArray[newFirstPointer];
        newArray[newFirstPointer] = temp;
    }
    if (newFirstPointer < newSecondPointer - 1) {
        newFirstPointer++;
    } else {
        newSecondPointer--;
        newFirstPointer = 0;
    }
}

function isAlgorithmFinished() {
    if (secondPointer == 1 && array[firstPointer] <= array[secondPointer]) {
        return true;
    }
    return false;
}