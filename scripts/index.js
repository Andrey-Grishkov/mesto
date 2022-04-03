const profileEdit = document.querySelector('.profile__edit');
const popupWindow = document.querySelector('.popup');
const popupCloseBtn = popupWindow.querySelector('.popup__close');
const popupSubmit = popupWindow.querySelector('.popup__form');
const userNameInput = popupWindow.querySelector('.popup__user-input_input_name');
const userAboutInput = popupWindow.querySelector('.popup__user-input_input_user-about');
const profileName = document.querySelector('.profile__name');
const profileUserAbout = document.querySelector('.profile__user-about');

function toggleProfileEdit () {
    popupWindow.classList.toggle('popup_is-opened');
    userNameInput.value = profileName.innerText;
    userAboutInput.value = profileUserAbout.innerText;
}

profileEdit.addEventListener('click', toggleProfileEdit);
popupCloseBtn.addEventListener('click', toggleProfileEdit);

function submitUserInfo (event) {
    event.preventDefault();
    profileName.innerText = userNameInput.value;
    profileUserAbout.innerText = userAboutInput.value;
    toggleProfileEdit ();
}

popupSubmit.addEventListener('submit', submitUserInfo);

