import { CardItem } from './CardConstruktor.js';
import { CardForm } from './CardForm.js';

export class CardList {
    _container;
    _itemTemplate;
    _form;

    constructor(container, formSelector, itemTemplate) {
        this._container = container;
        this._itemTemplate = itemTemplate;
        this._form = new CardForm(formSelector, this.addCard);
        this._form.init();
    }

    addCard = (title, link) => {
        const item = new CardItem(title, link, this._itemTemplate);
        const domElement = item.getCardsElement();
        this._container.append(domElement);
    }
}