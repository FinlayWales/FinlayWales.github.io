// Textbox Resizing
let messageInputBox = document.getElementById("message-input-box");
let sendButton = document.getElementById("send-button");

sendButton.style.height = messageInputBox.offsetHeight + "px";

messageInputBox.addEventListener("input", function(e) {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight - 30 + "px";
});

// Socket
const socket = io();
socket.on("connect", () => {
    console.log(socket.id);
});