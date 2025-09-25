# Task Manager (Todo List)

A simple, responsive todo list web application built with HTML, CSS (Bootstrap), and JavaScript.

## Features

- Add, edit, delete tasks
- Set due dates
- Mark tasks as completed
- Filter tasks (All, Pending, Done)
- Responsive design
- Local storage support

## How Initial Tasks Are Loaded

When the todo list is loaded for the first time and there are no tasks saved in local storage, the app automatically fetches the first 5 tasks from a fake API (`https://jsonplaceholder.typicode.com/todos`).  
Since these API tasks do not include a due date, the app assigns today's date to each of them so they can be displayed and managed like regular tasks.

If you delete all 5 of these initial tasks, a message will appear indicating that there are no todos left in the list.

## Getting Started

Open `index.html` in your browser.

## File Structure

- `index.html`
- `style.css`
- `script.js`
- `README.md`