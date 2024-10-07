import { Queue } from "./queue.js";

const que = new Queue();

const element1 = {
  row: 5,
  col: 5,
};

const element2 = {
  row: 5,
  col: 6,
};

const element3 = {
  row: 5,
  col: 7,
};

que.enqueue(element1);
que.enqueue(element2);
que.enqueue(element3);


console.log(que.peek());
