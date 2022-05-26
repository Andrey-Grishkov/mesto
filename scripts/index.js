import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator, config } from './FormValidator.js';

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

initialCards.forEach((item) => {
  const cardItem = new Card (item, '.template-cards');
  cardsContainer.append(createCard(cardItem));
});

function handleAddCard(evt) {
  evt.preventDefault();
  const card = new Card ({name: cardName.value, link: cardLinkImage.value}, '.template-cards');
  cardsContainer.prepend(createCard(card));
  closePopup(popupСardAdd);
  cardAddFormValidator.submitButtonDisabled();
}

function createCard(card) {
  const cardElement = card.generateCard();
  return cardElement;
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

function handleSubmitUserInfo (event) {
  event.preventDefault();
  profileName.textContent = userNameInput.value;
  profileUserAbout.textContent = userAboutInput.value;
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
  userNameInput.value = profileName.textContent;
  userAboutInput.value = profileUserAbout.textContent;
  profileEditBtnSubmit.disabled=true;
  profileEditBtnSubmit.classList.add("popup__button-submit_type_disabled");
  openPopup(popupProfileEdit);
});