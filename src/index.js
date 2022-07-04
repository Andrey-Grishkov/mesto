import './pages/index.css';

import {config, aboutInformation, imagePopupSelector, imageBigSize, imageBigSizeTitle,
  popupProfileEditSelector, popupСardAddSelector, profileEditBtn, profileEditForm,
  cardAddBtn, formAddCard, userName} from './scripts/constants'

import { Card } from './scripts/Card.js';
import { Section } from './scripts/Section.js';
import { UserInfo } from './scripts/UserInfo.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { FormValidator } from './scripts/FormValidator.js';
import { PopupWithConfirm } from './scripts/PopupWithConfirm.js';
import { Api } from './scripts/Api.js';

const profileEditFormValidator = new FormValidator(config, profileEditForm);
const cardAddFormValidator = new FormValidator(config, formAddCard);
profileEditFormValidator.enableValidation();
cardAddFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(imagePopupSelector, imageBigSize, imageBigSizeTitle);
popupWithImage.setEventListeners();

const popupConfirmSelector = '.popup_type_delete-card';

const popupWithConfirm = new PopupWithConfirm(popupConfirmSelector);

popupWithConfirm.setEventListeners();

const myId = '045152ba8c58368e320157ab';

const headers = {
    authorization: 'c127676f-3241-429e-98df-f5ec760025b0',
    'Content-Type': 'application/json'
}

const api = new Api(
    'https://mesto.nomoreparties.co/v1/cohort-43',
    {headers},
    {myId});

function createCard(item) {
  const card = new Card (item, myId,'.template-cards',
    {handleCardClick: ()=>{
      popupWithImage.openPopupWithImage(item.name, item.link);
    }}, {
          handleCardDelete: () => {
              popupWithConfirm.open(card);
              popupWithConfirm.setHandleSubmit(() => {
                  api.deleteCard(item._id)
                      .then(() => {
                          card.deleteCardHandler();
                      })
              })
          }
      },
      {handleLikeClick: () => {
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
          }}}
  )
  const cardElement = card.generateCard();
  return cardElement;
}






const userInfo = new UserInfo('.profile__name', '.profile__user-about');







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





api.getCard().then((res) => {
    const section = new Section( {items: res, renderer: (item) => {
            const card = createCard(item);
            section.addItem(card, false);
        }}, '.cards')
    section.renderCard();
}).catch((err)=>{ console.log(err) });


const handleAddCard = new PopupWithForm({
    popupSelector: popupСardAddSelector,
    submitHandler: (cardData) => {
        const newCard = {
            name: cardData.placeName,
            link: cardData.link
        };
        api.handleAddCard(newCard)
            .then((newCard) => {
                const section = new Section({items: newCard, renderer: (item) => {
                        const card = createCard(item);
                        section.addItem(card, true);
                    }}, '.cards');
                section.addItem(createCard(newCard), true);
            })
            .catch((err) => { console.log(err) }).finally(() => {
            handleAddCard.close({newCard});
            cardAddFormValidator.submitButtonDisabled();
        });
    }
});

handleAddCard.setEventListenersPopupWithForm();

api.getUserInfo()
    .then((res) => {
        userInfo.setUserInfo(res);
    }).catch((err)=>{ console.log(err) });

const handleSubmitUserInfo = new PopupWithForm({
    popupSelector: popupProfileEditSelector,
    submitHandler: (userInfo) => {
        api.addUserInfo(userInfo)
            .then((userInfo) => {
                userInfo.setUserInfo(userInfo);
        handleSubmitUserInfo.close();})
            .catch((err)=>{ console.log(err) }).finally(() => {
            handleSubmitUserInfo.close();
        })
}});

handleSubmitUserInfo.setEventListenersPopupWithForm();
