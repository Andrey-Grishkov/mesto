export class Card {
  _selector;
  _name;
  _link;
  _element;
  _like;
  _handleCardClick;

  constructor(data, selector, {handleCardClick},{handleCardDelete}) {
    this._selector = selector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;

  }

  _getItem() {
    const cardItem = document
    .querySelector(this._selector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    this._element = cardItem;
  }

  generateCard() {
    this._getItem();
    this._setEventListeners();
    this._imageCard = this._element.querySelector('.card__image');
    this._element.querySelector('.card__title').textContent = this._name;
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;
    this._like = this._element.querySelector('.card__like');
    return this._element;
  }

  deleteCardHandler() {
    console.log('pop3')
    this._element.remove();
    this._element = null;
  }

  _likeBtnHandler() {
    this._like.classList.toggle("card__like_active")
  }

  _setEventListeners() {
    this._element.querySelector('.card__delete').addEventListener('click', () =>{
      this._handleCardDelete();
    });
    this._element.querySelector('.card__like').addEventListener('click', () =>{
      this._likeBtnHandler();
    });
    this._element.querySelector('.card__image').addEventListener('click', () =>{
      this._handleCardClick(this._name, this._link);
    });
  }
}