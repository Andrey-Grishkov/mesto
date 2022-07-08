import {formUserName} from "../utils/constants";

export class UserInfo {
  _userName;
  _userAboutInformation;
  _userAvatar;

  constructor(userNameInputSelector, userAboutInputSelector) {
    this._userName = document.querySelector(userNameInputSelector);
    this._userAboutInformation = document.querySelector(userAboutInputSelector);
    this._userAvatar = document.querySelector('.profile__avatar');
  }

  getUserInfo() {
    const data = {
      userName: this._userName.textContent,
      aboutInformation: this._userAboutInformation.textContent,
    }
    return data;
  }

  setUserInfo(res) {
    this._userName.textContent = res.name;
    this._userAboutInformation.textContent = res.about;
    this._userAvatar.src = res.avatar;
  }

  addUserAvatar(res) {
    this._userAvatar.src = res.avatar;
  }
}