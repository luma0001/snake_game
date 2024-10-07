import { Queue } from "./queue.js";
import { Grid } from "./grid.js";

window.addEventListener("load", init);

const GRID_HEIGHT = 20;
const GRID_WIDTH = 30;
let direction = "right";
let score = 0;
let grid;
let gameOver = false;

function init() {
  document.querySelector("#game_over_text").innerHTML = "";
  console.log(`Init kører`);
  createTheGrid();
  displayGoal();
  displayGrid();
  document.addEventListener("keydown", keyDown);
  tick();
}

// ****** CONTROLLER ******
// #region controller
function keyDown(event) {
  let eventDirection;
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      eventDirection = "left";
      break;
    case "ArrowRight":
    case "d":
      eventDirection = "right";
      break;
    case "ArrowUp":
    case "w":
      eventDirection = "up";
      break;
    case "ArrowDown":
    case "s":
      eventDirection = "down";
      break;
    default:
      break;
  }

  if (checkForCounterMovement(eventDirection) != true) {
    direction = eventDirection;
  }
}

function checkForCounterMovement(eventDirection) {
  console.log("Direction: ", direction, " eventDirection: ", eventDirection);
  if (
    (direction === "left" && eventDirection === "right") ||
    (direction === "right" && eventDirection === "left") ||
    (direction === "up" && eventDirection === "down") ||
    (direction === "down" && eventDirection === "up")
  ) {
    return true;
  } else {
    return false;
  }
}

function tick() {
  if (gameOver) {
    return;
  }
  setTimeout(tick, 100);

  let current = queue.head;
  while (current) {
    grid.set(current.data.row, current.data.col, 0);
    current = current.next;
  }
  const head = {
    row: queue.tail.data.row,
    col: queue.tail.data.col,
  };

  queue.dequeue();

  // Move the head based on the direction
  switch (direction) {
    case "left":
      head.col--;
      if (head.col < 0) {
        head.col = GRID_WIDTH - 1;
      }
      break;
    case "right":
      head.col++;
      if (head.col >= GRID_WIDTH) {
        head.col = 0;
      }
      break;
    case "up":
      head.row--;
      if (head.row < 0) {
        head.row = GRID_HEIGHT - 1;
      }
      break;
    case "down":
      head.row++;
      if (head.row >= GRID_HEIGHT) {
        head.row = 0;
      }
      break;
    default:
      break;
  }

  // Checks for colotions between head and snake-body
  if (checkIfSnakeIsInCell(head.row, head.col)) {
    gameIsOver();
  }

  // Checks if goal is "eaten"
  if (grid.get(head.row, head.col) === 2) {
    goalTaken();
  }

  queue.enqueue(head);

  // Make the snake follow the head?
  current = queue.head;
  while (current) {
    grid.set(current.data.row, current.data.col, 1);
    current = current.next;
  }

  updateGrid();
}

function gameIsOver() {
  gameOver = true;
  document.querySelector("#game_over_text").innerHTML = "GAME OVER";
}

// Takes a set of cell cordinates and returns true if it appears in the snake-queue
function checkIfSnakeIsInCell(row, col) {
  let node = queue.head;
  while (node) {
    if (node.data.row === row && node.data.col === col) {
      if (node !== queue.head) {
        console.log("BANG - cell is inside snake");
        return true;
      }
    }
    node = node.next;
  }
  return false;
}

// #endregion controller

// ****** MODEL ******
// #region model

function createTheGrid() {
  grid = new Grid(GRID_HEIGHT, GRID_WIDTH);
  grid.fill(0);
}

let queue = new Queue();
queue.enqueue({ row: 5, col: 5 });
queue.enqueue({ row: 5, col: 6 });
queue.enqueue({ row: 5, col: 7 });

// #endregion model

// ****** VIEW ******
// #region view
function displayGrid() {
  const board = document.querySelector("#grid");
  board.style.setProperty("--GRID_WIDTH", GRID_WIDTH);
  board.style.setProperty("--GRID_HEIGHT", GRID_HEIGHT);

  // this following will create cells in the grid
  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      board.appendChild(cell);
    }
  }
}

function goalTaken() {
  // enlargens the length of snake queue by 1
  queue.enqueue({ row: queue.tail.data.row, col: queue.tail.data.col });

  // updates the score value
  displayScore(score++);
  console.log(`Score: ${score}`);
  // set delay to spawning of new goal
  setTimeout(displayGoal, 1500);
}

// Generates new goal at random cell
function displayGoal() {
  const row = Math.floor(Math.random() * GRID_HEIGHT);
  const col = Math.floor(Math.random() * GRID_WIDTH);
  console.log(`row: ${row}, col: ${col}`);
  grid.set(row, col, 2);
}

function displayScore(score) {
  const scoreElement = document.querySelector("#score");
  scoreElement.textContent = `Score: ${score}`;
}

function updateGrid() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const index = row * GRID_WIDTH + col;

      switch (grid.get(row, col)) {
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
