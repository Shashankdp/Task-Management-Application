
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task');
    if (task.completed) {
      taskItem.classList.add('completed');
    }

    taskItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})" class="check">
      <span class="task-description">${task.description}</span>
      <button onclick="editTask(${index})" class="btn edit-button">Edit</button>
      <button onclick="deleteTask(${index})" class="btn delete-button">Delete</button>
      <span class="status">${task.completed ? 'Completed' : 'Pending'}</span>
    `;

    if(tasks[index].completed){
      taskItem.children[0].className = "completed";
    }

    taskList.append(taskItem);
  });
}

// Function to add a new task
function addTask(event) {
  event.preventDefault();
  const taskInput = document.getElementById('taskInput');
  const description = taskInput.value.trim();

  if (description) {
    const newTask = {
      description,
      completed: false
    };

    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
    saveTasks();
  }
}

// Function to toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
  saveTasks();
}

// Function to edit a task
function editTask(index) {
  const newDescription = prompt('Enter new task description:', tasks[index].description);

  if (newDescription) {
    tasks[index].description = newDescription;
    renderTasks();
    saveTasks();
  }
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  saveTasks();
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for form submission
const taskForm = document.getElementById('taskForm');
taskForm.addEventListener('submit', addTask);

// Initial rendering of tasks
renderTasks();