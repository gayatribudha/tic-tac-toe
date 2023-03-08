"use strict";

class TicTacToe {
  view;
  gameOver;
  turn;

  reset() {
    this.view = [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ];
    this.count = 0;
    this.gameOver = "";
    this.turn = "x";
    this._render();
  }

  constructor(wrapper) {
    this.wrapper = wrapper;
    this.reset();
    this._init();
  }

  _render() {
    for (let i = 0; i < this.view.length; i++) {
      for (let j = 0; j < this.view[i].length; j++) {
        const nthChild = i * 3 + j;
        if (this.view[i][j] === "-")
          this.wrapper.children[nthChild].innerText = "";
        else if (this.view[i][j] === "x") {
          this.wrapper.children[nthChild].innerText = "X";
        } else if (this.view[i][j] === "o")
          this.wrapper.children[nthChild].innerText = "O";
      }
    }
  }

  _init() {
    for (
      let nthChild = 0;
      nthChild < this.wrapper.children.length;
      nthChild++
    ) {
      this.wrapper.children[nthChild].addEventListener("click", (e) => {
        const i = (nthChild - (nthChild % 3)) / 3;
        const j = nthChild % 3;
        if (this.gameOver === "" && this.view[i][j] === "-") {
          if (this.turn === "x") {
            this.view[i][j] = "x";
          } else if (this.turn === "o") this.view[i][j] = "o";
          this._render();
          this._checkLine();
          this._yourTurn();
        }
      });
    }
  }

  _yourTurn() {
    if (this.turn === "x") this.turn = "o";
    else if (this.turn === "o") this.turn = "x";
  }

  _checkTie() {
    console.log(this.view.flat());
    if (!this.view.flat().includes("-")) setTimeout(this.onTie);
  }

  _checkRow(row) {
    if (row === "xxx") this.gameOver = "x";
    else if (row === "ooo") this.gameOver = "o";
  }

  _checkLine() {
    for (let i = 0; i < this.view.length; i++) {
      this._checkRow(this.view[i].join(""));
    }

    for (let i = 0; i < this.view.length; i++) {
      let rowValue = [];
      for (let j = 0; j < this.view[i].length; j++) {
        rowValue.push(this.view[j][i]);
      }
      this._checkRow(rowValue.join(""));
    }

    const firstDiagonal = this.view[0][0] + this.view[1][1] + this.view[2][2];
    this._checkRow(firstDiagonal);

    const secondDiagonal = this.view[0][2] + this.view[1][1] + this.view[2][0];
    this._checkRow(secondDiagonal);

    if (this.gameOver !== "") setTimeout(() => this.onWin(this.gameOver), 0);

    if (this.gameOver === "") this._checkTie();
  }

  onWin() {}
  onTie() {}
}
