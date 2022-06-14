import './pages/index.css';

import {config, aboutInformation, imagePopupSelector, imageBigSize, imageBigSizeTitle,
  popupProfileEditSelector, popupСardAddSelector, profileEditBtn, profileEditForm,
  cardAddBtn, formAddCard, userName} from './scripts/constants'
import { initialCards } from './scripts/initialCards.js';
import { Card } from './scripts/Card.js';
import { Section } from './scripts/Section.js';
import { UserInfo } from './scripts/UserInfo.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { FormValidator } from './scripts/FormValidator.js';

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
  aboutInformation.value = userData.aboutInformation;
  handleSubmitUserInfo.open();
});