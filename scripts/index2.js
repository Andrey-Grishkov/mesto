import { CardItem } from './Card.js';

initialCards.forEach((item) => {
    const cardsContainer = document.querySelector(".cards");
    const cardList = new CardItem (item, '.template-cards');
    const cardElement = cardList.getCardsElement();
    cardsContainer.append(cardElement);
});

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    })
})

function openPopup(popupType) {
    popupType.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
    document.removeEventListener('keydown', closeByEscape);
    popup.classList.remove('popup_is-opened');
}