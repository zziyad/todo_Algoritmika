
export default class ToDoItem {
 
  constructor({ id, value, status = 0 }) {
    this.id = id;
    this.value = value;
    this.status = status;
  }

  toString() {
    return `${this.id}\t${this.value} ${this.status ? "\t(complete)" : ""}`;

  };
};

