const wrapper = document.querySelector(".wrapper");

let view = [
  ["-", "-", "-"],
  ["-", "-", "-"],
  ["-", "-", "-"],
];
let count = 0;
let gameOver = "";

function render() {
  for (let i = 0; i < view.length; i++) {
    for (let j = 0; j < view[i].length; j++) {
      // here you make (0,0) index from above 2d array 0 index of div in html so that it render in the right div
      if (view[i][j] === "-") wrapper.children[i * 3 + j].innerText = "";
      else if (view[i][j] === "x") wrapper.children[i * 3 + j].innerText = "X";
      else if (view[i][j] === "o") wrapper.children[i * 3 + j].innerText = "O";
    }
  }
}
render();

function init() {
  for (let i = 0; i < wrapper.children.length; i++) {
    wrapper.children[i].addEventListener("click", (e) => {
      if (gameOver === "") {
        if (count % 2 === 0) {
          // here we convert i coming from the div to i,j to put the value in above view[i][j] and finally render the changed view to the frontend
          view[(i - (i % 3)) / 3][i % 3] = "x";
        } else {
          view[(i - (i % 3)) / 3][i % 3] = "o";
        }
        render();
        checkLine();
        document.querySelector(".gameOver").innerText = gameOver;
        count++;
      }
    });
  }
}

init();

function checkLine() {
  for (let i = 0; i < view.length; i++) {
    let rowValue = [];
    for (let j = 0; j < view[i].length; j++) {
      rowValue.push(view[i][j]);
    }
    if (rowValue[0] + rowValue[1] + rowValue[2] === "xxx")
      gameOver = "Hurray, X Win!!!";
    else if (rowValue[0] + rowValue[1] + rowValue[2] === "ooo")
      gameOver = "Hurray, O Win!!!";
  }
  for (let i = 0; i < view.length; i++) {
    let rowValue = [];
    for (let j = 0; j < view[i].length; j++) {
      rowValue.push(view[j][i]);
    }
    if (rowValue[0] + rowValue[1] + rowValue[2] === "xxx")
      gameOver = "Hurray, X Win!!!";
    else if (rowValue[0] + rowValue[1] + rowValue[2] === "ooo")
      gameOver = "Hurray, O Win!!!";
  }

  if (view[0][0] + view[1][1] + view[2][2] === "xxx")
    gameOver = "Hurray, X Win!!!";
  if (view[0][0] + view[1][1] + view[2][2] === "ooo")
    gameOver = "Hurray, O Win!!!";

  if (view[0][2] + view[1][1] + view[2][0] === "xxx")
    gameOver = "Hurray, X Win!!!";
  if (view[0][2] + view[1][1] + view[2][0] === "ooo")
    gameOver = "Hurray, O Win!!!";
}

function reset() {
  view = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];
  count = 0;
  gameOver = "";
  render();
}
