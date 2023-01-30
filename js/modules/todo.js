import ToDoItem from './todoItem.js';

const MONTH_NAMES = [
  'January', 'February', 'March',
  'April', 'May', 'June', 'July',
  'August', 'September', 'October',
  'November', 'December'
];

export default class ToDo {
  constructor() {
    this.date = this.setDate();
    this.itemId = 1;
    this.item = null;
    this.items = [];
    this.form = {
      focus: false,
      valid: false
    };
    this.orderItems();
  }

  addItem(item) {
    this.item = new ToDoItem({
      id: this.itemId++,
      value: item
    });
    this.items.unshift(this.item);
    // this.saveItems();
  }

  findItemIndex(id) {
    return this.items.findIndex((item) => {
      return item.id === id;
    });
  }

  deleteItem(id) {
    const itemIndex = this.findItemIndex(id);
    this.items.splice(itemIndex, 1);
    // this.saveItems();
  }

  toggleItemStatus(id) {
    const itemIndex = this.findItemIndex(id);
    this.items[itemIndex].status = this.items[itemIndex].status ? 0 : 1;
    this.orderItems();
    // this.saveItems();
  }

  orderItems() {
    const todo = this.items.filter((item) => {
      return item.status === 0;
    });
    const done = this.items.filter((item) => {
      return item.status === 1;
    });
    this.items = [...todo, ...done];
  }


  sortByName(bool = true) {
    return this.items.sort((a, b) => {
      const first = a['value'].toUpperCase();
      const second = b['value'].toUpperCase();
      if (first > second) return bool ? 1 : -1;
      if (first < second) return bool ? -1 : 1;
      return 0;
    });
  }

  setDate() {
    const date = new Date();
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    // const time = Math.floor(Date.now() / 1000);

    return `${day} ${MONTH_NAMES[monthIndex]} ${year}`;
  }
}