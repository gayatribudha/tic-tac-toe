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

socket.on("Game State", (gameState) => {
  if (window.location.pathname.substring(1) === gameState.pathname) {
    game1.setGameState(gameState);
  }
});

game1.onGameStateChange = (gameState) => {
  socket.emit("Game State", {
    ...gameState,
    pathname: window.location.pathname.split("/")[1],
  });
};
