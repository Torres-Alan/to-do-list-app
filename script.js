const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something.");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let editBtn = document.createElement("span");
        editBtn.innerHTML = "✎";
        editBtn.className = "edit-btn";
        li.appendChild(editBtn);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

function saveEdit(input, editBtn) {
    if (input.value.trim() !== "") {
        const newText = document.createTextNode(input.value);
        input.replaceWith(newText);
        editBtn.innerHTML = "✎";
        editBtn.classList.remove("saving");
        saveData();
    }
}

listContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit-btn")) {
        const li = e.target.parentElement;

        if (e.target.innerHTML === "✔") {
            const input = li.querySelector(".edit-input");
            if (input) saveEdit(input, e.target);
            return;
        }

        const currentText = li.childNodes[0].textContent;
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.className = "edit-input";
        li.childNodes[0].replaceWith(input);
        input.focus();
        e.target.innerHTML = "✔";
        e.target.classList.add("saving");

        input.addEventListener("keydown", function (ev) {
            if (ev.key === "Enter") saveEdit(input, e.target);
        });

    } else if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();