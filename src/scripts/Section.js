export class Section {
  _items;
  _renderer;
  _selector;
  _section;

  constructor({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
    this._section = document.querySelector(this._selector);
  }

  renderCard() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(item, flag){
    if (flag){
      this._section.prepend(item);
    } else {
      this._section.append(item);
    }
    }
}