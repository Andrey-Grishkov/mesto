import './pages/index.css';

import {
  config,
  formAboutInformation,
  imagePopupSelector,
  imageBigSize,
  imageBigSizeTitle,
  popupProfileEditSelector,
  popupСardAddSelector,
  profileEditBtn,
  profileEditForm,
  cardAddBtn,
  formAddCard,
  formUserName,
  popupAvatarSelector,
  avatarAddBtn,
  popupAvatarForm} from './components/utils/constants'

import { Card } from './components/Card.js';
import { Section } from './components/Section.js';
import { UserInfo } from './components/UserInfo.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { FormValidator } from './components/FormValidator.js';
import { PopupWithConfirm } from './components/PopupWithConfirm.js';
import { Api } from './components/Api.js';

const profileEditFormValidator = new FormValidator(config, profileEditForm);
const cardAddFormValidator = new FormValidator(config, formAddCard);
const avatarFormValidator = new FormValidator(config, popupAvatarForm);

profileEditFormValidator.enableValidation();
cardAddFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(imagePopupSelector, imageBigSize, imageBigSizeTitle);
popupWithImage.setEventListeners();

const popupConfirmSelector = '.popup_type_delete-card';

const popupWithConfirm = new PopupWithConfirm(popupConfirmSelector);

popupWithConfirm.setEventListeners();

let myId = null;

const headers = {
  authorization: 'c127676f-3241-429e-98df-f5ec760025b0',
  'Content-Type': 'application/json'
}

const userInfo = new UserInfo('.profile__name', '.profile__user-about');

const api = new Api(
    'https://mesto.nomoreparties.co/v1/cohort-43',
    headers,
    myId
);

api.getUserInfo()
    .then((res) => {
      userInfo.setUserInfo(res);
      myId = res._id;
      return myId;
    }).catch((err)=>{ console.log(err) });

function createCard(item) {
  const card = new Card (item, myId, {selector: '.template-cards',
    handleCardClick: () => {
      popupWithImage.openPopupWithImage(item.name, item.link);
    }, handleCardDelete: () => {
      popupWithConfirm.open(card);
      popupWithConfirm.setHandleSubmit(() => {
        api.deleteCard(item._id)
        .then(() => {
          card.deleteCardHandler();
        })
        .catch((err) => { console.log(err) })
      })
    },
    handleLikeClick: () => {
      if (!card.likeDefiner()){
        api.addLike(card.getCardId())
        .then((res) => {
          card.setLike(res);
        })
        .catch((err) => { console.log(err) })
      } else {
        api.deleteLike(card.getCardId())
        .then((res) => {
          card.setLike(res);
        })
        .catch((err) => { console.log(err) })
      }
    }
  }
  )
  const cardElement = card.generateCard();
  sectionCards.addItem(cardElement);
  return cardElement;
}

cardAddBtn.addEventListener('click', () => {
  cardAddFormValidator.deleteErrorAndInputs();
  popupAddCard.open();
});

profileEditBtn.addEventListener('click', () => {
  profileEditFormValidator.deleteErrorAndInputs();
  profileEditFormValidator.submitButtonDisabled();
  const userData = userInfo.getUserInfo();
  const setUserParams = ({userName, aboutInformation}) => {
    formUserName.value = userName;
    formAboutInformation.value = aboutInformation;
  }
  setUserParams(userData);
  popupSubmitUserInfo.open();
});

const sectionCards = new Section({
  renderer: (item) => {
    createCard(item)
  }},
  '.cards');

api.getCards().then((res) => {
  sectionCards.renderCards(res);
})
.catch((err)=>{ console.log(err) });

Promise.all([api.getUserInfo(), api.getCards()])
.then(([userinfo, res]) => {
  userInfo.setUserInfo(userinfo);
  sectionCards.renderCards(res);
})
.catch(err => console.log(err));

const popupAddCard = new PopupWithForm({
  popupSelector: popupСardAddSelector,
  submitHandler: (cardData) => {
    const newCard = {
      name: cardData.placeName,
      link: cardData.link
    };
    api.handleAddCard(newCard)
    .then((newCard) => {
      createCard(newCard);
    })
    .catch((err) => { console.log(err) }).finally(() => {
      popupAddCard.close({newCard});
      cardAddFormValidator.submitButtonDisabled();
    });
  }
});

popupAddCard.setEventListenersPopupWithForm();

const popupSubmitUserInfo = new PopupWithForm({
  popupSelector: popupProfileEditSelector,
  submitHandler: (res) => {
    api.addUserInfo(res)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupSubmitUserInfo.close();
    })
    .catch((err)=>{ console.log(err) })
  }
});

popupSubmitUserInfo.setEventListenersPopupWithForm();

const popupAddUserAvatar = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  submitHandler: (data) => {
    api.addAvatar(data)
    .then((res) => {
      userInfo.addUserAvatar(res);
    }).then(() => {popupAddUserAvatar.close();})
    .catch((err) => { console.log(err) })
  }
});

popupAddUserAvatar.setEventListenersPopupWithForm();

avatarAddBtn.addEventListener('click', (evt) => {
  avatarFormValidator.deleteErrorAndInputs();
  popupAddUserAvatar.open();
});