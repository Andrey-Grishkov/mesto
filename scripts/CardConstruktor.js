class CardItem {
    _title;
    _link;
    _template;
    _view;

    constructor(title, link, template) {
        this._title = title;
        this._link = link;
        this._template = template;
    }

    _deleteCard() {
        this._view.remove();
    }

    getCardsElement() {
        this._view = this._template.cloneNode(true).querySelector('.template-cards');
        this._view.querySelector('.card__title').textContent = this._title;
        this._view.querySelector('.card__image').src = this._link;
        this._view.querySelector('.card__image').alt = this._title;

        this._view.querySelector('.card__delete').addEventListener('click', () => {
            this._deleteCard();
        });
    }

    return this._view;
}