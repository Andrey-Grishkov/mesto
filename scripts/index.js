const profileEditBtn = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileUserAbout = document.querySelector('.profile__user-about');

const popupProfileEdit = document.querySelector('.popup_type_profile');
const popupProfileEditCloseBtn = popupProfileEdit.querySelector('.popup__close');
const popupProfileEditSubmit = popupProfileEdit.querySelector('.popup__form');
const userNameInput = popupProfileEdit.querySelector('.popup__user-input_input_name');
const userAboutInput = popupProfileEdit.querySelector('.popup__user-input_input_user-about');

const cardAddBtn = document.querySelector('.profile__add');
const popupСardAdd = document.querySelector('.popup_type_add-card');
const popupСardAddCloseBtn = popupСardAdd.querySelector('.popup__close');
const popupСardAddSubmit = popupСardAdd.querySelector('.popup__button-submit');
const cardsContainer = document.querySelector(".cards");
const templateCards = document.querySelector(".template-cards");
const cardName = popupСardAdd.querySelector('.popup__user-input_input_card-title');
const cardLinkImage = popupСardAdd.querySelector('.popup__user-input_input_card-image');

const imagePopup = document.querySelector(".popup_type_image");
const popupImageCloseBtn = imagePopup.querySelector(".popup__close");
const imageBigSize = imagePopup.querySelector(".popup__image");
const imageBigSizeTitle = imagePopup.querySelector(".popup__image-title");

function openPopup(popupType) {
  popupType.classList.add('popup_is-opened');
}

function closePopup(popupType) {
  popupType.classList.remove("popup_is-opened");
}

function handleSubmitUserInfo (event) {
  event.preventDefault();
  profileName.textContent = userNameInput.value;
  profileUserAbout.textContent = userAboutInput.value;
  closePopup(popupProfileEdit);
}

function handleAddCard (event) {
  event.preventDefault();
  const handleAddCardElement=getCardsElement({name:cardName.value, link:cardLinkImage.value});
  cardsContainer.prepend(handleAddCardElement);
  closePopup(popupСardAdd);
}

function renderCards() {
  const cardHtml = initialCards.map(getCardsElement);
  cardsContainer.append(...cardHtml);
}

renderCards();

function getCardsElement(item) {
  const cardsElement = templateCards.content.cloneNode(true);
  const cardsTitle = cardsElement.querySelector(".card__title");
  const cardsImage = cardsElement.querySelector(".card__image");
  const cardDeleteBtn = cardsElement.querySelector(".card__delete");
  const likeСardBtn = cardsElement.querySelector(".card__like");

  cardsTitle.textContent = item.name;
  cardsImage.src = item.link;
  cardsImage.alt = item.name;

  cardsImage.addEventListener("click", () =>{
    imageBigSize.src = item.link;
    imageBigSize.alt = item.name;
    imageBigSizeTitle.textContent = item.name;
    openPopup(imagePopup);
  });

  likeСardBtn.addEventListener("click", toggleLike =>{
    likeСardBtn.classList.toggle("card__like_active");
  });

  cardDeleteBtn.addEventListener("click", deleteCard);
  return cardsElement;
}

function deleteCard (event) {
  const elementCard = event.target.closest(".card");
  elementCard.remove();
}

popupСardAddSubmit.addEventListener('click', handleAddCard);
popupProfileEditSubmit.addEventListener('submit', handleSubmitUserInfo);
popupProfileEditCloseBtn.addEventListener('click', () => closePopup(popupProfileEdit));
popupСardAddCloseBtn.addEventListener('click', () => closePopup(popupСardAdd));
popupImageCloseBtn.addEventListener("click", () => closePopup(imagePopup));
cardAddBtn.addEventListener('click', () => openPopup(popupСardAdd));
profileEditBtn.addEventListener('click', () => {
  userNameInput.value = profileName.textContent;
  userAboutInput.value = profileUserAbout.textContent;
  openPopup(popupProfileEdit);
});