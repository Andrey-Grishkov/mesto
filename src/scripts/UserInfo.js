import {userName} from "./constants";

export class UserInfo {
  _userName;
  _userAboutInformation;

  constructor(userNameInputSelector, userAboutInputSelector) {
    this._userName = document.querySelector(userNameInputSelector);
    this._userAboutInformation = document.querySelector(userAboutInputSelector);
  }

  getUserInfo() {
    const data = {
      userName: this._userName.textContent,
      aboutInformation: this._userAboutInformation.textContent
    }
    return data;
  }

  setUserInfo(res) {

    this._userName.textContent = res.name;
    this._userAboutInformation.textContent = res.about;
  }
}