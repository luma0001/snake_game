"use strict";

window.addEventListener("load", start);
// NB: I en kø tilføjer vi normalt i bagenden af køen - i snake tilføjer vi i "hovedet" af slangen, som er bagenden af the queue .

let direction = "left";

const model = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const queue = [
  {
    row: 5,
    col: 5,
  },
  {
    row: 5,
    col: 6,
  },
  {
    row: 5,
    col: 7,
  },
];

for (const part of queue) {
  writeToCell(part.row, part.col, 0);
}

// ****** CONTROLLER ******
// #region controller

// const player = {
//   row: 5,
//   col: 5,
// };

function start() {
  document.addEventListener("keydown", arrowKeyPressed);
  console.log(`Javascript kører`);

  // start ticking
  tick();
}

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

// const newHead = {
//   row: queue[queue.length - 1].row,
//   col: queue[queue.length - 1].col,
//   // vi laver et hoved og det er vores player - vi sætter det ind i arrayet med et ushift
// };

function tick() {
  // setup next tick
  setTimeout(tick, 500);

  // TODO: Do stuff

  console.table(queue);

  const head = {
    row: queue[queue.length - 1].row,
    col: queue[queue.length - 1].col,
  };

  writeToCell(head.row, head.col, 0);

  switch (direction) {
    case "left":
      head.col--;
      if (head.col < 0) {
        head.col = 9;
      }
      break;
    case "right":
      head.col++;
      if (head.col > 9) {
        head.col = 0;
      }
      break;
    case "up":
      head.row--;
      if (head.row < 0) {
        head.row = 9;
      }
      break;
    case "down":
      head.row++;
      if (head.row > 9) {
        head.row = 0;
      }
      break;
  }

  queue.push(head);
  writeToCell(head.row, head.col, 1);

  const tail = queue.shift();
  writeToCell(tail.row, tail.col, 0);

  // display the model in full
  console.table(grid);
  displayBoard();
}

// #endregion controller

// ****** MODEL ******
// #region model

function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}
// #endregion model

// ****** VIEW ******
// #region view

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const index = row * 10 + col;

      switch (readFromCell(row, col)) {
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

// #endregion view
