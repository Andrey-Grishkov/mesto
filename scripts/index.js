/* поиск кнопки профиль едит*/
const profileEdit = document.querySelector('.profile__edit');

/* поиск попапа профиль едит*/
const popupProfileEdit = document.querySelector('.popup_profile_edit');

/* поиск кнопки закрытия попапа профиль едит*/
const popupProfileEditCloseBtn = popupProfileEdit.querySelector('.popup__close');
/* поиск кнопки сохранения попапа профиль едит*/
const popupProfileEditSubmit = popupProfileEdit.querySelector('.popup__form');

/* графы с данными пользователя в профиле*/
const profileName = document.querySelector('.profile__name');
const profileUserAbout = document.querySelector('.profile__user-about');

/* графы ввода данных пользователя попапа профиль едит*/
const userNameInput = popupProfileEdit.querySelector('.popup__user-input_input_name');
const userAboutInput = popupProfileEdit.querySelector('.popup__user-input_input_user-about');

/* функция закрытия попапа профиль едит*/
function toggleProfileEdit () {
    popupProfileEdit.classList.toggle('popup_is-opened');
    userNameInput.value = profileName.textContent;
    userAboutInput.value = profileUserAbout.textContent;
}

/* слушатель открытия попапа профиль едит*/
profileEdit.addEventListener('click', toggleProfileEdit);

/* слушатель закрытия попапа профиль едит*/
popupProfileEditCloseBtn.addEventListener('click', toggleProfileEdit);


/* слушатель сохранения попапа профиль едит*/
popupProfileEditSubmit.addEventListener('submit', submitUserInfo);

/* функция сохранения попапа профиль едит*/
function submitUserInfo (event) {
    event.preventDefault();
    profileName.textContent = userNameInput.value;
    profileUserAbout.textContent = userAboutInput.value;
    toggleProfileEdit ();
}


const cardAddBtn = document.querySelector('.profile__add');
const popupСardAdd = document.querySelector('.popup_card_add');
const popupСardAddCloseBtn = popupСardAdd.querySelector('.popup__close');

cardAddBtn.addEventListener('click', togglePopupСardAdd);
popupСardAddCloseBtn.addEventListener('click', togglePopupСardAdd);


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

const cardsContainer = document.querySelector(".cards");
const templateCards = document.querySelector(".template-cards");

function renderCards() {
    const cardHtml = initialCards.map(cardsElement);
    cardsContainer.append(...cardHtml);
}

function cardsElement (item) {
    const cardsElement = templateCards.content.cloneNode(true);
    const cardsTitle = cardsElement.querySelector(".cards__title");
    const cardsImage = cardsElement.querySelector(".cards__image");
    const СardDeleteBtn = cardsElement.querySelector(".cards__delete");
    const LikeСardBtn = cardsElement.querySelector(".cards__like");

    cardsTitle.textContent = item.name;
    cardsImage.src = item.link;
    cardsImage.alt = item.name;
    LikeСardBtn.addEventListener("click", toggleLike);
    СardDeleteBtn.addEventListener("click", deleteCard);
    function toggleLike () {
        LikeСardBtn.classList.toggle("cards__like_active");
    }
    
    return cardsElement;
}





function deleteCard (event) {
    const elementCard = event.target.closest(".cards__item");
    elementCard.remove();
}



renderCards();

const popupСardAddSubmit = popupСardAdd.querySelector('.popup__button-submit');
popupСardAddSubmit.addEventListener('click', handleAddCard);

function togglePopupСardAdd () {
    popupСardAdd.classList.toggle('popup_is-opened');
}

function handleAddCard (event) {
    event.preventDefault();
    const CardName = popupСardAdd.querySelector('.popup__user-input_input_card-title').value;
    const CardLinkImage = popupСardAdd.querySelector('.popup__user-input_input_card-image').value;
    const handleAddCardElement=cardsElement({name:CardName, link:CardLinkImage});
    cardsContainer.prepend(handleAddCardElement);
    popupСardAdd.classList.toggle('popup_is-opened');
}




