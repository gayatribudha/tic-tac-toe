"use strict";

class TicTacToe {
  view = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];
  gameOver = "";
  turn = "x";
  constructor(wrapper) {
    this.wrapper = wrapper;
    this._render();
    this._init();
  }

  _render() {
    for (let i = 0; i < this.view.length; i++) {
      for (let j = 0; j < this.view[i].length; j++) {
        // here you make (0,0) index from above 2d array 0 index of div in html so that it render in the right div
        const nthChild = i * 3 + j;
        if (this.view[i][j] === "-")
          this.wrapper.children[nthChild].innerText = "";
        else if (this.view[i][j] === "x")
          this.wrapper.children[nthChild].innerText = "X";
        else if (this.view[i][j] === "o")
          this.wrapper.children[nthChild].innerText = "O";
      }
    }
  }

  _init() {
    for (let k = 0; k < this.wrapper.children.length; k++) {
      this.wrapper.children[k].addEventListener("click", (e) => {
        // here we convert i coming from the div to i,j to put the value in above view[i][j] and finally render the changed view to the frontend
        const i = (k - (k % 3)) / 3;
        const j = k % 3;
        if (this.gameOver === "" && this.view[i][j] === "-") {
          if (this.turn === "x") this.view[i][j] = "x";
          else if (this.turn === "o") this.view[i][j] = "o";
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

    const firstDiagnol = this.view[0][0] + this.view[1][1] + this.view[2][2];
    this._checkRow(firstDiagnol);

    const secondDiagnol = this.view[0][2] + this.view[1][1] + this.view[2][0];
    this._checkRow(secondDiagnol);

    if (this.gameOver !== "") this.onWin();
  }

  onWin() {}

  reset() {
    this.view = [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ];
    this.count = 0;
    this.gameOver = "";
    this._render();
  }
}
