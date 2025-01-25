// script.js

// Selectors
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTodos);

// Add Task
todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const task = todoInput.value.trim();
  if (task) {
    addTodoItem(task);
    saveToLocalStorage(task);
    todoInput.value = '';
  }
});

// Add task to the DOM
function addTodoItem(task, isCompleted = false) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  if (isCompleted) li.classList.add('completed');

  li.innerHTML = `
    <span>${task}</span>
    <div>
      <button class="complete-btn">✔</button>
      <button class="delete-btn">✖</button>
    </div>
  `;

  // Mark as completed
  li.querySelector('.complete-btn').addEventListener('click', () => {
    li.classList.toggle('completed');
    updateLocalStorage();
  });

  // Delete task
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
    updateLocalStorage();
  });

  todoList.appendChild(li);
}

// Save task to local storage
function saveToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ task, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTodos() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(({ task, completed }) => addTodoItem(task, completed));
}

// Update local storage after modification
function updateLocalStorage() {
  const tasks = Array.from(todoList.children).map((li) => ({
    task: li.querySelector('span').textContent,
    completed: li.classList.contains('completed'),
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}