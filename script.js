const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
const deleteAllBtn = document.querySelector('footer button');

inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value;
    if(userEnteredValue.trim() !== 0) {
        addBtn.classList.add("active");
    }else {
        addBtn.classList.remove('active');
    }
}

showTasks();

addBtn.onclick = () => {
    let userEnteredValue = inputBox.value;
    let getLocalStorageData = localStorage.getItem("todo_app");

    if(getLocalStorageData == null) {
        list = [];
    }else {
        list = JSON.parse(getLocalStorageData);
    }
    list.push(userEnteredValue);
    localStorage.setItem('todo_app',JSON.stringify(list));
    showTasks();
    addBtn.classList.remove("active")
}

function showTasks() {
    let getLocalStorageData = localStorage.getItem("todo_app");
    if(getLocalStorageData == null) {
        list = [];
    }else{
        list = JSON.parse(getLocalStorageData);
    }

    const pendingTasks = document.querySelector('.pendingTasks')
    pendingTasks.textContent = list.length;

    if(list.length > 0) {
        deleteAllBtn.classList.add("active");
    }else {
        deleteAllBtn.classList.remove("active");
    }

    let newListItems = "";
    list.forEach((element,index) => {
        newListItems += `<li>${element} <span class="deleteTask" onclick="deleteTask(${index})">delete</span></li>` 
    })

    todoList.innerHTML = newListItems;
    inputBox.value = "";
}

function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("todo_app");

    list = JSON.parse(getLocalStorageData);
    list.splice(index,1);
    localStorage.setItem("todo_app",JSON.stringify(list));
    showTasks(); 
}

deleteAllBtn.onclick = () => {
    localStorage.setItem("todo_app",JSON.stringify([]));
    showTasks();
}