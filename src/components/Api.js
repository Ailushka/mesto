export class Api {
  constructor(url, password) {
    this._url = url;
    this._password = password;
  }

  // загрузка информации о пользователе с сервера (получаем данные пользователя)
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._password,
      }
    })
    .then(this._checkResponse)
  }

  // загрузка карточек с сервера (получаем список всех карточек в виде массива)
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._password,
      }
    })
    .then(this._checkResponse)
  }

  // редактирование профиля (меняем данные пользователя)
  patchUserInfo(name, job) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._password,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
    .then(this._checkResponse)
  }

  // добавление новой карточки
  postCard(item) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._password,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
    .then(this._checkResponse)
  }

  // удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._password,
      }
    })
    .then(this._checkResponse)
  }

  // постановка лайка
  putLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._password,
      }
    })
    .then(this._checkResponse)
  }

  // снятие лайка
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._password,
      }
    })
    .then(this._checkResponse)
  }

  // обновление аватара пользователя
  patchUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._password,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._checkResponse)
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
