import { Grid } from "./grid.js";

let grid;

function init() {
  console.log("Model is live");
  createGrid(10, 10);
}

function createGrid(gridWidhth, gridHeight) {
  grid = new Grid(gridWidhth, gridHeight);
}

export { init, grid };
