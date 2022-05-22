export class CardItem {
    _name;
    _link;
    _view;

    constructor(data, selector) {
        this._name = data.name;
        this._link = data.link;
        this._selector = selector;
    }

    _getItem() {
        const cardItem = document
            .querySelector(this._selector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardItem;
    }


    _deleteCard() {
        this._view.remove();
    }

    getCardsElement() {
        this._view = this._getItem();
        this._view.querySelector('.card__title').textContent = this._name;
        this._view.querySelector('.card__image').src = this._link;
        this._view.querySelector('.card__image').alt = this._name;

        this._view.querySelector('.card__delete').addEventListener('click', () => {
            this._deleteCard();
        });
        return this._view;
    }
}