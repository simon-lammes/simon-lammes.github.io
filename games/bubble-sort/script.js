var array;
var firstPointer;
var secondPointer;

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

function dragPointer(ev) {
    ev.dataTransfer.setData("pointer", ev.target.className);
}

function dropNumber(ev) {
    ev.preventDefault();
    var placeholder = ev.target;
    var number = ev.dataTransfer.getData("number");
    placeholder.textContent = number;
}

function dropPointer(ev) {
    ev.preventDefault();
    resetNewPointers();
    var pointerPosition = ev.target;
    var pointer = ev.dataTransfer.getData("pointer");
    resetNewPointers(pointer);
    pointerPosition.className = pointer;
}

function fillArray() {
    array = [];
    for (var i = 0; i < 8; i++) {
        array.push(Math.floor((Math.random() * 20) + 1));
    }
} 

function displayArray() {
    for (var i = 0; i < array.length; i++) {
        var $place = $("#" + (i) + "originalNumber").get(0);
        $place.textContent = array[i];
    }
}

function setPointers() {
    firstPointer = 0;
    secondPointer = array.length - 1;
}

function showPointers() {
    $("#" + firstPointer + "originalPointer").addClass("first-pointer");
    $("#" + secondPointer + "originalPointer").addClass("second-pointer");
}

function resetStep() {
    resetNewNumbers();
    resetNewPointers("first-pointer");
    resetNewPointers("second-pointer");
}

function hidePointers() {
    var $pointers = $("#originalPointerRow div");
    $pointers.find("div").removeClass("first-pointer second-pointer");
}

function resetGame() {
    setPointers();
    resetStep();
}

function resetNewNumbers() {
    var $numbers = $("#newNumberRow div");
    $numbers.find("div").text("");
}

function resetNewPointers(pointerClass) {
    var $pointers = $("#newPointerRow div");
    $pointers.find("div").removeClass(pointerClass);
}

function fillEmptyPlaceholders() {
    for (var i = 0; i < array.length; i++) {
        var $newNumber = $("#" + i +"newNumber")
        if ($newNumber.text() == "") {
            var originalNumber = array[i];
            $newNumber.text(originalNumber);
        }
    }
    if ($("#newPointerRow .first-pointer").length == 0) {
        $("#" + firstPointer + "newPointer").addClass("first-pointer");
    }
    if ($("#newPointerRow .second-pointer").length == 0) {
        $("#" + secondPointer + "newPointer").addClass("second-pointer");
    }
}

function evaluateStep() {
    for (var i = 0; i < array.length; i++) {
        var newNumber = $("#" + i +"newNumber").text();
        var originalNumber = $("#" + i + "originalNumber").text();
        if (newNumber != "" && newNumber != originalNumber) {
            alert("Wrong number!");
            resetStep();
            return;
        }
    }
    var newFirstPointer = $("#newPointerRow .first-pointer").get(0);
    var newFirstPointerIndex = parseInt(newFirstPointer.getAttribute("id"), 10);
    var newSecondPointer = $("#newPointerRow .second-pointer").get(0);
    var newSecondPointerIndex = parseInt(newSecondPointer.getAttribute("id"), 10);
    if (newFirstPointerIndex != firstPointer || newSecondPointerIndex != secondPointer) {
        alert("Wrong pointer!");
        resetStep();
        return;
    }
    resetStep();
}

function nextIteration() {
    fillEmptyPlaceholders();
    if (array[firstPointer+1] < array[firstPointer]) {
        var temp = array[firstPointer+1];
        array[firstPointer+1] = array[firstPointer];
        array[firstPointer] = temp;
    }
    if (firstPointer < secondPointer - 1) {
        firstPointer++;
    } else {
        secondPointer--;
        firstPointer = 0;
    }
    if (secondPointer == 1) {
        resetGame(); //the algorithm is done
    }
    hidePointers();
    showPointers();
    displayArray();
    evaluateStep();
}

$(document).ready(function() {
    fillArray();
    displayArray();
    setPointers();
    showPointers();
});