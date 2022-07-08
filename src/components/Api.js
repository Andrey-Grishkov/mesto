export class Api {
  _url
  _headers

  constructor(baseUrl, headers) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCards() {
    return fetch (`${this._url}/cards`, {
      headers: this._headers
    }).then(this._checkResponse);
  }

  handleAddCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers}
    ).then(this._checkResponse);
  }

  addUserInfo(userInfo) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.userName,
        about: userInfo.userAboutInformation,
        avatar: userInfo.avatar
      })
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse)
  }

  addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes/`, {
      method: 'PUT',
      headers: this._headers
    }).then(this._checkResponse)
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes/`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse)
  }

  addAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link,
      })
    }).then(this._checkResponse)
  }
}