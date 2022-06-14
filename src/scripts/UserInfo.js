export class UserInfo {
  _userName;
  _userAboutInformation;

  constructor(userNameInputSelector, userAboutInputSelector) {
    this._userName = document.querySelector(userNameInputSelector);
    this._userAboutInformation = document.querySelector(userAboutInputSelector);
  }

  getUserInfo () {
    const data = {
      userName: this._userName.textContent,
      aboutInformation: this._userAboutInformation.textContent
    }
    return data;
  }

  setUserInfo(data) {
    this._userName.textContent = data.userName;
    this._userAboutInformation.textContent = data.userAboutInformation;
  }
}