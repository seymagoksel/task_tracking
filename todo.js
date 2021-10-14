const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstcardbody = document.querySelectorAll(".card-body")[0];
const secondcardbody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners();

function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondcardbody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos(e) {
    if (confirm("Tüm görevleri silmek istediğinize emin misiniz?")) {
        const listItems = document.querySelectorAll(".list-group-item");
        listItems.forEach(element => {
            element.remove();
        });
        localStorage.removeItem("todos");
        // todoList.innerHTML = "";
        // while(todoList.firstElementChild != null){
        //     todoList.removeChild(todoList.firstElementChild);
        // }
    }
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();

    // const listItems = document.getElementsByClassName("list-group-item");

    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(element => {

        const text = element.textContent.toLowerCase();

        if (text.indexOf(filterValue) === -1) {

            element.setAttribute("style", "display : none !important");
        } else {
            element.setAttribute("style", "display : block");
        }

    })
}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Görev başarıyla silindi...");
    }
}

function deleteTodoFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();

    let index = todos.indexOf(deleteTodo);
    if (index > -1) {
        todos.splice(index, 1);
    }
    // todos.forEach(function(todo, index){ 
    //     if(todo === deleteTodo){
    //         todos.splice(index,1);
    //     }      
    // })  

    localStorage.setItem("todos", JSON.stringify(todos));

}

function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function (element) {
        addTodoToUI(element);
    });

}

function addTodo(e) {

    const newTodo = todoInput.value.trim();

    if (newTodo == "") {
        showAlert("danger", "Lütfen bir görev giriniz...");
    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Görev başarıyla eklendi...")
    }

    e.preventDefault();
}

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosFromStorage() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}


function showAlert(type, message) {
    /*<div class="alert alert-danger" role="alert">
        This is a danger alert—check it out!
    </div>*/
    const alert = document.createElement("div");

    alert.className = "alert alert-" + type;
    alert.textContent = message;

    firstcardbody.appendChild(alert);

    setTimeout(function () {
        alert.remove();
    }, 2000);

}


function addTodoToUI(newTodo) {
    /*<li class="list-group-item d-flex justify-content-between">
                        Görev 1
                        <a href="#" class="delete-item">
                            <i class="fa fa-remove"></i>
                        </a>

                    </li>*/

    const listItem = document.createElement("li");
    const link = document.createElement("a");

    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);

    todoInput.value = "";
}
