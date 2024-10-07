window.addEventListener("load", init);

import * as view from "./view.js";
import * as model from "./model.js";
import { Queue } from "./queue.js";

let queue;

function init() {
  console.log("Controller is live");
  view.init();
  model.init();

  queue = new Queue();

  queue.enqueue({ row: 5, col: 5 });
  queue.enqueue({ row: 5, col: 6 });
  queue.enqueue({ row: 5, col: 7 });

  console.log(model.grid);
  tick();
}

function tick() {
  setTimeout(tick, 500);

  console.log("cols");
  console.table(model.grid.cols - 1);

  const head = queue.first.data;
  //{   row: queue.first.data.row,
  //   col: queue.first.data.col, };

  console.log("write to head 1");
  writeToCell(head.row, head.col, 0);

  switch (view.direction) {
    case "left":
      head.col--;
      if (head.col < 0) {
        head.col = model.grid.cols - 1;
      }
      break;
    case "right":
      head.col++;
      if (head.col > model.grid.cols - 1) {
        head.col = 0;
      }
      break;
    case "up":
      head.row--;
      if (head.row < 0) {
        head.row = model.grid.rows - 1;
      }
      break;
    case "down":
      head.row++;
      if (head.row > model.grid.rows - 1) {
        head.row = 0;
      }
      break;
  }

  queue.enqueue(head);
  console.log("write to head 2");
  writeToCell(head.row, head.col, 1);

  // queue.dequeue();
  // console.log("write to head 3");
  // writeToCell(queue.last.data.row, queue.last.data.col, 0);

  // display the model in full
  console.log("TABLE");
  console.log(model.grid);
  view.displayBoard();
}

function writeToCell(row, col, value) {
  console.log("write cell: ", row, col, value);
  model.grid.set(row, col, value);
}

function readFromCell(row, col) {
  return model.grid.get(row, col);
}

export { writeToCell, readFromCell };
