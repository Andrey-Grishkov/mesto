export class UserInfo {
  constructor(userNameInputSelector, userAboutInputSelector) {
    this._userNameInput = document.querySelector(userNameInputSelector);
    this._userAboutInput = document.querySelector(userAboutInputSelector);
  }

  getUserInfo () {
    const userData = {
      userNameInput: this._userNameInput.textContent,
      userAboutInput: this._userAboutInput.textContent
    }
    return userData;
  }

  setUserInfo(userData) {
    this._userNameInput.textContent = userData.userNameInput;
    this._userAboutInput.textContent = userData.userAboutInput;
  }
}