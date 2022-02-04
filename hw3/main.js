let todo = [];
let cross = [];
let clicks = [];
let count = 0;
const todoList = document.getElementById("todo-list");
const input = document.getElementsByClassName("todo-app__input")[0];
const footer = document.getElementsByTagName("footer")[0];
const left = footer.querySelector("div");
let list = document.querySelectorAll('li');
const AllButton = document.querySelector('[name="AllB"]');
const ActiveButton = document.querySelector('[name="ActiveB"]');
const ComButton = document.querySelector('[name="CompletedB"]');
const ClearButton = document.querySelector('[name="ClearB"]');

class listItem{
    constructor(itemText, id){
        console.log(itemText);
        this.node = document.createElement("li");
        this.node.classList.add("todo-app__item");
        let div = document.createElement("div");
        div.classList.add("todo-app__checkbox");
        let inp = document.createElement("input");
        inp.id=id;
        inp.type="checkbox";
        div.appendChild(inp);
        clicks.push(inp);
        inp.addEventListener('click', handleClick);
        let label = document.createElement("label");
        label.htmlFor = id;
        div.appendChild(label);
        this.node.appendChild(div);
        let text = document.createElement("h1");
        text.classList.add("todo-app__item-detail");
        text.textContent = itemText;
        this.node.appendChild(text);
        let pic = document.createElement("img");
        pic.classList.add("todo-app__item-x");
        pic.src = "./img/x.png";
        pic.id = id;
        this.node.appendChild(pic);
        pic.addEventListener('click', deleteItem);
    }

    get lI() {
        return this.node;
    }
}


function handleInput(e) {
    if (e.keyCode === 13 && input.value !== ""){
        console.log(input.value);
        todo.push(input.value);
        cross.push(0);
        todoList.appendChild(new listItem(input.value, todo.length-1).lI);
        input.value = '';
        if (todo.length === 1){
            showfooter();
        }
        count += 1;
        showleft();
        list = document.querySelectorAll('li');

    }
}

function handleClick() {
    console.log(this.checked);
    if (this.checked) {
        count -= 1;
        cross[this.id] = 1;
    }else {
        count += 1;
        cross[this.id] = 0;
    }
    showleft();
    showClear();
    console.log(1111);
    let listText = document.querySelectorAll("li h1");
    listText[this.id].classList.toggle("checked");
    //let h1 = parent.getElementsByTagName("h1");
    //h1.classList.toggle("checked");
    //clicks[this.id].classList.toggle("checked");
}

function showfooter() {
    console.log(footer);
    todoList.style.display = "block";
    footer.style.display = "flex";
}

function showleft() {
    left.textContent = `${count} left`;
}

function deleteItem() {
    console.log(this.id);
    if (cross[this.id] === 0){
        count -= 1;
        showleft();
    }
    todo.splice(this.id, 1);
    cross.splice(this.id, 1);
    rerenderItem();
}

function showClear() {
    console.log('clear');
    if (count !== todo.length){
        ClearButton.style.visibility = "visible";
    }else{
        ClearButton.style.visibility = "hidden";
    }
}

function rerenderItem() {
    clicks = [];
    todoList.innerHTML = '';
    todo.forEach((name, index) => todoList.appendChild(new listItem(name, index).lI));
    for (let i = 0; i < cross.length; i++){
        if (cross[i] === 1){
            console.log(clicks[i].checked);
            clicks[i].checked = true;
            let listText = document.querySelectorAll("li h1");
            listText[i].classList.toggle("checked");
        }
    }
    if (todo.length === 0) {
        todoList.style.display = "none";
        footer.style.display = "none";
    }
    list = document.querySelectorAll('li');
    showClear();
}

function all() {
    for (let i = 0; i < cross.length; i++){
        list[i].style.display = "flex";
    }
}

function active() {
    console.log(111);
    for (let i = 0; i < cross.length; i++){
        if (cross[i] === 1){
            list[i].style.display = "none";
        }else
            list[i].style.display = "flex"
    }
}

function completed() {
    for (let i = 0; i < cross.length; i++){
        if (cross[i] === 0){
            list[i].style.display = "none";
        }else
            list[i].style.display = "flex";
    }
}

function clear() {
    for (let i = cross.length-1; i >= 0; i--){
        if (cross[i] === 1){
            todo.splice(i, 1);
            cross.splice(i, 1);
        }
    }
    rerenderItem();
}

showClear();
input.addEventListener('keydown', handleInput);
AllButton.addEventListener('click', all);
ActiveButton.addEventListener('click', active);
ComButton.addEventListener('click', completed);
ClearButton.addEventListener('click', clear);




