import * as controller from "./controller.js";

function init() {
  console.log("View is life");
  document.addEventListener("keydown", arrowKeyPressed);
}

let direction;

function arrowKeyPressed(event) {
  console.log(event.key);
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      direction = "left";
      break;
    case "ArrowRight":
    case "d":
      direction = "right";
      break;
    case "ArrowDown":
    case "s":
      direction = "down";
      break;
    case "ArrowUp":
    case "e":
      direction = "up";
      break;
  }
}

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      console.log(controller.readFromCell(5, 5));

      // why times 10? skal det ikke skaleres til grideds størrelse...
      const index = row * 10 + col;

      switch (controller.readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}

export { init, direction, displayBoard };
