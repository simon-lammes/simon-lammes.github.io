function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("number", ev.target.textContent);
}

function drop(ev) {
    ev.preventDefault();
    var placeholder = ev.target;
    var number = ev.dataTransfer.getData("number");
    var $placeholders = $("#placeholderRow").children();
    for (var i = 0; i < $placeholders.length; i++) {
        $currentPlaceholder = $placeholders.get(i);
        $currentPlaceholder = $currentPlaceholder.childNodes.item(0);
        if ($currentPlaceholder.textContent == number) {
            $currentPlaceholder.textContent = "";
        }
    }
    placeholder.textContent = number;
}