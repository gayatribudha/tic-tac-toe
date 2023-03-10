const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

let globalGameState = {};

app.get("/:pathname", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  const path = socket.request.headers.referer;
  let url = new URL(path);

  const pathId = url.pathname.substring(1);
  if (globalGameState[pathId] != undefined) {
    socket.emit("Game State", globalGameState[pathId]);
  }
  socket.on("Game State", (gameState) => {
    globalGameState[gameState.pathname] = gameState;
    io.emit("Game State", globalGameState[gameState.pathname]);
  });
});

server.listen(3000, () => {
  console.log("listening on localhost:3000");
});
