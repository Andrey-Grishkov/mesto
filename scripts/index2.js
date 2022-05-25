import { initialCards } from './initialCards.js';
import { UserCardItem } from './Card.js';
import { FormValidator, config } from './FormValidator2.js';

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
const templateCards = document.querySelector(".template-cards");
const cardName = popupСardAdd.querySelector('.popup__user-input_input_card-title');
const cardLinkImage = popupСardAdd.querySelector('.popup__user-input_input_card-image');

export const imagePopup = document.querySelector(".popup_type_image");
export const imageBigSize = imagePopup.querySelector(".popup__image");
export const imageBigSizeTitle = imagePopup.querySelector(".popup__image-title");

const inputErrors = document.querySelectorAll(".popup__error");
const inputs = document.querySelectorAll(".popup__user-input");

const submitButtons = document.querySelectorAll(".popup__button-submit");

const popupForms = document.querySelectorAll(".popup__form");

const profileEditForm = popupProfileEdit.querySelector(".popup__form");
const addCardForm = popupСardAdd.querySelector(".popup__form");
const profileEditBtnSubmit = popupProfileEdit.querySelector(".popup__button-submit");

const profileEditFormValidator = new FormValidator(config, profileEditForm);
const addCardFormValidator = new FormValidator(config, addCardForm);
profileEditFormValidator.enableValidation();
addCardFormValidator.enableValidation();

initialCards.forEach((item) => {
    const cardList = new UserCardItem (item, '.template-cards');
    const cardElement = cardList.generateCard();
    cardsContainer.append(cardElement);
});



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

function deleteErrorAndInputs(inputErrors, inputs) {
    Array.from(inputErrors).forEach((error) => error.textContent = "");
    Array.from(inputs).forEach((input) => {
        input.classList.remove("popup__user-input_type_error");
        input.value="";
    });
}

function handleSubmitUserInfo (event) {
    event.preventDefault();
    profileName.textContent = userNameInput.value;
    profileUserAbout.textContent = userAboutInput.value;
    closePopup(popupProfileEdit);
}


function handleAddCard(evt) {
    evt.preventDefault();
    const cardUser = new UserCardItem ({name: cardName.value, link: cardLinkImage.value}, '.template-cards');
    const cardElement = cardUser.generateCard();
    cardsContainer.prepend(cardElement);
    closePopup(popupСardAdd);
    submitButtonDisabled (submitButtons, popupForms);
}

function submitButtonDisabled(submitButtons, popupForms) {
    Array.from(popupForms).forEach((form) => {
        Array.from(submitButtons).forEach((button) => {
            button.disabled = !form.checkValidity();
            button.classList.add("popup__button-submit_type_disabled");
        });
    });
}

const popups = document.querySelectorAll('.popup')

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

popupProfileEditSubmit.addEventListener('submit', handleSubmitUserInfo);

popupСardAddSubmit.addEventListener('click', handleAddCard);

cardAddBtn.addEventListener('click', () => {
    deleteErrorAndInputs(inputErrors, inputs);
    openPopup(popupСardAdd);
});

profileEditBtn.addEventListener('click', () => {
    deleteErrorAndInputs(inputErrors, inputs)
    userNameInput.value = profileName.textContent;
    userAboutInput.value = profileUserAbout.textContent;
    profileEditBtnSubmit.disabled=true;
    profileEditBtnSubmit.classList.add("popup__button-submit_type_disabled");
    openPopup(popupProfileEdit);
});



