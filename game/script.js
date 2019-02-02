function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var placeholder = ev.target;
    if (placeholder.id.endsWith("a")) {
        placeholder = placeholder.parentElement;
    }
    var id = ev.dataTransfer.getData("id");
    if (placeholder.childElementCount > 0) {
        var old = placeholder.childNodes.item(0);
        var oldValue = old.textContent;
        var oldPlace = document.getElementById(oldValue)
        oldPlace.appendChild(old);
    }  
    var element = document.getElementById(id);
    placeholder.appendChild(element);
}