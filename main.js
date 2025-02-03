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

function addTask() {
    let task_text = taskInput.value.trim().slice(0, 250);
    if (task_text === '') return;
    tasks.innerHTML += taskTemplate.replace('%TEXT%', task_text);
    taskInput.value = '';
    document.querySelector('.empty').style.display = 'none';
    document.querySelectorAll('.task-close').forEach(btn => {
        btn.addEventListener('click', deleteTask);
    });
    document.querySelectorAll('.check').forEach(checkbox => {
        checkbox.addEventListener('change', completeTask);
    });

}

function deleteTask() {
    this.parentNode.parentNode.removeChild(this.parentNode);
    if (document.querySelectorAll('.task').length === 0) {
        document.querySelector('.empty').style.display = 'flex';
    }
}

function completeTask() {
    taskText = this.nextElementSibling;
    if (this.checked) {
        taskText.style.textDecoration = 'line-through';
        taskText.style.color = 'var(--placeholder)';
    }
    else {
        taskText.style.textDecoration = 'none';
        taskText.style.color = 'var(--blackish)';
    }
}

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

window.addEventListener('beforeunload', function () {
    let tasksData = [];
    document.querySelectorAll('.task').forEach(task => {
        let taskText = task.querySelector('.task-text').textContent;
        let isChecked = task.querySelector('.check').checked;
        tasksData.push({ text: taskText, checked: isChecked });
    });
    localStorage.setItem('tasks', JSON.stringify(tasksData));
});


document.addEventListener('DOMContentLoaded', function () {
    let tasksData = JSON.parse(localStorage.getItem('tasks'));

    if (tasksData.length > 0) {
        document.querySelector('.empty').style.display = 'none';
        tasksData.forEach(task => {
            tasks.innerHTML += taskTemplate.replace('%TEXT%', task.text);

            if (task.checked) {
                // TODO: Не сохранятся состояние checked
            }

        });

        document.querySelectorAll('.task-close').forEach(btn => {
            btn.addEventListener('click', deleteTask);
        });
        document.querySelectorAll('.check').forEach(checkbox => {
            checkbox.addEventListener('change', completeTask);
        });

    } else document.querySelector('.empty').style.display = 'flex';
});
