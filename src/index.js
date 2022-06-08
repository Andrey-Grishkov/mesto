import './pages/index.css';

import { initialCards } from './scripts/initialCards.js';
import { Card } from './scripts/Card.js';
import { Section } from './scripts/Section.js';
import { UserInfo } from './scripts/UserInfo.js';
import { FormValidator } from './scripts/FormValidator.js';

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__user-input',
    inputErrorClass: 'popup__user-input_type_error',
    errorClass: 'popup__error_visible',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_type_disabled'
}

const profileEditBtn = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileUserAbout = document.querySelector('.profile__user-about');

const popupProfileEdit = document.querySelector('.popup_type_profile');
const popupProfileEditSubmit = popupProfileEdit.querySelector('.popup__form');
const userNameInput = popupProfileEdit.querySelector('.popup__user-input_input_name');
const userAboutInput = popupProfileEdit.querySelector('.popup__user-input_input_user-about');

const cardAddBtn = document.querySelector('.profile__add');
const popupСardAdd = document.querySelector('.popup_type_add-card');
const popupСardAddSubmit = popupСardAdd.querySelector('.popup__button-submit');
const cardsContainer = document.querySelector(".cards");
const cardName = popupСardAdd.querySelector('.popup__user-input_input_card-title');
const cardLinkImage = popupСardAdd.querySelector('.popup__user-input_input_card-image');

export const imagePopup = document.querySelector(".popup_type_image");
export const imageBigSize = imagePopup.querySelector(".popup__image");
export const imageBigSizeTitle = imagePopup.querySelector(".popup__image-title");

const popups = document.querySelectorAll('.popup')

const profileEditForm = popupProfileEdit.querySelector(".popup__form");
const formAddCard = popupСardAdd.querySelector(".popup__form");
const profileEditBtnSubmit = popupProfileEdit.querySelector(".popup__button-submit");

const profileEditFormValidator = new FormValidator(config, profileEditForm);
const cardAddFormValidator = new FormValidator(config, formAddCard);
profileEditFormValidator.enableValidation();
cardAddFormValidator.enableValidation();


function createCard(item) {
    const card = new Card (item, '.template-cards');;
    const cardElement = card.generateCard();
    return cardElement;
}

const section = new Section( {items: initialCards, renderer: (item) => {
    const card = createCard(item);
    section.addItem(card, false);
}}, '.cards')

section.renderCard();

function handleAddCard(evt) {
    evt.preventDefault();
    const item = {name: cardName.value, link: cardLinkImage.value};
    section.addItem(createCard(item), true);
    closePopup(popupСardAdd);
    cardAddFormValidator.submitButtonDisabled();
}

export function openPopup(popupType) {
    popupType.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
}

function closePopup(popup) {
    document.removeEventListener('keydown', closeByEscape);
    popup.classList.remove('popup_is-opened');
}

const userInfo = new UserInfo('.profile__name', '.profile__user-about');


function handleSubmitUserInfo (event) {
    event.preventDefault();
    const userData = {
        userNameInput: userNameInput.value,
        userAboutInput: userAboutInput.value
    }
    userInfo.setUserInfo(userData);
    closePopup(popupProfileEdit);
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')||evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    })
});

popupProfileEditSubmit.addEventListener('submit', handleSubmitUserInfo);

popupСardAddSubmit.addEventListener('click', handleAddCard);

cardAddBtn.addEventListener('click', () => {
    cardAddFormValidator.deleteErrorAndInputs();
    openPopup(popupСardAdd);
});

profileEditBtn.addEventListener('click', () => {
    profileEditFormValidator.deleteErrorAndInputs();
    profileEditFormValidator.submitButtonDisabled();
    const userData = userInfo.getUserInfo();
    userNameInput.value = userData.userNameInput;
    userAboutInput.value = userData.userAboutInput;
    openPopup(popupProfileEdit);
});