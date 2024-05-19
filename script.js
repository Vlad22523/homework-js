const list = document.getElementById("todo-list");
const itemCountSpan = document.getElementById("item-count");
const uncheckedCountSpan = document.getElementById("unchecked-count");

let todos = loadTodos();

function newTodo() {
  const task = prompt("Enter your task");
  if (task) {
    const newTask = {
      id: Date.now(),
      text: task,
      checked: false,
    };
    todos.push(newTask);
    saveTodos();
    render();
  }
}

function render() {
  list.innerHTML = "";
  todos.forEach((todo) => {
    list.insertAdjacentHTML("beforeend", renderTodo(todo));
  });
  updateCounter();
}

function renderTodo(todo) {
  return `
        <li class="list-group-item">
            <input type="checkbox" class="form-check-input me-2" id="${
              todo.id
            }" ${todo.checked ? "checked" : ""} onchange="checkTodo(${
    todo.id
  })"/>
            <label for="${todo.id}">
                <span class="${
                  todo.checked
                    ? "text-success text-decoration-line-through"
                    : ""
                }">${todo.text}</span>
            </label>
            <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${
              todo.id
            })">delete</button>
        </li>
    `;
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter((todo) => !todo.checked).length;
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  render();
}

function checkTodo(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      todo.checked = !todo.checked;
    }
    return todo;
  });
  saveTodos();
  render();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
}

render();
