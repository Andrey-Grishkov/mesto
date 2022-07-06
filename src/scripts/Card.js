export class Card {
  _name;
  _link;
  _id;
  _owner;
  _selector;
  _myId;
  _handleCardClick;
  _handleCardDelete;
  _handleLikeClick;
  _likes;

  constructor(data, myId, selector, {handleCardClick},{handleCardDelete}, {handleLikeClick}) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._owner = data.owner._id;
    this._selector = selector;
    this._myId = myId;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
    this._likes = data.likes;
  }

  getCardId(){
    return this._id;
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
    this._cardLikeCounter = this._element.querySelector('.card__like-counter');
    this._cardLikeCounter.textContent = this._likes.length;
    this._toggleLike();
    return this._element;
  }

  likeDefiner() {
    return (this._likes.some(data => data._id === this._myId))
  }

  setLike(res) {
    this._likes = res.likes;
    this._cardLikeCounter.textContent = this._likes.length;
    this._toggleLike();
  }

  _toggleLike() {
    if (this.likeDefiner()) {
      this._like.classList.add("card__like_active");
    } else {
      this._like.classList.remove("card__like_active");
    }
  }

  deleteCardHandler() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.card__delete').addEventListener('click', () =>{
      this._handleCardDelete();
    });
    this._element.querySelector('.card__like').addEventListener('click', () =>{
      this._handleLikeClick();
    });
    this._element.querySelector('.card__image').addEventListener('click', () =>{
      this._handleCardClick(this._name, this._link);
    });
  }
}