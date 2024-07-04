const taskList = document.getElementById('tasks');
const completedTaskList = document.getElementById('completed-tasks');
const addTaskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');

let tasks = [];
let completedTasks = [];

addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();
    if (task) {
        const taskObj = {
            id: Date.now(),
            task,
            completed: false,
            createdAt: new Date().toLocaleString(),
            completedAt: null
        };
        tasks.push(taskObj);
        taskInput.value = '';
        renderTasks();
    }
});

taskList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const taskId = e.target.dataset.taskId;
        const task = tasks.find((task) => task.id === parseInt(taskId));
        task.completed = true;
        task.completedAt = new Date().toLocaleString();
        completedTasks.push(task);
        tasks = tasks.filter((task) => task.id !== parseInt(taskId));
        renderTasks();
        renderCompletedTasks();
    }
});

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const taskHTML = `
            <li data-task-id="${task.id}">
                ${task.task}
                <span>${task.createdAt}</span>
            </li>
        `;
        taskList.innerHTML += taskHTML;
    });
}

function renderCompletedTasks() {
    completedTaskList.innerHTML = '';
    completedTasks.forEach((task) => {
        const taskHTML = `
            <li data-task-id="${task.id}">
                <s>${task.task}</s>
                <span>Completed at: ${task.completedAt}</span>
            </li>
        `;
        completedTaskList.innerHTML += taskHTML;
    });
}

renderTasks();
renderCompletedTasks();