const addButton = document.querySelector('#add-task');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');


loadTasks();

function addTask() {
    const task = taskInput.value.trim();

    if (task) {
        createTaskElement(task);

        taskInput.value = '';
        saveTasks();
    } else {
        alert('Enter a task :)');
    }
}
addButton.addEventListener('click', addTask);


function createTaskElement(task) {
    const taskItem = document.createElement('li');
    taskItem.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-task';

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskItem);
        saveTasks();
    })
}

function saveTasks() {
    tasks = [];
    taskList.querySelectorAll('li').forEach(function (item)  {
        tasks.push(item.textContent.replace('Delete', '').trim());

    localStorage.setItem('tasks', JSON.stringify(tasks));
    });
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTaskElement);
}