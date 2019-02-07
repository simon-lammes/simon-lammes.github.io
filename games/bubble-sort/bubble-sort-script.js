var originalNumberArray;
var originalPointerArray;
var newNumberArray;
var newPointerArray;
var userNumberArray;
var userPointerArray;
var hintCount;
var mistakeCount;

function showNextStep() {
    calculateNextIteration();
    userPointerArray = newPointerArray.slice();
    userNumberArray = newNumberArray.slice();
    for (var i = 0; i < userPointerArray.length; i++) {
        var pointerPosition = userPointerArray[i];
        var pointerClass = "pointer-" + i;
        $("#userPointerRow ." + pointerClass).removeClass(pointerClass);
        if (userPointerArray[i] != originalPointerArray[i]) {
            $("#" + pointerPosition + "userPointer").addClass(pointerClass);
        }
    }
    for (var i = 0; i < userNumberArray.length; i++) {
        var numberPlaceholder = $("#" + i + "userNumber");
        if (userNumberArray[i] != originalNumberArray[i]) {
            numberPlaceholder.text(userNumberArray[i]);
        } else {
            numberPlaceholder.text("");
        }
    }
    hintCount++;
}

function allowNumberDrop(ev) {
    for (var i = 0; i < ev.dataTransfer.types.length; i++) {
        var dataType = ev.dataTransfer.types[i];
        if (dataType == "number") {
            ev.preventDefault();
        }
    }
}

function allowPointerDrop(ev) {
    for (var i = 0; i < ev.dataTransfer.types.length; i++) {
        var dataType = ev.dataTransfer.types[i];
        if (dataType == "pointer") {
            ev.preventDefault();
        }
    }
}

function dragNumber(ev) {
    ev.dataTransfer.setData("number", ev.target.textContent);
}

function dragNumberAndDeleteThis(ev) {
    dragNumber(ev);
    ev.target.textContent = "";
    var index = parseInt(ev.target.id,10);
    userNumberArray[index] = originalNumberArray[index];
}

function dragPointer(ev) {
    ev.dataTransfer.setData("pointer", ev.target.className);
}

function dropNumber(ev) {
    ev.preventDefault();
    var placeholder = ev.target;
    var number = ev.dataTransfer.getData("number");
    placeholder.textContent = number;
    var placeholderIndex = parseInt(placeholder.id, 10);
    userNumberArray[placeholderIndex] = number;
}

function dropPointer(ev) {
    ev.preventDefault();
    var pointerElement = ev.target;
    var pointer = ev.dataTransfer.getData("pointer");
    $("#userPointerRow ." + pointer).removeClass(pointer);
    pointerElement.className = pointer; 
    var pointerPosition = parseInt(pointerElement.id, 10);
    var pointerNumber = parseInt(pointer.substr(8, pointer.length -8), 10);
    userPointerArray[pointerNumber] = pointerPosition;
}

$(document).ready(function() {
    setupAllValues();
    displayOriginalValues();
});

function nextIteration() {
    if (isAlgorithmFinished()) {
        var endMessage = "You have finished sorting the algorithm with ";
        if (hintCount == 1) {
            endMessage += hintCount + " hint and ";
        } else {
            endMessage += hintCount + " hints and ";
        }
        if (mistakeCount == 1) {
            endMessage += mistakeCount + " mistake.";
        } else {
            endMessage += mistakeCount + " mistakes.";
        }
        alert(endMessage);
    } else {
        calculateNextIteration();
        var errorMessage = searchUserInputForErrors()
        if (errorMessage == "") {
            iterate();
        } else {
            alert(errorMessage);
            mistakeCount++;
        }
    }   
}

function iterate() {
    originalNumberArray = newNumberArray;
    originalPointerArray = newPointerArray;
    userNumberArray = originalNumberArray.slice();
    userPointerArray = originalPointerArray.slice();
    displayOriginalValues();
    $("#userNumberRow div div").text("");
    for (var i = 0; i < userPointerArray.length; i++) {
        $("#userPointerRow div div").removeClass("pointer-" + i);
    }
}

function searchUserInputForErrors() {
    for (var i = 0; i < userNumberArray.length; i++) {
        if (userNumberArray[i] != newNumberArray[i]) {
            return "The number " + newNumberArray[i] + " is not at the right position";
        }
    }
    for (var i = 0; i < userPointerArray.length; i++) {
        if (userPointerArray[i] != newPointerArray[i]) {
            return "The " + (i+1) + ". pointer is at the wrong position.";
        }
    }
    return "";
}

function setupAllValues() {
    originalNumberArray = [];
    var arrayLength = $("#originalNumberRow div div").length;
    for (var i = 0; i < arrayLength; i++) {
        originalNumberArray.push(Math.floor((Math.random() * 20) + 1));
    }
    setupOriginalPointerArray(arrayLength);
    newNumberArray = [];
    newPointerArray = [];
    userNumberArray = originalNumberArray.slice();
    userPointerArray = originalPointerArray.slice();
    mistakeCount = 0;
    hintCount = 0;
}

function displayOriginalValues() {
    for (var i = 0; i < originalNumberArray.length; i++) {
        var $place = $("#" + (i) + "originalNumber").get(0);
        $place.textContent = originalNumberArray[i];
    }
    for (var i = 0; i < originalPointerArray.length; i++) {
        $("#originalPointerRow .pointer-" + i).removeClass("pointer-" + i);
        $("#" + originalPointerArray[i] + "originalPointer").addClass("pointer-" + i);
    }
}

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
    if (originalPointerArray[1] == 1 && originalNumberArray[originalPointerArray[0]] <= originalNumberArray[originalPointerArray[1]]) {
        return true;
    }
    return false;
}