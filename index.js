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

let blocker = "x";
io.on("connection", (socket) => {
  if (blocker === "x") blocker = "o";
  else blocker = "x";
  const path = socket.request.headers.referer;
  let url = new URL(path);
  const pathId = url.pathname.substring(1);
  if (globalGameState[pathId] != undefined) {
    socket.emit("Game State", {
      ...globalGameState[pathId],
      blockTurn: blocker,
    });
  } else {
    socket.emit("Game State", {
      view: [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"],
      ],
      gameOver: "",
      turn: "x",
      blockTurn: blocker,
    });
  }
  socket.on("Game State", (gameState) => {
    globalGameState[gameState.pathname] = gameState;
    io.emit("Game State", {
      ...globalGameState[gameState.pathname],
      blockTurn: blocker,
    });
  });
});

server.listen(3000, () => {
  console.log("listening on localhost:3000");
});
