'use strict';

// global tasks array
let tasks = getTasks();
// global filter: completed/pending/all
let filter = "all";

// loading tasks
document.addEventListener("DOMContentLoaded", () => {
    fetchInitialTasks();
    addTask();
});
 

// load tasks from ls and fetch initial tasks from API if local storage is empty
async function fetchInitialTasks() {
    const LSTasks = getTasks();
    if (LSTasks.length > 0) {
        tasks = LSTasks;
        console.log("Loaded tasks from local storage.");
    }
    else {
        // fetch tasks from API if there is no tasks in local storage, returns 5 tasks
        const url = "https://jsonplaceholder.typicode.com/todos?_limit=5";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json(); 
            tasks = result;
            saveTasks(tasks);
        } catch (error) {
            console.log(error.message);
        }
    } 
    renderTasks();
}


// load tasks from local storage
function getTasks() {
    const LSTasks = localStorage.getItem("tasks");
    if (LSTasks) {
        return JSON.parse(LSTasks);
    }
    return [];
}

// saves data to tasks in local storage
function saveTasks(tasks) {
    const jsonString = JSON.stringify(tasks);
    localStorage.setItem("tasks", jsonString);
}

// add new task
function addTask() {
    const form = document.querySelector(".addTaskForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.innerText = "";
        const taskInputElement = document.getElementById("todoText");
        const dateInputElement = document.getElementById("dueDate");
        const date = dateInputElement.value;
        const title = taskInputElement.value.trim();
        if (title) {
            if (date) {
                let now = new Date();
                now.setHours(0, 0, 0, 0);
                let selectedDate = new Date(dateInputElement.value);
                selectedDate.setHours(0, 0, 0, 0);
                if (selectedDate.getTime() >= now.getTime()) {
                    if (editingTaskId !== null) {
                        // Find and update the existing task
                        const task = tasks.find(t => t.id === editingTaskId);
                        if (task) {
                            task.title = title;
                            task.date = dateInputElement.value;
                        }
                        editingTaskId = null;
                    } else {
                        // Add new task
                        let taskId = Math.floor(Math.random() * 10000);
                        tasks.push({ id: taskId, title: title, completed: false, date: dateInputElement.value });
                    }
                    saveTasks(tasks);
                    renderTasks();
                    taskInputElement.value = "";
                    dateInputElement.value = "";
                } else {
                    errorMessage.innerText = "Please enter a future date.";
                }
            } else {
                errorMessage.innerText = "Please enter a date.";
            }
        } else {
            errorMessage.innerText = "Task title cannot be empty.";
        }
    });
}

// render tasks based on the filter
function renderTasks() {
    const tasksListElement = document.getElementById("tasksListElement");
    tasksListElement.innerHTML = '';
    let taskList = [];
    tasks.forEach(task => {
        if (filter === "all") {
            taskList.push(task);
        } else if (filter === "done" && task.completed) {
            taskList.push(task);
        } else if (filter === "active" && !task.completed) {
            taskList.push(task);
        }
    });
    taskList.sort((a, b) => new Date(a.date) - new Date(b.date));
    printSortedTasks(taskList);
}

// the filter function is sitting in the html , here only validations if any tasks exist and if no tasks found for the filter, show message
function filterTasks(taskList, filter) {
    if (taskList.length === 0) {
        const noTasksMsg = document.createElement("li");
        noTasksMsg.className = "list-group-item text-center text-muted";
        if (filter === "completed") {
            noTasksMsg.textContent = "No completed tasks found.";
        } else if (filter === "pending") {
            noTasksMsg.textContent = "No pending tasks found.";
        } else {
            noTasksMsg.textContent = "No tasks found.";
        }
        tasksListElement.appendChild(noTasksMsg);
        return true;
    }
}

function printSortedTasks(taskList) {
    if (filterTasks(taskList, filter)) {
        return;
    }
    for (const task of taskList) {
        /* in api there is no parameter of date, so to make appearance clear will add today date as a task date */
        let date = Date.now();
        if (!task.date) {
            task.date = date;
        }
        /* check ID , if not exists - add new Id for the task */
        if (!task.id) {
            task.id = Math.floor(Math.random() * 10000);
        }
        /* create li element for each task */
        const liElement = document.createElement("li");
        liElement.className = "list-group-item d-flex justify-content-between align-items-center w-100";
        /* add html content */
        liElement.innerHTML = `
            <div class="task-text d-flex flex-column flex-grow-1 mb-2 mb-md-0">
                <span class="fw-bold${task.completed ? ' text-decoration-line-through' : ''}">${task.title}</span>
                <small class="text-muted">${formatDate(task.date)}</small>
            </div>
            <div class="d-flex flex-row flex-md-row gap-1 flex-shrink-0">
                <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${task.id}" onclick="editTask(${task.id})"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-outline-success complete-btn" data-id="${task.id}" onclick="completeTask(${task.id})"><i class="bi bi-check-lg"></i></button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${task.id}" onclick="deleteTask(${task.id})"><i class="bi bi-trash"></i></button>
            </div>
        `;
        /* print the html element on a screen */
        tasksListElement.appendChild(liElement);
    }
}

// sort tasks by date
function sortTasksByDate() {
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    saveTasks(tasks);
}

// show completed tasks
function showCompletedTasks() {
    filter = "done";
    renderTasks();
}

// show pending tasks
function showPendingTasks() {
    filter = "active";
    renderTasks();
}

// show all tasks
function showAllTasks() {
    filter = "all";
    renderTasks();
}

// format date to dd/mm/yyyy
function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

// buttons listeners
document.getElementById("showCompletedTasksBtn").addEventListener("click", showCompletedTasks);

// global variable to track editing state
let editingTaskId = null;
// edit task
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        document.getElementById("todoText").focus();
        document.getElementById("todoText").value = task.title;
        document.getElementById("dueDate").value = new Date(task.date).toISOString().split("T")[0];
        editingTaskId = id; // the id of task that is editing
    }
}


function completeTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        if (!task.completed) {
            task.completed = true;
            saveTasks(tasks);
            renderTasks();
        } else {
            task.completed = false;
            saveTasks(tasks);
            renderTasks();
        }
    }
}

function deleteTask(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        tasks.splice(index, 1); // Remove the task at the found index
        saveTasks(tasks);
        renderTasks();
    }
}

// buttons:
document.getElementById("showAllTasksBtn").addEventListener("click", showAllTasks);
document.getElementById("showPendingTasksBtn").addEventListener("click", showPendingTasks);
