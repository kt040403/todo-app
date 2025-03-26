const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = [];

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        isEditing: false
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = '';
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-enter', 'flex', 'items-center', 'justify-between', 'bg-white', 'p-3', 'rounded-md', 'shadow-sm', 'border', 'border-gray-200');

        if (task.isEditing) {
            li.innerHTML = `
                <input 
                    type="text" 
                    value="${task.text}" 
                    class="flex-grow mr-2 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    data-id="${task.id}"
                >
                <div class="space-x-2">
                    <button 
                        onclick="saveEditedTask(${task.id})" 
                        class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                        保存
                    </button>
                    <button 
                        onclick="cancelEdit(${task.id})" 
                        class="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
                    >
                        キャンセル
                    </button>
                </div>
            `;
        } else {
            li.innerHTML = `
                <span class="flex-grow ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}">
                    ${task.text}
                </span>
                <div class="space-x-2">
                    <button 
                        onclick="toggleTask(${task.id})" 
                        class="${task.completed
                    ? 'bg-yellow-500 text-white'
                    : 'bg-green-500 text-white'} 
                            px-3 py-1 rounded hover:opacity-80 transition"
                    >
                        ${task.completed ? '未完了' : '完了'}
                    </button>
                    <button 
                        onclick="startEdit(${task.id})" 
                        class="bg-blue-500 text-white px-3 py-1 rounded hover:opacity-80 transition"
                    >
                        編集
                    </button>
                    <button 
                        onclick="deleteTask(${task.id})" 
                        class="bg-red-500 text-white px-3 py-1 rounded hover:opacity-80 transition"
                    >
                        削除
                    </button>
                </div>
            `;
        }

        taskList.appendChild(li);

        if (task.isEditing) {
            const editInput = li.querySelector('input');
            editInput.focus();
            editInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') saveEditedTask(task.id);
            });
        }
    });
}

function toggleTask(taskId) {
    tasks = tasks.map(task =>
        task.id === taskId
            ? { ...task, completed: !task.completed, isEditing: false }
            : task
    );
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

function startEdit(taskId) {
    tasks = tasks.map(task =>
        task.id === taskId
            ? { ...task, isEditing: true }
            : { ...task, isEditing: false }
    );
    renderTasks();
}

function cancelEdit(taskId) {
    tasks = tasks.map(task =>
        task.id === taskId
            ? { ...task, isEditing: false }
            : task
    );
    renderTasks();
}

function saveEditedTask(taskId) {
    const editInput = document.querySelector(`input[data-id="${taskId}"]`);
    const newText = editInput.value.trim();

    if (newText) {
        tasks = tasks.map(task =>
            task.id === taskId
                ? { ...task, text: newText, isEditing: false }
                : task
        );
        renderTasks();
    }
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

renderTasks();