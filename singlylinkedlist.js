

class Node {
  constructor(data) {
    this.next = null;
    this.data = data;
  }
}

export default class SinglyLinkList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.indexes = 0;
  }

  add(data) {
    const node = new Node(data);

    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.indexes++;
  }

  remove(data) {
    const nodeToRemove = this.getNodeWithData(data);
    this.removeNode(nodeToRemove);
  }

  getLast() {
    if (this.head != null) {
      let node = this.head;
      while (node) {
        if (node.next === null) {
          return node.data;
        }
        nodeCurrent = currentNode.next;
      }
    } else {
      console.log("List empty");
      return;
    }
  }

  getFirst() {
    if (this.head != null) {
      return this.head.data;
    } else {
      console.log("List empty");
      return;
    }
  }

  /* ----------------------------------
              Node Methods:
  --------------------------------- */

  getNextNode(node) {
    if (this.head != null) {
      let currentNode = this.head;
      while (currentNode) {
        if (currentNode === node) {
          return currentNode.next;
        }
        currentNode = currentNode.next;
      }
    } else {
      console.log("List empty");
      return;
    }
  }

  getNodeWithData(data) {
    if (this.head != null) {
      let node = this.head;
      while (node) {
        if (node.data === data) {
          return node;
        }
        node = node.next;
      }
    } else {
      console.log("List empty");
      return;
    }
  }

  getLastNode() {
    if (this.head != null) {
      let node = this.head;
      while (node) {
        // hvis den næste node er null har vi fadt i den sidste - "tail"
        if (node.next === null) {
          return node;
        }
        node = node.next;
      }
    } else {
      console.log("List empty");
      return;
    }
  }

  getFirstNode() {
    if (this.head != null) {
      return this.head;
    } else {
      console.log("List empty");
      return;
    }
  }

  removeFirstNode() {
    // fjerner første node fra lsiten
    const firstNode = this.getFirstNode();
    this.head = firstNode.next;
    this.indexes--;
  }

  removeLastNode() {
    if (this.head != null) {
      let node = this.head;
      while (node && node.next) {
        console.log("node:", node);
        console.log("next node: ", node);
        console.log("next next node", node);
        // hvis den næstes node, næstes node er null er dét den sidste, og som vi ønsker at fjerne.
        if (node.next.next === null) {
          console.log("almost final: ", node);
          // vi gør den næstsidste til den sidste
          node.next = null;
          this.indexes--;
          return;
        }
        node = node.next;
      }
    } else {
      console.log("List empty");
      return;
    }
  }

  removeNode(nodeToRemove) {
    // Hvis first er null er listen tom!
    if (this.head != null) {
      if (nodeToRemove === this.head) {
        this.removeFirstNode();
        this.indexes--;
        return;
      } else {
        let nodeCurrent = this.head;
        while (nodeCurrent && nodeCurrent.next) {
          if (nodeCurrent.next === nodeToRemove) {
            nodeCurrent.next = nodeToRemove.next;
            this.indexes--;
          }
          nodeCurrent = nodeCurrent.next;
        }
      }
    } else {
      console.log("List empty");
      return;
    }
  }

  /* ----------------------------------
              List Methods:
  --------------------------------- */

  clear() {
    if (this.head != null) {
      this.head = null;
      console.log("List empty");
      return;
    }
  }

  size() {
    return this.indexes;
  }

  dumpList() {
    if (this.head != null) {
      let node = this.head;
      while (node !== null) {
        console.log("dump: ", node);
        node = node.next;
      }
    } else {
      console.log("List empty");
      return;
    }
  }
}
