const today = new Date().toISOString().split('T')[0];
let tasks = JSON.parse(localStorage.getItem('tasks') || '{}');
let labels = JSON.parse(localStorage.getItem('labels') || '[]');
let themeColor = localStorage.getItem('themeColor') || '#4285f4';

document.documentElement.style.setProperty('--primary-color', themeColor);

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  renderLabels();
  renderDay();
  renderWeek();
  renderMonth();
  setupSettings();
});

function setupNavigation() {
  const views = ['day', 'week', 'month', 'settings'];
  views.forEach(v => {
    document.getElementById(`${v}-view-btn`)?.addEventListener('click', () => showView(v));
  });
}

function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.getElementById(`${name}-view`).classList.remove('hidden');
  if (name === 'week') renderWeek();
  if (name === 'month') renderMonth();
}

function renderLabels() {
  const list = document.getElementById('labels');
  list.innerHTML = '';
  labels.forEach(l => {
    const option = document.createElement('option');
    option.value = l;
    list.appendChild(option);
  });
}

// Day view
function renderDay() {
  const schedule = document.getElementById('day-schedule');
  schedule.innerHTML = '';
  for (let h = 0; h < 24; h++) {
    const slot = document.createElement('div');
    slot.className = 'time-slot';
    slot.dataset.time = `${String(h).padStart(2, '0')}:00`;
    slot.addEventListener('dragover', e => e.preventDefault());
    slot.addEventListener('drop', onDrop);
    const label = document.createElement('span');
    label.className = 'time-label';
    label.textContent = slot.dataset.time;
    slot.appendChild(label);
    const dayTasks = tasks[today] || {};
    if (dayTasks[slot.dataset.time]) {
      const t = createTaskElement(dayTasks[slot.dataset.time]);
      slot.appendChild(t);
    }
    schedule.appendChild(slot);
  }
  renderTaskPool();
  document.getElementById('add-task-btn').onclick = addTask;
}

function renderTaskPool() {
  const pool = document.getElementById('task-pool');
  pool.innerHTML = '';
  const poolTasks = (tasks[`${today}-pool`] || []);
  poolTasks.forEach((t, idx) => {
    const el = createTaskElement(t);
    el.dataset.poolIndex = idx;
    pool.appendChild(el);
  });
}

function createTaskElement(task) {
  const el = document.createElement('div');
  el.className = 'task';
  el.textContent = `${task.label}: ${task.text}`;
  el.style.background = task.color || 'var(--task-default-color)';
  el.draggable = true;
  el.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', JSON.stringify(task));
  });
  return el;
}

function addTask() {
  const text = document.getElementById('task-text').value.trim();
  const label = document.getElementById('task-label').value.trim();
  const color = document.getElementById('task-color').value || '#1a73e8';
  if (!text) return;
  const task = { text, label, color };
  const poolTasks = tasks[`${today}-pool`] || [];
  poolTasks.push(task);
  tasks[`${today}-pool`] = poolTasks;
  if (label && !labels.includes(label)) {
    labels.push(label);
    localStorage.setItem('labels', JSON.stringify(labels));
    renderLabels();
  }
  saveTasks();
  renderTaskPool();
  document.getElementById('task-text').value = '';
}

function onDrop(e) {
  e.preventDefault();
  const task = JSON.parse(e.dataTransfer.getData('text/plain'));
  const time = e.currentTarget.dataset.time;
  tasks[today] = tasks[today] || {};
  tasks[today][time] = task;
  const poolTasks = tasks[`${today}-pool`] || [];
  const idx = poolTasks.findIndex(t => t.text === task.text && t.label === task.label);
  if (idx > -1) {
    poolTasks.splice(idx, 1);
    tasks[`${today}-pool`] = poolTasks;
  }
  saveTasks();
  renderDay();
  renderWeek();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Week view
function renderWeek() {
  const weekDiv = document.getElementById('week-tasks');
  weekDiv.innerHTML = '';
  const current = new Date();
  const dayOfWeek = current.getDay();
  for (let i = 0; i < 7; i++) {
    const date = new Date(current);
    date.setDate(current.getDate() - dayOfWeek + i);
    const dateKey = date.toISOString().split('T')[0];
    const dayTasks = tasks[dateKey] || {};
    const dayDiv = document.createElement('div');
    dayDiv.innerHTML = `<h3>${dateKey}</h3>`;
    Object.keys(dayTasks).forEach(t => {
      const task = dayTasks[t];
      const p = document.createElement('div');
      p.textContent = `${t} - ${task.label}: ${task.text}`;
      p.style.color = task.color;
      dayDiv.appendChild(p);
    });
    weekDiv.appendChild(dayDiv);
  }
}

// Month view
function renderMonth() {
  const cal = document.getElementById('month-calendar');
  cal.innerHTML = '';
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const start = firstDay.getDay();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  for (let i = 0; i < start; i++) {
    const empty = document.createElement('div');
    empty.className = 'calendar-day';
    cal.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const day = document.createElement('div');
    day.className = 'calendar-day';
    const span = document.createElement('span');
    span.textContent = d;
    day.appendChild(span);
    const appointmentsDiv = document.createElement('div');
    appointmentsDiv.className = 'appointments';
    const dayTasks = tasks[dateKey] || {};
    Object.keys(dayTasks).forEach(t => {
      const div = document.createElement('div');
      const task = dayTasks[t];
      div.textContent = `${task.label}: ${task.text}`;
      div.style.color = task.color;
      appointmentsDiv.appendChild(div);
    });
    day.appendChild(appointmentsDiv);
    day.addEventListener('click', () => addAppointment(dateKey));
    cal.appendChild(day);
  }
}

function addAppointment(dateKey) {
  const text = prompt('Appointment description');
  if (!text) return;
  const label = prompt('Label') || '';
  const color = prompt('Color (hex)', '#1a73e8');
  tasks[dateKey] = tasks[dateKey] || {};
  const timeKey = Object.keys(tasks[dateKey]).length + 1;
  tasks[dateKey][`A${timeKey}`] = { text, label, color };
  if (label && !labels.includes(label)) {
    labels.push(label);
    localStorage.setItem('labels', JSON.stringify(labels));
    renderLabels();
  }
  saveTasks();
  renderMonth();
  renderWeek();
}

// Settings
function setupSettings() {
  const input = document.getElementById('theme-color');
  input.value = themeColor;
  input.addEventListener('input', e => {
    themeColor = e.target.value;
    document.documentElement.style.setProperty('--primary-color', themeColor);
    localStorage.setItem('themeColor', themeColor);
  });
}