const path = require("path");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

// run when client connects
io.on("connection", (socket) => {
  console.log("New User Connected");

  //   welcome current user
  socket.emit("message", "Welcome to Chit Chat App");

  //   brodcarst when a user connects
  socket.broadcast.emit("message", "A user has joined the chat");

  // when client disconnects

  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    io.emit('message', msg);
  });
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
