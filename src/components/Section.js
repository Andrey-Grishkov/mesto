export class Section {
  _items;
  _renderer;
  _selector;
  _section;

  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._selector = selector;
    this._section = document.querySelector(this._selector);
  }

  renderCards(items) {
    this._items = items;
    this._items.reverse().forEach(item => {
      this._renderer(item)
    })
  }

  addItem(item) {
    this._section.prepend(item);
  }
}