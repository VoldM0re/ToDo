const taskInput = document.getElementById('adding-task');
const addButton = document.querySelector('.task-add');
const tasks = document.querySelector('.tasks');

let taskTemplate =
    `<div class="task-box">
        <label class="task-input task">
            <input type="checkbox" class="check">
            <span class="task-text">%TEXT%</span>
        </label>
        <input type="button" class="action_button task-close" value="╳">
    </div>`

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', function (event) { if (event.key === 'Enter') addTask(); });
window.addEventListener('beforeunload', saveTasks);
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const inputText = taskInput.value.trim().slice(0, 250);
    if (inputText === '') return;
    else if (encrypt(inputText) == '109210991074109210991074') { saveTasks(); feature(); return; }

    taskInput.value = '';
    document.querySelector('.empty').style.display = 'none';

    tasks.insertAdjacentHTML('beforeend', taskTemplate.replace('%TEXT%', inputText));

    const lastTask = tasks.lastElementChild;
    lastTask.querySelector('.task-close').addEventListener('click', deleteTask);
    lastTask.querySelector('.check').addEventListener('change', completeTask);
}

function deleteTask() {
    this.parentNode.parentNode.removeChild(this.parentNode);
    if (document.querySelectorAll('.task').length === 0) {
        document.querySelector('.empty').style.display = 'flex';
    }
}

function completeTask() {
    taskSpan = this.nextElementSibling;

    if (this.checked) {
        taskSpan.style.textDecoration = 'line-through';
        taskSpan.style.color = 'var(--placeholder)';
    }
    else {
        taskSpan.style.textDecoration = 'none';
        taskSpan.style.color = 'var(--blackish)';
    }
}

function encrypt(str) {
    string = ''
    for (let i = 0; i < str.length; i++) {
        let ascii = str[i].codePointAt(0);
        string += ascii
    }
    return string;
}

function feature() {
    const body = document.querySelector('body');
    document.querySelector('main').style.display = 'none';
    body.style.backgroundColor = 'var(--blackish)';
    body.style.color = 'white';
    body.innerText = ':)';
    const audio = new Audio('src/sound/effect.mp3');
    setTimeout(() => {
        body.innerText = '';
        document.querySelector('body').style.background = 'url(src/img/image.jpg)';
        audio.play();
    }, 4000);
}

function saveTasks() {
    const tasksData = [];
    if (document.querySelector('main').style.display != 'none') {
        document.querySelectorAll('.task').forEach(task => {
            const taskText = task.querySelector('.task-text').textContent;
            const isChecked = task.querySelector('.check').checked;
            tasksData.push({ text: taskText, checked: isChecked });
        });
        localStorage.setItem('tasks', JSON.stringify(tasksData));
    }
}

function loadTasks() {
    const tasksData = JSON.parse(localStorage.getItem('tasks'));

    if (tasksData.length > 0) {
        document.querySelector('.empty').style.display = 'none';
        tasksData.forEach(task => {
            tasks.insertAdjacentHTML('beforeend', taskTemplate.replace('%TEXT%', task.text));
            if (task.checked) {
                taskSpan = tasks.lastChild.querySelector('span');
                tasks.lastChild.querySelector('.check').checked = true;
                taskSpan.style.textDecoration = 'line-through';
                taskSpan.style.color = 'var(--placeholder)';
            }
        });

        document.querySelectorAll('.task-close').forEach(btn => {
            btn.addEventListener('click', deleteTask);
        });

        document.querySelectorAll('.check').forEach(checkbox => {
            checkbox.addEventListener('change', completeTask);
        });

    } else document.querySelector('.empty').style.display = 'flex';
}