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
    const [a, b, c] = pattern;
    const val1 = boxes[a].innerText;
    const val2 = boxes[b].innerText;
    const val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      return true;
    }
  }
  return false;
};

const isDraw = () => {
  return Array.from(boxes).every((box) => box.innerText !== "");
};

const showwinner = (winner) => {
  msg.innerText = `Congratulations. The Winner is ${winner}! 🏆`;
  win.classList.remove("hide");
  disableBoxes();
};

const showDraw = () => {
  msg.innerText = "It's a Draw! Try Again.";
  win.classList.remove("hide");
};

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const resetGame = () => {
  enableBoxes();
  msg.innerText = "";
  win.classList.add("hide");
  turn = true;
};

resetbtn.addEventListener("click", resetGame);
new_btn.addEventListener("click", resetGame);
