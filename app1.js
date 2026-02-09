let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const today = new Date().toDateString();
const lastDay = localStorage.getItem("lastDay");

if (lastDay !== today) {
  tasks = tasks.map(t => ({ ...t, done: false }));
  localStorage.setItem("lastDay", today);
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("newTask");
  if (!input.value) return;

  tasks.push({ text: input.value, done: false });
  input.value = "";
  save();
  render();
}

function render() {
  const list = document.getElementById("taskList");
  const counter = document.getElementById("counter");

  list.innerHTML = "";

  let completed = 0;

  tasks.forEach((task) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    checkbox.onchange = () => {
      task.done = checkbox.checked;
      save();
      render();
    };

    if (task.done) completed++;

    li.appendChild(checkbox);
    li.append(task.text);
    list.appendChild(li);
  });

  counter.textContent = `${completed} / ${tasks.length} completate`;
}

render();