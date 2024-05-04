let socket = io();

const inputs = document.querySelectorAll("input[name='request']");
const msgList = document.querySelector("ul");

inputs.forEach((input, index) => {
  input.addEventListener("click", e => {
    socket.emit("request", e.target.value);
    input.disabled = true;
    inputs[inputs.length - 1 - index].disabled = false;
  });
});

socket.on("request", msg => {
  const listMsg = document.createElement("li");
  listMsg.textContent = msg;
  msgList.appendChild(listMsg);
  console.log(msg);
});