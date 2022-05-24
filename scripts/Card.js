import { openPopup, imagePopup, imageBigSize, imageBigSizeTitle} from './index2.js';

export class CardItem {
    _selector;
    _name;
    _link;
    _element;

    constructor(selector) {
        this._selector = selector;
    }

    _getItem() {
        const cardItem = document
            .querySelector(this._selector)
            .content
            .querySelector('.card')
            .cloneNode(true);
        this._element = cardItem;
    }

    _deleteCardHandler() {
        this._element.remove();
    }

    _likeBtnHandler() {
        event.target.classList.toggle("card__like_active")
    }

    _openImagePopup() {
        imageBigSize.src = this._link;
        imageBigSize.alt = this._name;
        imageBigSizeTitle.textContent = this._name;
        openPopup(imagePopup);
    };

    _setEventListeners() {
        this._element.querySelector('.card__delete').addEventListener('click', () =>{
            this._deleteCardHandler();
        });
        this._element.querySelector('.card__like').addEventListener('click', () =>{
            this._likeBtnHandler();
        });

        this._element.querySelector('.card__image').addEventListener('click', () =>{
            this._openImagePopup();
        });
    }
}

export class UserCardItem extends CardItem {
    constructor(data, selector) {
        super(selector);
        this._name = data.name;
        this._link = data.link;
    }

    generateCard() {
        super._getItem();
        super._setEventListeners();
        this._element.querySelector('.card__title').textContent = this._name;
        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__image').alt = this._name;
        return this._element;
    }
}