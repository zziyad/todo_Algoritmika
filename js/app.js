import ToDo from "./todo.js";
let flag = false;

export default class App {
  constructor(tags) {
    this.tags = tags;
    this.state = new ToDo();
    this.render();
    this.bindEvents();
    console.log(this.tags.button);
  }

  bindEvents() {
    this.tags.list.addEventListener('click', this.handleClick.bind(this));
    this.tags.img.addEventListener('click', this.handleClick.bind(this), true);
    this.tags.form.addEventListener('submit', this.submitForm.bind(this));
    this.tags.input.addEventListener('keyup', this.keyUp.bind(this));
    this.tags.input.addEventListener('focus', this.focus.bind(this));
    this.tags.input.addEventListener('blur', this.blur.bind(this));
    // this.tags.button.addEventListener('focus', this.focus.bind(this));
    // this.tags.button.addEventListener('blur', this.blur.bind(this));
    this.tags.button[0].addEventListener('click', this.clearInput.bind(this));
    this.tags.button[1].addEventListener('click', this.submitForm.bind(this));
  }

  render() {
    let listHTML = '';
    for (const item of this.state.items) {
      const className = item.status ? 'done' : '';
      listHTML += `<li class='${className}' data-id='${item.id}'>
                  <div class='row'>
                    <div class='inp_value'>
                      ${item.value}
                    </div>
                    <div class='dlt_btn'>
                      <button class='btn'><img  class="roundx" src="./img/b2.png"  alt="delete"></button></li>
                    </div>
                  </div>
                  `
    }
    // <input class='' style="margin: 10px;" type="checkbox"${(item.status ? 'checked' : '')}>
    this.tags.date.innerHTML = this.state.date;
    // this.tags.form.classList.toggle('focus', this.state.form.focus);
    // this.tags.form.classList.toggle('valid', this.state.form.valid);
    this.tags.list.innerHTML = listHTML;

  }

  clearInput(event) {
    event.preventDefault();
    this.tags.input.value = '';
    this.render();
  }
  submitForm(event) {
    event.preventDefault();
    console.log();
    if (!this.tags.input.value.length) {
      return;
    }
    this.state.addItem(this.tags.input.value);
    this.tags.input.value = '';
    this.render();
  }

  handleClick(event) {

    event.preventDefault();

    const element = event.target.type;
    const id = parseInt(event.target.parentNode.parentElement.getAttribute('data-id'));
    if (element === 'checkbox') {
      event.target.classList.add('txt__decor');
      console.log(event.target.parentNode);
      this.state.toggleItemStatus(id);
      this.render();
    }
    if (event.target.attributes.alt.value === 'sort') {
      if (flag) {
        flag = false;
        if (this.tags.img.src !== 'http://127.0.0.1:5500/todo/01/img/3.png') {
          this.tags.img.src = 'http://127.0.0.1:5500/todo/01/img/3.png'
        }
        this.state.sortByName(flag);
        this.render();
      } else {
        flag = true;
        if (this.tags.img.src !== 'http://127.0.0.1:5500/todo/01/img/1.png') {
          this.tags.img.src = 'http://127.0.0.1:5500/todo/01/img/1.png';
        }
        this.state.sortByName();
        this.render();
      }
    }

    if (event.target.attributes.alt.value === 'delete') {
      console.log(id);
      this.state.deleteItem(id);
      this.render();
    }

  }

  keyUp() {
    this.state.form.valid = (this.tags.input.value.length) ? 1 : 0;
    this.render();
  }

  blur() {
    // console.log(this.tags.form.children[2].style.display = 'none');

    this.state.form.focus = 0;
    this.render();
  }

  focus(event) {
    this.state.form.focus = 1;
    console.log('ffffffffff');
    if (this.tags.img.src === 'http://127.0.0.1:5500/todo/01/img/1.png') {
      this.tags.img.src = 'http://127.0.0.1:5500/todo/01/img/0.png';
    } else if (this.tags.img.src === 'http://127.0.0.1:5500/todo/01/img/3.png') {
      this.tags.img.src = 'http://127.0.0.1:5500/todo/01/img/4.png';
    }

    this.render();
  }
}