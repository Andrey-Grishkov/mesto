export class CardItem {
    _name;
    _link;
    _element;

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

    _deleteCardHandler() {
        this._element.remove();
    }

    _likeBtnHandler() {
        event.target.classList.toggle("card__like_active")
    }

    getCardsElement() {
        this._element = this._getItem();
        this._element.querySelector('.card__title').textContent = this._name;
        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__image').alt = this._name;
        this._element.querySelector('.card__delete').addEventListener('click', () =>{
            this._deleteCardHandler();
        });
        this._element.querySelector('.card__like').addEventListener('click', () =>{
            this._likeBtnHandler();
        });
        return this._element;
    }
}

