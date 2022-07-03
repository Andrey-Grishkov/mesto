export class Card {
  _selector;
  _name;
  _link;
  _element;
  _like;
  _handleCardClick;

  constructor(data, myId, selector, {handleCardClick},{handleCardDelete}) {
    this._name = data.name;
    this._link = data.link;
    this._id = data.id;
    this._owner = data.owner._id;
    this._selector = selector;
    this._myId = myId;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    console.log(data.owner._id);
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
    this._element.id = this._id;
    if (this._myId !== this._owner) {this._element.querySelector('.card__delete').style.display = 'none'}

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