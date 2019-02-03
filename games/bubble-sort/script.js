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
    var pointerPosition = ev.target;
    var pointer = ev.dataTransfer.getData("pointer");
    pointerPosition.className = pointer;
}

function fillArray() {
    array = [];
    for (var i = 0; i < 12; i++) {
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
    var $numbers = $("#newNumberRow div");
    $numbers.find("div").text("");
    var $pointers = $("#newPointerRow div");
    $pointers.find("div").removeClass("first-pointer second-pointer");
}

$(document).ready(function() {
    fillArray();
    displayArray();
    setPointers();
    showPointers();
});