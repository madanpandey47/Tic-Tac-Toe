let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset_button");
let new_btn = document.querySelector(".new_button");
let win = document.querySelector("#win");
let msg = document.querySelector(".msg");

let turn = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

win.classList.add("hide");

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "" && win.classList.contains("hide")) {
      box.innerText = turn ? "X" : "O";
      box.disabled = true;
      if (checkwinner()) {
        showwinner(turn ? "X" : "O");
      } else if (isDraw()) {
        showDraw();
      } else {
        turn = !turn;
      }
    }
  });
});

const checkwinner = () => {
  for (let pattern of winningCombinations) {
    const val1 = boxes[pattern[0]].innerText;
    const val2 = boxes[pattern[1]].innerText;
    const val3 = boxes[pattern[2]].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      return true;
    }
  }
  return false;
};

const isDraw = () => {
  for (let box of boxes) {
    if (box.innerText === "") {
      return false;
    }
  }
  return true;
};

const showwinner = (winner) => {
  msg.innerText = `Congratulations, The Winner is ${winner}! 🏆`;
  win.classList.remove("hide");
  new_btn.addEventListener("click", () => {
    msg.innerText = "";
  });
  disableBoxes();
};

const showDraw = () => {
  msg.innerText = "It's a Draw! Try Again.";
  new_btn.addEventListener("click", () => {
    msg.innerText = "";
  });
  win.classList.remove("hide");
};

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Reset game
const resetGame = () => {
  boxes.forEach((box) => {
    box.innerText = "";
    win.classList.remove("hide");
    new_btn.addEventListener("click", () => {
      msg.innerText = "";
    });
    disableBoxes();
  });
  turn = true;
  new_btn.addEventListener("click", () => {
    msg.innerText = "";
  });
  win.classList.add("hide");
};

resetbtn.addEventListener("click", resetGame);
new_btn.addEventListener("click", resetGame);
