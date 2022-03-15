
//event listeners
document.querySelector("#inputItem").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addListItem();
    }
});
document.querySelector("#checkAll").addEventListener("click", checkAllItems);
document.querySelector("#all").addEventListener("click", displayAll);
document.querySelector("#active").addEventListener("click", displayActive);
document.querySelector("#clearChecked").addEventListener("click", clearCompleted);
document.querySelector("#completed").addEventListener("click", displayCompleted);
//starting status, hide elements
document.querySelector("footer").style.display = "none";
document.querySelector("#checkAll").style.visibility = "hidden";

//find the DOM elements we need
let template = document.querySelector("#todoListItem")
template.remove();

//adds text input to todo list
function addListItem() {
    let input = document.querySelector("#inputItem").value;
    if (input === "") {
        return
    }
    //clone tamplate, set button action
    let li = template.content.firstElementChild.cloneNode(true);
    li.querySelector(".listItem").textContent = input;
    document.querySelector("#todoList").appendChild(li)
    li.querySelector(".delete").style.visibility = "hidden";
    document.querySelector("#inputItem").value = '';

    li.querySelector(".delete").onclick = () => {
        li.remove();
        updateCounter();
    }
    li.querySelector(".checkbox").onclick = () => {
        updateCounter();
    }
    updateCounter();
    //display elements
    document.querySelector("footer").style.display = "flex";

    li.addEventListener('mouseenter', () => {
        li.querySelector(".delete").style.visibility = "visible";
    });

    li.addEventListener('mouseleave', () => {
        li.querySelector(".delete").style.visibility = "hidden";
    });
}

//set checkbox to true for all list items
function checkAllItems() {
    let items = document.querySelectorAll(".list")
    let counter = 0;
    for (const e of items) {
        if (e.childNodes[1].checked === true) {
            counter++;
        }
    }
    if (counter === items.length) {
        for (const e of items) {
            e.childNodes[1].checked = false;
        }
    }
    else {
        for (const e of items) {
            e.childNodes[1].checked = true;
        }
    }
    updateCounter();
}
//clears all checked list items
function clearCompleted() {
    let items = document.querySelectorAll(".list")
    for (const e of items) {
        if (e.childNodes[1].checked === true) {
            e.remove();
        }
    }
    updateCounter();
}
//removes selected item
function removeSelected() {
    document.querySelector(".selected").classList.remove("selected");
}
//displayes items based on checkbox status
function displayAll() {
    let items = document.querySelectorAll(".list")
    for (const e of items) {
        e.style.display = "flex"
    }
    removeSelected();
    document.querySelector("#all").classList.add("selected")
}
function displayActive() {
    let items = document.querySelectorAll(".list")
    for (const e of items) {
        if (e.childNodes[1].checked === true) {
            e.style.display = "none"
        }
        else {
            e.style.display = "flex"
        }
    }
    removeSelected();
    document.querySelector("#active").classList.add("selected")
}
function displayCompleted() {
    let items = document.querySelectorAll(".list")
    for (const e of items) {
        if (e.childNodes[1].checked === false) {
            e.style.display = "none"
        }
        else {
            e.style.display = "flex"
        }
    }
    removeSelected();
    document.querySelector("#completed").classList.add("selected")
}
//updates amount of active items and hides footer and "checkAll" button whem list is empty
function updateCounter() {
    let activeItems = 0;
    let allItems = 0;
    let items = document.querySelectorAll(".list")
    for (const e of items) {
        if (e.childNodes[1].checked === false) {
            activeItems++;
        }
        allItems++
    }
    if (allItems === 0) {
        document.querySelector("#checkAll").style.visibility = "hidden";
        document.querySelector("footer").style.display = "none";
    }

    if (activeItems > 0) {
        document.querySelector("#itemsLeft").style.visibility = "visible";
        if (activeItems === 1) {
            document.querySelector("#itemsLeft").textContent = activeItems + " item left";
        } else {
            document.querySelector("#itemsLeft").textContent = activeItems + " items left";
        }
        document.querySelector("#checkAll").style.visibility = "visible";
    }
    else {
        document.querySelector("#itemsLeft").style.visibility = "hidden";
    }

    if (activeItems === items.length) {
        document.querySelector("#clearChecked").style.visibility = "hidden";
    }
    else {
        document.querySelector("#clearChecked").style.visibility = "visible";
    }

}


