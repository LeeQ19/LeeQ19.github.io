const taskForm = document.querySelector(".js-taskForm"),
  taskInput = document.querySelector(".js-taskAdd"), 
  pendingList = document.querySelector(".js-pending"),
  finishedList = document.querySelector(".js-finished");

const LS_PENDING = "pendings",
  LS_FINISHED = "finisheds";

let pendings = [],
  finisheds = [];

function undoFinished(event) {
  const li = event.target.parentNode,
    targetId = parseInt(li.id);
  finishedList.removeChild(li);
  paintPending(finisheds.filter(function(task) {
    return task.id === targetId;
  })[0].text);
  const cleanTask = finisheds.filter(function (task) {
    return task.id !== targetId;
  });
  if (cleanTask.length === 0) {
    document.querySelector(".js-finishedTitle").style.display = "none";
  }
  finisheds = cleanTask;
  localStorage.setItem(LS_FINISHED, JSON.stringify(finisheds));
}

function deleteFinished(event) {
  const li = event.target.parentNode,
    targetId = parseInt(li.id);
  finishedList.removeChild(li);
  const cleanTask = finisheds.filter(function (task) {
    return task.id !== targetId;
  });
  if (cleanTask.length === 0) {
    document.querySelector(".js-finishedTitle").style.display = "none";
  }
  finisheds = cleanTask;
  localStorage.setItem(LS_FINISHED, JSON.stringify(finisheds));
}

function donePending(event) {
  const li = event.target.parentNode,
    targetId = parseInt(li.id);
  pendingList.removeChild(li);
  paintFinished(pendings.filter(function(task) {
    return task.id === targetId;
  })[0].text);
  const cleanTask = pendings.filter(function (task) {
    return task.id !== targetId;
  });
  if (cleanTask.length === 0) {
    document.querySelector(".js-pendingTitle").style.display = "none";
  }
  pendings = cleanTask;
  localStorage.setItem(LS_PENDING, JSON.stringify(pendings));
}

function deletePending(event) {
  const li = event.target.parentNode,
    targetId = parseInt(li.id);
  pendingList.removeChild(li);
  const cleanTask = pendings.filter(function (task) {
    return task.id !== targetId;
  });
  if (cleanTask.length === 0) {
    document.querySelector(".js-pendingTitle").style.display = "none";
  }
  pendings = cleanTask;
  localStorage.setItem(LS_PENDING, JSON.stringify(pendings));
}

function paintFinished(text) {
  document.querySelector(".js-finishedTitle").style.display = "block";
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("span");
  const undoBtn = document.createElement("span");
  const newId = finisheds.length;
  span.innerText = text;
  delBtn.innerText = "❌";
  undoBtn.innerText = "↩️";
  delBtn.className = "js-taskButton"
  undoBtn.className = "js-taskButton"
  delBtn.addEventListener("click", deleteFinished);
  undoBtn.addEventListener("click", undoFinished);
  li.appendChild(delBtn);
  li.appendChild(span);
  li.appendChild(undoBtn);
  li.id = newId;
  finishedList.appendChild(li);
  const taskObj = {
    id: newId,
    text: text,
  };
  finisheds.push(taskObj);
  localStorage.setItem(LS_FINISHED, JSON.stringify(finisheds));
}

function paintPending(text) {
  document.querySelector(".js-pendingTitle").style.display = "block";
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("span");
  const doneBtn = document.createElement("span");
  const newId = pendings.length;
  span.innerText = text;
  delBtn.innerText = "❌";
  doneBtn.innerText = "✔";
  delBtn.className = "js-taskButton"
  doneBtn.className = "js-taskButton"
  delBtn.addEventListener("click", deletePending);
  doneBtn.addEventListener("click", donePending);
  li.appendChild(delBtn);
  li.appendChild(span);
  li.appendChild(doneBtn);
  li.id = newId;
  pendingList.appendChild(li);
  const taskObj = {
    id: newId,
    text: text,
  };
  pendings.push(taskObj);
  localStorage.setItem(LS_PENDING, JSON.stringify(pendings));
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = taskInput.value;
  paintPending(currentValue);
  taskInput.value = "";
}

function loadTasks() {
  const loadedPendings = localStorage.getItem(LS_PENDING),
    loadedFinisheds = localStorage.getItem(LS_FINISHED);
  if (loadedPendings !== null && loadedPendings !== "[]") {
    const parsedPendings = JSON.parse(loadedPendings);
    parsedPendings.forEach(function (task) {
      paintPending(task.text);
    });
  }
  if (loadedFinisheds !== null && loadedFinisheds !== "[]") {
    const parsedFinished = JSON.parse(loadedFinisheds);
    parsedFinished.forEach(function (task) {
      paintFinished(task.text);
    });
  }
}

function init() {
  loadTasks();
  taskForm.addEventListener("submit", handleSubmit);
}

init();
