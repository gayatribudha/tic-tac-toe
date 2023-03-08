"use strict";

const wrapper = document.querySelector(".wrapper");
const game1 = new TicTacToe(wrapper);
game1.onWin = (p) => {
  alert("win " + p);
};
game1.onTie = () => {
  alert("tie");
};
