class Node {
  constructor(data) {
    this.next = null;
    this.data = data;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.countNodes = 0;
  }

  // adds the data behind the que
  enqueue(data) {
    // At first head and tail is the same element.
    const newNode = new Node(data);
    if (this.first === null && this.last === null) {
      this.first = newNode;
      this.last = newNode;
      this.countNodes++;

      // If there is a first - make the new node the tail
    } else if (this.first && this.last) {
      // make head point backwards to new node and so on - newest node is the tail
      const currentLastNode = this.last;
      currentLastNode.next = newNode;
      // Then the new node is now declaed tail - it already points at null
      this.last = newNode;
      this.countNodes++;
    }
  }

  dequeue() {
    if (this.first !== null && this.last !== null) {
      // const nodeToRemove = this.first;
      const nextNodeInLine = this.first.next;
      this.first = nextNodeInLine;
      this.countNodes--;
    }
  }

  peek() {
    return this.first.data;
  }

  size() {
    return this.countNodes;
  }

  get(index) {
    let node = this.first;
    // console.log(node);
    let i = 0;
    while (node) {
      if (i == index) {
        return node.data;
      }
      i++;
      node = node.next;
    }
   return null; 
  }
}

export { Queue };
