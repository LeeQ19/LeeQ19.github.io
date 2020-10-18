const nameContainer = document.querySelector(".js-name");

function paintName(name) {
  nameContainer.innerHTML = "";
  const title = document.createElement("span");
  title.className = "js-nameText";
  title.innerHTML = `Hello ${name}`;
  nameContainer.appendChild(title);
}

function handleSubmit(event) {
  event.preventDefault();
  const input = event.target.querySelector("input");
  const value = input.value;
  localStorage.setItem("user", value);
  paintName(value);
}

function paintInput() {
  const input = document.createElement("input");
  input.placeholder = "What's your name?";
  input.type = "text";
  input.className = "js-nameInput";
  const form = document.createElement("form");
  form.addEventListener("submit", handleSubmit);
  form.appendChild(input);
  nameContainer.appendChild(form);
}

function loadName() {
  const name = localStorage.getItem("user");
  if (name === null) {
    paintInput();
  } else {
    paintName(name);
  }
}

function init() {
  loadName();
}

init();