// Access necessary elements
const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Function to load tasks from localStorage
function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
}

// Function to save tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to render tasks on the page
function renderTasks() {
  const tasks = loadTasks();
  taskList.innerHTML = ""; // Clear the list

  tasks.forEach((taskText) => {
    const taskItem = document.createElement("li");

    // Add task text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskItem.appendChild(taskSpan);

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteTask(taskText);
    });
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  });
}

// Function to add a task
function addTask(event) {
  event.preventDefault(); // Prevent default form submission

  const taskText = taskInput.value.trim(); // Get the value of the input and remove whitespace
  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  const tasks = loadTasks();
  tasks.push(taskText); // Add the new task to the array
  saveTasks(tasks); // Save the updated array to localStorage

  renderTasks(); // Re-render the task list
  taskInput.value = ""; // Clear the input field
  alert("Task successfully added!");
}

// Function to delete a task
function deleteTask(taskText) {
  const tasks = loadTasks();
  const updatedTasks = tasks.filter((task) => task !== taskText); // Remove the selected task
  saveTasks(updatedTasks); // Save the updated array to localStorage

  renderTasks(); // Re-render the task list
  alert("Task successfully deleted!");
}

// Attach event listener to the form
todoForm.addEventListener("submit", addTask);

// Load and render tasks on page load
renderTasks();
