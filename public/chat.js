
const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

//emit => para emitir uma informação e o on => para receber uma informação

const usernameDiv = document.getElementById("username");
usernameDiv.innerHTML = `Olá ${username} - Você está na sala ${room}`;

socket.emit("joinRoom", {
  username,
  room,
}, (response) => {
    response.forEach((message) => {
        createMessage(message);
    });
});

document
  .getElementById("message_input")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const message = event.target.value;
      const data = {
        room,
        message,
        username,
      };

      console.log(data);
      socket.emit("message", data);

      event.target.value = "";
    }
  });

socket.on("message", (data) => {
  createMessage(data);
});

function createMessage(data) {
    const messageDiv = document.getElementById("messages");
  console.log(messageDiv);

  messageDiv.innerHTML += `
        <div class="messages" id="messages">
            <div class="new_message">
              <label class="form-label">
                <strong>${data.username}</strong> <span>${data.text} - ${dayjs(
    data.createAt
  ).format("DD/MM HH:mm")}</span>
              </label>
            </div>
          </div>
        `;
}

document.getElementById("logout").addEventListener("click", (event) => {
    window.location.href = "index.html";
});
