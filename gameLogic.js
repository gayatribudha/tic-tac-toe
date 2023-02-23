"use strict";

class TicTacToe {
  view = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];
  count = 0;
  gameOver = "";
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.render();
    this.init();
    this.onMessage();
  }

  render() {
    for (let i = 0; i < this.view.length; i++) {
      for (let j = 0; j < this.view[i].length; j++) {
        // here you make (0,0) index from above 2d array 0 index of div in html so that it render in the right div
        if (this.view[i][j] === "-")
          this.wrapper.children[i * 3 + j].innerText = "";
        else if (this.view[i][j] === "x")
          this.wrapper.children[i * 3 + j].innerText = "X";
        else if (this.view[i][j] === "o")
          this.wrapper.children[i * 3 + j].innerText = "O";
      }
    }
  }

  init() {
    for (let i = 0; i < this.wrapper.children.length; i++) {
      this.wrapper.children[i].addEventListener("click", (e) => {
        if (this.gameOver === "") {
          if (this.count % 2 === 0) {
            // here we convert i coming from the div to i,j to put the value in above view[i][j] and finally render the changed view to the frontend
            if (this.view[(i - (i % 3)) / 3][i % 3] === "-")
              this.view[(i - (i % 3)) / 3][i % 3] = "x";
          } else {
            if (this.view[(i - (i % 3)) / 3][i % 3] === "-")
              this.view[(i - (i % 3)) / 3][i % 3] = "o";
          }
          this.render();
          this.checkLine();
          this.onMessage();
          this.count++;
        }
      });
    }
  }

  checkLine() {
    for (let i = 0; i < this.view.length; i++) {
      let rowValue = [];
      for (let j = 0; j < this.view[i].length; j++) {
        rowValue.push(this.view[i][j]);
      }
      if (rowValue[0] + rowValue[1] + rowValue[2] === "xxx")
        this.gameOver = "Hurray, X Win!!!";
      else if (rowValue[0] + rowValue[1] + rowValue[2] === "ooo")
        this.gameOver = "Hurray, O Win!!!";
    }
    for (let i = 0; i < this.view.length; i++) {
      let rowValue = [];
      for (let j = 0; j < this.view[i].length; j++) {
        rowValue.push(this.view[j][i]);
      }
      if (rowValue[0] + rowValue[1] + rowValue[2] === "xxx")
        this.gameOver = "Hurray, X Win!!!";
      else if (rowValue[0] + rowValue[1] + rowValue[2] === "ooo")
        this.gameOver = "Hurray, O Win!!!";
    }

    if (this.view[0][0] + this.view[1][1] + this.view[2][2] === "xxx")
      this.gameOver = "Hurray, X Win!!!";
    if (this.view[0][0] + this.view[1][1] + this.view[2][2] === "ooo")
      this.gameOver = "Hurray, O Win!!!";

    if (this.view[0][2] + this.view[1][1] + this.view[2][0] === "xxx")
      this.gameOver = "Hurray, X Win!!!";
    if (this.view[0][2] + this.view[1][1] + this.view[2][0] === "ooo")
      this.gameOver = "Hurray, O Win!!!";
  }

  alertMessage() {
    alert(this.gameOver);
  }

  onMessage() {
    if (this.gameOver != "") {
      setTimeout(this.alertMessage.bind(this), 200);
    }
  }

  reset() {
    this.view = [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ];
    this.count = 0;
    this.gameOver = "";
    this.render();
    this.onMessage();
  }
}
