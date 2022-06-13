import './pages/index.css';

import { initialCards } from './scripts/initialCards.js';
import { Card } from './scripts/Card.js';
import { Section } from './scripts/Section.js';
import { UserInfo } from './scripts/UserInfo.js';

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

const popupProfileEdit = document.querySelector('.popup_type_profile');
const popupProfileEditSelector = '.popup_type_profile';
const userName = popupProfileEdit.querySelector('.popup__user-input_input_name');
const AboutInformation = popupProfileEdit.querySelector('.popup__user-input_input_user-about');

const cardAddBtn = document.querySelector('.profile__add');
const popupСardAdd = document.querySelector('.popup_type_add-card');
const popupСardAddSelector = '.popup_type_add-card';

export const imagePopup = document.querySelector(".popup_type_image");
export const imagePopupSelector = ".popup_type_image";
export const imageBigSize = imagePopup.querySelector(".popup__image");
export const imageBigSizeTitle = imagePopup.querySelector(".popup__image-title");

const profileEditForm = popupProfileEdit.querySelector(".popup__form");
const formAddCard = popupСardAdd.querySelector(".popup__form");

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

const userInfo = new UserInfo('.profile__name', '.profile__user-about');

const handleAddCard = new PopupWithForm({
  popupSelector: popupСardAddSelector,
  submitHandler: (data) => {
    section.addItem(createCard(data), true);
    handleAddCard.close();
    cardAddFormValidator.submitButtonDisabled();
  }
});

handleAddCard.setEventListenersPopupWithForm();

const handleSubmitUserInfo = new PopupWithForm({
  popupSelector: popupProfileEditSelector,
  submitHandler: (data) => {
    userInfo.setUserInfo(data);
    handleSubmitUserInfo.close();
  }
});

handleSubmitUserInfo.setEventListenersPopupWithForm();

cardAddBtn.addEventListener('click', () => {
  cardAddFormValidator.deleteErrorAndInputs();
  handleAddCard.open();
});

profileEditBtn.addEventListener('click', () => {
  profileEditFormValidator.deleteErrorAndInputs();
  profileEditFormValidator.submitButtonDisabled();
  const userData = userInfo.getUserInfo();
  userName.value = userData.userName;
  AboutInformation.value = userData.AboutInformation;
  handleSubmitUserInfo.open();
});