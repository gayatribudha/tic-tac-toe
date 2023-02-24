"use strict";

const wrapper = document.querySelector(".wrapper");
const game1 = new TicTacToe(wrapper);

game1.onWin = () => {
  setTimeout(() => alert("Game Over"), 200);
};
