import './pages/index.css';

import { initialCards } from './scripts/initialCards.js';
import { Card } from './scripts/Card.js';
import { Section } from './scripts/Section.js';
import { UserInfo } from './scripts/UserInfo.js';
import { Popup } from './scripts/Popup.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
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
const profileNameSelector = '.profile__name';
const profileUserAboutSelector = '.profile__user-about';

const popupProfileEdit = document.querySelector('.popup_type_profile');
const popupProfileEditSelector = '.popup_type_profile';
const popupProfileEditSubmit = popupProfileEdit.querySelector('.popup__form');
const userNameInput = popupProfileEdit.querySelector('.popup__user-input_input_name');
const userAboutInput = popupProfileEdit.querySelector('.popup__user-input_input_user-about');

const cardAddBtn = document.querySelector('.profile__add');
const popupСardAdd = document.querySelector('.popup_type_add-card');
const popupСardAddSelector = '.popup_type_add-card';
const popupСardAddSubmit = popupСardAdd.querySelector('.popup__button-submit');
const cardsContainer = document.querySelector(".cards");
const cardName = popupСardAdd.querySelector('.popup__user-input_input_card-title');
const cardLinkImage = popupСardAdd.querySelector('.popup__user-input_input_card-image');

export const imagePopup = document.querySelector(".popup_type_image");
export const imagePopupSelector = ".popup_type_image";
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

const popupWithImage = new PopupWithImage(imagePopupSelector, imageBigSize, imageBigSizeTitle);
popupWithImage.setEventListeners();


function createCard(item) {
    const card = new Card (item, '.template-cards', ()=>{
        popupWithImage.openPopupWithImage(item.name, item.link);
    });
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
    closePopup(popupСardAddSelector);
    cardAddFormValidator.submitButtonDisabled();
}

function openPopup(popupType) {
    const popupOpener = new Popup (popupType);
    popupOpener.open()
}

function closePopup(popup) {
    const popupCloser = new Popup (popup);
    popupCloser.close();
}

const userInfo = new UserInfo('.profile__name', '.profile__user-about');


function handleSubmitUserInfo (event) {
    event.preventDefault();
    const userData = {
        userNameInput: userNameInput.value,
        userAboutInput: userAboutInput.value
    }
    userInfo.setUserInfo(userData);
    closePopup(popupProfileEditSelector);
}

popupProfileEditSubmit.addEventListener('submit', handleSubmitUserInfo);

popupСardAddSubmit.addEventListener('click', handleAddCard);

cardAddBtn.addEventListener('click', () => {
    cardAddFormValidator.deleteErrorAndInputs();
    openPopup(popupСardAddSelector);
});



profileEditBtn.addEventListener('click', () => {
    profileEditFormValidator.deleteErrorAndInputs();
    profileEditFormValidator.submitButtonDisabled();
    const userData = userInfo.getUserInfo();
    userNameInput.value = userData.userNameInput;
    userAboutInput.value = userData.userAboutInput;
    openPopup(popupProfileEditSelector);
});