const addButton = document.querySelector('#add-task');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const taskCount = document.querySelector('#task-count');

loadTasks();
updateTaskCount();

function addTask() {
    const task = taskInput.value.trim();

    if (task) {
        createTaskElement(task);
        taskInput.value = '';
        saveTasks();
        updateTaskCount();
    } else {
        alert('Please enter a task :)');
    }
}

addButton.addEventListener('click', addTask);

// Add task when pressing Enter
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function createTaskElement(task) {
    const taskItem = document.createElement('li');
    
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task;
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-task';
    deleteButton.innerHTML = '<i class="fas fa-trash"></i> Delete';
    
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    deleteButton.addEventListener('click', function() {
        taskItem.classList.add('fade-out');
        setTimeout(() => {
            taskList.removeChild(taskItem);
            saveTasks();
            updateTaskCount();
        }, 300);
    });
}

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(function(item) {
        tasks.push(item.querySelector('.task-text').textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTaskElement);
}

function updateTaskCount() {
    const count = taskList.children.length;
    taskCount.textContent = `${count} ${count === 1 ? 'task' : 'tasks'}`;
}