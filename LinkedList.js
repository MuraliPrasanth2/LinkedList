class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  #first = null;
  #last = null;
  #count = 0;
  #isEmpty() {
    return this.#first === null;
  }

  addFirst(value) {
    const newNode = new Node(value);
    if (this.#isEmpty()) this.#first = this.#last = newNode;
    else {
      newNode.next = this.#first;
      this.#first = newNode;
    }

    this.#count++;
  }

  addLast(value) {
    const newNode = new Node(value);
    if (this.#isEmpty()) this.#first = this.#last = newNode;
    else {
      this.#last.next = newNode;
      this.#last = newNode;
    }

    this.#count++;
  }

  removeFirst() {
    if (this.#isEmpty()) throw new Error("No item in the list");

    if (this.#first === this.#last) this.#first = this.#last = null;
    else {
      const removedNode = this.#first;
      this.#first = this.#first.next;
      removedNode.next = null;
    }

    this.#count--;
  }

  removeLast() {
    if (this.#isEmpty()) throw new Error("No item in the list");

    if (this.#first === this.#last) this.#first = this.#last = null;
    else {
      let previous = this.getPrevious(this.#last);
      previous.next = null;
      this.#last = previous;
    }

    this.#count--;
  }

  getPrevious(node) {
    let previous = this.#first;
    while (previous.next !== null) {
      if (previous.next === node) return previous;
      previous = previous.next;
    }
  }

  indexOf(value) {
    let position = 0;
    let current = this.#first;
    while (current !== null) {
      if (current.value === value) return position;
      current = current.next;
      position++;
    }
    return -1;
  }

  contains(value) {
    return this.indexOf(value) !== -1;
  }

  size() {
    return this.#count;
  }

  toArray() {
    let array = [];
    let current = this.#first;
    while (current !== null) {
      array.push(current.value);
      current = current.next;
    }
    return array;
  }

  reverse() {
    if (this.#isEmpty()) return;

    let previous = this.#first;
    let current = this.#first.next;

    while (current != null) {
      const next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }

    this.#last = this.#first;
    this.#last.next = null;
    this.#first = previous;
  }

  kthNodeFromEnd(k) {
    if (k < 1 || k > this.#count) throw new Error("Index out of range.");

    let first = this.#first;
    let second = this.#first;

    let targetDistance = k - 1;
    let distance = 0;

    while (distance < targetDistance) {
      second = second.next;
      distance++;
    }

    while (second.next != null) {
      first = first.next;
      second = second.next;
    }

    return first;
  }

  printMiddle() {
    if (this.#isEmpty()) console.log("There are no elemenets in the list.");
    if (this.hasLoop())
      console.log(
        "The list has a loop, so, we wont be able to find the middle."
      );
    let ones = this.#first;
    let twos = this.#first;
    while (twos !== this.#last && twos.next !== this.#last) {
      ones = ones.next;
      twos = twos.next.next;
    }
    if (twos === this.#last) console.log(ones.value);
    else console.log(`${ones.value}, ${ones.next.value}`);
  }

  hasLoop() {
    let ones = this.#first;
    let twos = this.#first;
    while (ones !== null && twos !== null && twos.next !== null) {
      ones = ones.next;
      twos = twos.next.next;
      if (ones === twos) return true;
    }
    return false;
  }
}

export { LinkedList as default };
