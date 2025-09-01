'use strict';
let tasks = getTasks();
document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
});
// load tasks from local storage
function getTasks() {
    const LSTasks = localStorage.getItems("tasks");
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

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
    });
}