/* поиск кнопки профиль едит*/
const profileEdit = document.querySelector('.profile__edit');

/* поиск попапа профиль едит*/
const popupProfileEdit = document.querySelector('.popup_profile_edit');

/* поиск кнопки закрытия попапа профиль едит*/
const popupProfileEditCloseBtn = popupProfileEdit.querySelector('.popup__close');
/* поиск кнопки сохранения попапа профиль едит*/
const popupSubmit = popupProfileEdit.querySelector('.popup__form');

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
popupSubmit.addEventListener('submit', submitUserInfo);

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


function togglePopupСardAdd () {
    popupСardAdd.classList.toggle('popup_is-opened');
}