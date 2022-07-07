export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__user-input',
  inputErrorClass: 'popup__user-input_type_error',
  errorClass: 'popup__error_visible',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_type_disabled'
}

export const profileEditBtn = document.querySelector('.profile__edit');
export const popupProfileEdit = document.querySelector('.popup_type_profile');
export const popupProfileEditSelector = '.popup_type_profile';
export const formUserName = popupProfileEdit.querySelector('.popup__user-input_input_name');
export const formAboutInformation = popupProfileEdit.querySelector('.popup__user-input_input_user-about');

export const cardAddBtn = document.querySelector('.profile__add');
export const popupСardAdd = document.querySelector('.popup_type_add-card');
export const popupСardAddSelector = '.popup_type_add-card';

export const imagePopup = document.querySelector(".popup_type_image");
export const imagePopupSelector = ".popup_type_image";
export const imageBigSize = imagePopup.querySelector(".popup__image");
export const imageBigSizeTitle = imagePopup.querySelector(".popup__image-title");

export const popupAvatar = document.querySelector('.popup_type_avatar');
export const popupAvatarSelector = '.popup_type_avatar';
export const avatarAddBtn = document.querySelector(".profile__avatar-redaction");

export const profileEditForm = popupProfileEdit.querySelector(".popup__form");
export const formAddCard = popupСardAdd.querySelector(".popup__form");
export const popupAvatarForm = popupAvatar.querySelector('.popup__form');