var originalNumberArray;
var newNumberArray;
var pivotIndex;
var newPivotIndex;
var indexOfLastSmaller;
var newIndexOfLastSmaller;
var indexOfNext;
var newIndexOfNext;

$(document).ready(function() {
    setupAllValues();
    displayOriginalValues();
});

function setupAllValues() {
    originalNumberArray = [];
    newNumberArray = [];
    pivotIndex = 0;
    indexOfLastSmaller = 0;
    indexOfNext = 1;
    var arrayLength = $("#originalNumberRow div div").length;
    originalNumberArray.push(10);
    for (var i = 1; i < arrayLength; i++) {
        var randomNumber = Math.floor((Math.random() * 20) + 1)
        originalNumberArray.push(randomNumber);
    }   
}

function removeClasses() {
    $(".pivot").removeClass("pivot");
    $(".smaller-or-equals").removeClass("smaller-or-equals");
    $(".bigger-or-equals").removeClass("bigger-or-equals");
}

function displayOriginalValues() {
    for (var i = 0; i < originalNumberArray.length; i++) {
        var numberValue = originalNumberArray[i];
        $("#" + i + "originalNumber").text(numberValue);
    }
    removeClasses();
    $("#" + pivotIndex + "originalNumber").addClass("pivot");
    for (var i = 0; i <= indexOfLastSmaller; i++) {
        $("#" + i + "originalNumber").addClass("smaller-or-equals");
    }
    for (var i = indexOfLastSmaller +1; i < indexOfNext; i++) {
        $("#" + i + "originalNumber").addClass("bigger-or-equals");
    }
}

function allowNumberDrop(ev) {
    for (var i = 0; i < ev.dataTransfer.types.length; i++) {
        var dataType = ev.dataTransfer.types[i];
        if (dataType == "number") {
            ev.preventDefault();
        }
    }
}

function dragNumber(ev) {
    ev.dataTransfer.setData("number", ev.target.textContent);
}

function dropNumber(ev) {
    ev.preventDefault();
    var placeholder = ev.target;
    var number = ev.dataTransfer.getData("number");
    placeholder.textContent = number;
}


function nextIteration() {
    calculateNextIteration();
    if (isAlgorithmFinished()) {
        endFinishedGame();
        return;
    }     
    var errorMessage = searchUserInputForErrors();
    if (errorMessage == "") {
        iterate();
        clearUserInput();
    } else {
        alert(errorMessage);
    } 
    displayOriginalValues();
}

function endFinishedGame() {
    var message = "This algorithm is finished so far. The next step would be sorting the following parts of the array with the same procedure.\n1) ";
    for (var i = 0; i <= pivotIndex; i++) {
        message += originalNumberArray[i] + ", ";
    }
    message = message.substr(0, message.length -2);
    message += "\n2) ";
    for (var i = pivotIndex +1; i < originalNumberArray.length; i++) {
        message += originalNumberArray[i] + ", ";
    }
    message = message.substr(0, message.length -2);
    alert(message);
}

function clearUserInput() {
    $("#userNumberRow div div").text("");
}

function copyValuesForNextIteration() {
    newIndexOfLastSmaller = indexOfLastSmaller;
    newIndexOfNext = indexOfNext;
    newNumberArray = originalNumberArray.slice();
    newPivotIndex = pivotIndex;
}

function calculateNextIteration() {
    copyValuesForNextIteration();
    var inspectedIndex = newIndexOfNext;
    if (inspectedIndex == newNumberArray.length) {
        var temp = newNumberArray[newPivotIndex];
        newNumberArray[newPivotIndex] = newNumberArray[newIndexOfLastSmaller];
        newNumberArray[newIndexOfLastSmaller] = temp;
        newPivotIndex = newIndexOfLastSmaller;  
    } else {
        var inspectedValue = newNumberArray[inspectedIndex];
        var pivot = newNumberArray[newPivotIndex];
        if (inspectedValue < pivot) {
            var temp = inspectedValue;
            newNumberArray[inspectedIndex] = newNumberArray[newIndexOfLastSmaller+1];
            newNumberArray[newIndexOfLastSmaller+1] = temp;
            newIndexOfLastSmaller++;
        } 
        newIndexOfNext++;
    }
}

function iterate() {
    indexOfLastSmaller = newIndexOfLastSmaller;
    indexOfNext = newIndexOfNext;
    originalNumberArray = newNumberArray;
    pivotIndex = newPivotIndex;
}

function getUserNumberArrayAsCopyOfOriginal() {
    var userNumberArray = [];
    for (var i = 0; i < originalNumberArray.length; i++) {
        userNumberArray[i] = originalNumberArray[i];
    }
    return userNumberArray;
}

function integrateUserInput(userNumberArray) {
    var $inputFields = $("#userNumberRow div div");
    for (var i = 0; i < $inputFields.length; i++) {
        inputField = $inputFields[i];
        if (inputField.textContent != "") {
            userNumberArray[i] = inputField.textContent
        }
    }
}

function searchUserInputForErrors() {
    var userNumberArray = getUserNumberArrayAsCopyOfOriginal();
    integrateUserInput(userNumberArray);
    for (var i = 0; i < newNumberArray.length; i++) {
        if (newNumberArray[i] != userNumberArray[i]) {
            return "The number " + userNumberArray[i] + " must be exchanged with the number " + newNumberArray[i] + ".";
        }
    }
    return "";
}

function showNextStep() {
    calculateNextIteration();
    for (var i = 0; i < originalNumberArray.length; i++) {
        if (originalNumberArray[i] != newNumberArray[i]) {
            $("#" + i + "userNumber").text(newNumberArray[i]);
        } else {
            $("#" + i + "userNumber").text("");
        }
    }
}

function isAlgorithmFinished() {
    for (var i = 0; i < originalNumberArray.length; i++) {
        if (originalNumberArray[i] != newNumberArray[i]) {
            return false;
        }
    }
    if (pivotIndex != newPivotIndex) {
        return false;
    }
    if (indexOfLastSmaller != newIndexOfLastSmaller) {
        return false;
    }
    if (indexOfNext != newIndexOfNext) {
        return false;
    }
    return true;
}