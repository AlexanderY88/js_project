'use strict';


// global tasks array
let tasks = getTasks();
// global filter: completed/pending/all
let filter = "completed";

// loading tasks
document.addEventListener("DOMContentLoaded", () => initialize());


document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menuButton');
    const menu = document.getElementById('menu');
    const menuIcon = document.getElementById('menuIcon');
    if(menuButton && menu && menuIcon) {
        menuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            menu.classList.toggle('hidden');
            if (menu.classList.contains('hidden')) {
                menuIcon.className = 'bi bi-list';
            } else {
                menuIcon.className = 'bi bi-x-lg';
            }
        });
        // Optional: close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && e.target !== menuButton && !menuButton.contains(e.target)) {
                menu.classList.add('hidden');
                menuIcon.className = 'bi bi-list';
            }
        });
    }
});






function initialize() {
    const LSTasks = getTasks();
    if (LSTasks.length > 0) {
        tasks = LSTasks;
        console.log("Loaded tasks from local storage.");
    }
    else {
        async function fetchAPITasks() {
            const url = "https://jsonplaceholder.typicode.com/todos?_limit=5";
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: $(response.status)`);
                }
                const result = await response.json(); 
                return result;
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchAPITasks();
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

function renderTasks() {
    const tasksListElement = document.getElementById("tasksListElement");
    tasksListElement.innerHTML = '';
    console.log("tasks: " + tasks);
    tasks.forEach(task => {
        if(filter === "all" && task) {
            const newLiElement = document.createElement("li");
            newLiElement.textContent = task.title;
            tasksListElement.appendChild(newLiElement);
        }else if(filter === "completed") {
            // create element
            const newLiElement = document.createElement("li");
            newLiElement.textContent = task.title;
            tasksListElement.appendChild(newLiElement);
        }else {
            if(!tasks.completed) {
             const newLiElement = document.createElement("li");
            newLiElement.textContent = task.title;
            tasksListElement.appendChild(newLiElement);
            }
        }
    });
}

const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', function() {
  menu.classList.toggle('hidden');
});

/*
הערה:
יש פונקציה של 
addTask
לכן אני ממליץ קודם לכתוב אותה. להגדיר מבנה כללי למשימה ואז ששולפים מהשרת את הפונקציות, להמיר אותם למבנה שהגדרו ב
addTask

'use strict';
// global tasks array
let tasks;
// global filter: "completed" / "pending" / "all"
let filter = "all";
addEventListener("DOMContentLoaded", () => initialize())
function getTasks() {
    const LSTasks = localStorage.getItem("tasks");
    if (LSTasks) {
        return JSON.parse(LSTasks);
    } else {
        return [];
    }
}
function setTasks(tasks) {
    const jsonString = JSON.stringify(tasks);
    localStorage.setItem("tasks", jsonString);
}
function renderTasks() {
    const tasksListElement = document.getElementById("tasksList");
    tasksListElement.innerHTML = "";
    tasks.forEach(task => {
        if (filter === "all") {
            const liElement = document.createElement("li");
            liElement.innerHTML = task.title;
            tasksListElement.appendChild(liElement);
            // add css rules depends on the task status
        }
    });
}


//fetch tasks from the server
async function fetchAPITasks() {
    const url = "https://jsonplaceholder.typicode.com/todos?_limit=5";
    try {
        const response = await fetch(url);
        // ok means that the status is 200
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error.message);
    }
}
/*
function to initialize the application
if no tasks exist in the local storage then it will fetch from the server
*/

// ync function initialize() {
//     const LSTasks = getTasks();
//     if (LSTasks.length > 0) {
//         tasks = LSTasks;
//     } else {
//         try {
//             const serverTasks = await fetchAPITasks();
//             // refactor: instead of directly put tasks from the server, use the addTask method for each one
//             tasks = serverTasks;
//             setTasks(tasks);
//         } catch (error) {
//             console.error(error.message);
//         }
//     }
//     renderTasks();
// }


// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Task Manager</title>
//     <link rel="stylesheet" href="./style.css">
// </head>
// <body>
//     <h1>Task manager</h1>
//     <div>
//         <form onsubmit="test()">
//             <label for="taskDescription">Task description</label>
//             <input id="taskDescription" type="text" placeholder="Description">
//             <label for="taskDueDate">Deadline</label>
//             <input id="taskDueDate" type="date">
//             <button type="submit">Add task</button>
//         </form>
//     </div>
//     <div>
//         <button>All</button>
//         <button>Completed</button>
//         <button>Pending</button>
//     </div>
//     <div>
//         <button>Sort by date</button>
//     </div>
//     <ul id="tasksList">
//         <li>one item defined in the HTML</li>
//     </ul>
//     <script src="./script.js" />
// </body>
// </html>


// */'use strict';


// global tasks array
let tasks = getTasks();
// global filter: completed/pending/all
let filter = "completed";

// loading tasks
document.addEventListener("DOMContentLoaded", () => initialize());


document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menuButton');
    const menu = document.getElementById('menu');
    const menuIcon = document.getElementById('menuIcon');
    if(menuButton && menu && menuIcon) {
        menuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            menu.classList.toggle('hidden');
            if (menu.classList.contains('hidden')) {
                menuIcon.className = 'bi bi-list';
            } else {
                menuIcon.className = 'bi bi-x-lg';
            }
        });
        // Optional: close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && e.target !== menuButton && !menuButton.contains(e.target)) {
                menu.classList.add('hidden');
                menuIcon.className = 'bi bi-list';
            }
        });
    }
});






function initialize() {
    const LSTasks = getTasks();
    if (LSTasks.length > 0) {
        tasks = LSTasks;
        console.log("Loaded tasks from local storage.");
    }
    else {
        async function fetchAPITasks() {
            const url = "https://jsonplaceholder.typicode.com/todos?_limit=5";
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: $(response.status)`);
                }
                const result = await response.json(); 
                return result;
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchAPITasks();
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

function renderTasks() {
    const tasksListElement = document.getElementById("tasksListElement");
    tasksListElement.innerHTML = '';
    console.log("tasks: " + tasks);
    tasks.forEach(task => {
        if(filter === "all" && task) {
            const newLiElement = document.createElement("li");
            newLiElement.textContent = task.title;
            tasksListElement.appendChild(newLiElement);
        }else if(filter === "completed") {
            // create element
            const newLiElement = document.createElement("li");
            newLiElement.textContent = task.title;
            tasksListElement.appendChild(newLiElement);
        }else {
            if(!tasks.completed) {
             const newLiElement = document.createElement("li");
            newLiElement.textContent = task.title;
            tasksListElement.appendChild(newLiElement);
            }
        }
    });
}

const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', function() {
  menu.classList.toggle('hidden');
});

/*
הערה:
יש פונקציה של 
addTask
לכן אני ממליץ קודם לכתוב אותה. להגדיר מבנה כללי למשימה ואז ששולפים מהשרת את הפונקציות, להמיר אותם למבנה שהגדרו ב
addTask

'use strict';
// global tasks array
let tasks;
// global filter: "completed" / "pending" / "all"
let filter = "all";
addEventListener("DOMContentLoaded", () => initialize())
function getTasks() {
    const LSTasks = localStorage.getItem("tasks");
    if (LSTasks) {
        return JSON.parse(LSTasks);
    } else {
        return [];
    }
}
function setTasks(tasks) {
    const jsonString = JSON.stringify(tasks);
    localStorage.setItem("tasks", jsonString);
}
function renderTasks() {
    const tasksListElement = document.getElementById("tasksList");
    tasksListElement.innerHTML = "";
    tasks.forEach(task => {
        if (filter === "all") {
            const liElement = document.createElement("li");
            liElement.innerHTML = task.title;
            tasksListElement.appendChild(liElement);
            // add css rules depends on the task status
        }
    });
}


//fetch tasks from the server
async function fetchAPITasks() {
    const url = "https://jsonplaceholder.typicode.com/todos?_limit=5";
    try {
        const response = await fetch(url);
        // ok means that the status is 200
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error.message);
    }
}
/*
function to initialize the application
if no tasks exist in the local storage then it will fetch from the server
*/

// ync function initialize() {
//     const LSTasks = getTasks();
//     if (LSTasks.length > 0) {
//         tasks = LSTasks;
//     } else {
//         try {
//             const serverTasks = await fetchAPITasks();
//             // refactor: instead of directly put tasks from the server, use the addTask method for each one
//             tasks = serverTasks;
//             setTasks(tasks);
//         } catch (error) {
//             console.error(error.message);
//         }
//     }
//     renderTasks();
// }


// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Task Manager</title>
//     <link rel="stylesheet" href="./style.css">
// </head>
// <body>
//     <h1>Task manager</h1>
//     <div>
//         <form onsubmit="test()">
//             <label for="taskDescription">Task description</label>
//             <input id="taskDescription" type="text" placeholder="Description">
//             <label for="taskDueDate">Deadline</label>
//             <input id="taskDueDate" type="date">
//             <button type="submit">Add task</button>
//         </form>
//     </div>
//     <div>
//         <button>All</button>
//         <button>Completed</button>
//         <button>Pending</button>
//     </div>
//     <div>
//         <button>Sort by date</button>
//     </div>
//     <ul id="tasksList">
//         <li>one item defined in the HTML</li>
//     </ul>
//     <script src="./script.js" />
// </body>
// </html>


// */