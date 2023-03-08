"use strict";

const wrapper = document.querySelector(".wrapper");
const game1 = new TicTacToe(wrapper);

window.addEventListener("storage", (e) => {
  const initState = JSON.parse(window.localStorage.getItem("storeGameState"));
  if (initState) {
    game1.view = initState.view;
    game1.gameOver = initState.gameOver;
    game1.turn = initState.turn;
    game1._init();
    game1._render();
  } else {
    game1.reset();
  }
});

game1.onWin = (p) => {
  alert("win " + p);
};
game1.onTie = () => {
  alert("tie");
};
