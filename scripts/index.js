const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const profileEdit = document.querySelector('.profile__edit');
const popupProfileEdit = document.querySelector('.popup_profile_edit');
const popupProfileEditCloseBtn = popupProfileEdit.querySelector('.popup__close');
const popupProfileEditSubmit = popupProfileEdit.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileUserAbout = document.querySelector('.profile__user-about');
const userNameInput = popupProfileEdit.querySelector('.popup__user-input_input_name');
const userAboutInput = popupProfileEdit.querySelector('.popup__user-input_input_user-about');

profileEdit.addEventListener('click', toggleProfileEdit);
popupProfileEditCloseBtn.addEventListener('click', toggleProfileEdit);
popupProfileEditSubmit.addEventListener('submit', submitUserInfo);

function toggleProfileEdit () {
    popupProfileEdit.classList.toggle('popup_is-opened');
    userNameInput.value = profileName.textContent;
    userAboutInput.value = profileUserAbout.textContent;
}

function submitUserInfo (event) {
    event.preventDefault();
    profileName.textContent = userNameInput.value;
    profileUserAbout.textContent = userAboutInput.value;
    toggleProfileEdit ();
}

const cardAddBtn = document.querySelector('.profile__add');
const popupСardAdd = document.querySelector('.popup_card_add');
const popupСardAddCloseBtn = popupСardAdd.querySelector('.popup__close');
const popupСardAddSubmit = popupСardAdd.querySelector('.popup__button-submit');


cardAddBtn.addEventListener('click', togglePopupСardAdd);
popupСardAddCloseBtn.addEventListener('click', togglePopupСardAdd);
popupСardAddSubmit.addEventListener('click', handleAddCard);

function togglePopupСardAdd () {
    popupСardAdd.classList.toggle('popup_is-opened');
}

function handleAddCard (event) {
    event.preventDefault();
    const cardName = popupСardAdd.querySelector('.popup__user-input_input_card-title').value;
    const cardLinkImage = popupСardAdd.querySelector('.popup__user-input_input_card-image').value;
    const handleAddCardElement=getCardsElement({name:cardName, link:cardLinkImage});
    cardsContainer.prepend(handleAddCardElement);
    popupСardAdd.classList.toggle('popup_is-opened');
}

const cardsContainer = document.querySelector(".cards");
const templateCards = document.querySelector(".template-cards");

function renderCards() {
    const cardHtml = initialCards.map(getCardsElement);
    cardsContainer.append(...cardHtml);
}

function getCardsElement (item) {
    const cardsElement = templateCards.content.cloneNode(true);
    const cardsTitle = cardsElement.querySelector(".cards__title");
    const cardsImage = cardsElement.querySelector(".cards__image");
    const cardDeleteBtn = cardsElement.querySelector(".cards__delete");
    const likeСardBtn = cardsElement.querySelector(".cards__like");
    const imagePopup = document.querySelector(".popup_size-image");

    cardsTitle.textContent = item.name;
    cardsImage.src = item.link;
    cardsImage.alt = item.name;

    likeСardBtn.addEventListener("click", toggleLike);
    cardsImage.addEventListener("click", toggleImage);
    cardDeleteBtn.addEventListener("click", deleteCard);

    const popupImageCloseBtn = imagePopup.querySelector(".popup__close");
    popupImageCloseBtn.addEventListener("click", closeImage);

    const imageBigSize = imagePopup.querySelector(".popup__image");
    const imageBigSizeTitle = imagePopup.querySelector(".popup__image-title");

    function closeImage () {
        imagePopup.classList.remove("popup_is-opened");
    }

    function toggleImage () {
        imagePopup.classList.toggle("popup_is-opened");
        imageBigSize.src = item.link;
        imageBigSize.alt = item.name;
        imageBigSizeTitle.textContent = item.name;
    }

    function toggleLike () {
        likeСardBtn.classList.toggle("cards__like_active");
    }

    return cardsElement;
}

renderCards();

function deleteCard (event) {
    const elementCard = event.target.closest(".cards__item");
    elementCard.remove();
}






