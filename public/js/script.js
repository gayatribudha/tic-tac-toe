"use strict";

const wrapper = document.querySelector(".wrapper");
const game1 = new TicTacToe(wrapper);
let socket = io();

game1.onWin = (p) => {
  alert("win " + p);
};
game1.onTie = () => {
  alert("tie");
};
let socketIds = [];
let socketArray = [];
socket.on("Game State", (gameState) => {
  console.log(gameState);
  console.log(game1);
  console.log(game1.blockTurn);
  if (game1.blockTurn === undefined) game1.blockTurn = gameState.blockTurn;
  document.querySelector(".player").innerText =
    game1.blockTurn === "o" ? "You are Player X." : "You are Player O.";
  if (window.location.pathname.substring(1) === gameState.pathname) {
    game1.setGameState(gameState);
  }
});

game1.onGameStateChangeEvent = (gameState) => {
  socket.emit("Game State", {
    ...gameState,
    pathname: window.location.pathname.split("/")[1],
  });
};
