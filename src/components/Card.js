// создаем класс
export class Card {
  constructor({ data, handleCardClick, handleDeleteIconClick}, cardSelector, myId, api) {
    this._title = data.name;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._owner = data.owner;
    this._id = data._id;
    this._myId = myId;
    this.api = api;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }
// возвращаем разметку
  _getTemplate() {
// забираем разметку из HTML и клонируем элемент
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .cloneNode(true);

// вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
// Запишем разметку в приватное поле _element.
// Так у других элементов появится доступ к ней.
  this._element = this._getTemplate();
  this._setEventListeners();

// Добавим данные
  this._element.querySelector('.gallery__item-title').textContent = this._name;
  this._element.querySelector('.gallery__item-image').src = this._link;
  this._element.querySelector('.gallery__item-image').alt = this._name;
  this._element.querySelector('.gallery__item-like-counter').textContent = this._likes.length;
  if(this._likes.some(item => item._id === this._myId)) {
    this._element.querySelector('.button_type_like').classList.add('button_clicked');
  }
  if (this._owner._id !== this._myId) {
    this._element.querySelector('.button_type_delete').remove();
  }
// Вернём элемент наружу
  return this._element;
}

  _toggleLikes(evt, cardId) {
    if(this._checkLikes()) {
      this.api.deleteLike(cardId)
        .then((res) => {
          this._likes = res.likes;
          this._element.querySelector('.gallery__item-like-counter').textContent = res.likes.length;
          evt.target.classList.remove('button_clicked');
        })
        .catch(err => console.log(err));
    } else {
      this.api.putLike(cardId)
        .then((res) => {
          this._likes = res.likes;
          this._element.querySelector('.gallery__item-like-counter').textContent = res.likes.length;
          evt.target.classList.add('button_clicked');
        })
        .catch(err => console.log(err));
    }
  }

  _checkLikes() {
    return this._likes.some((item) => {
      return item._id === this._myId;
    })
  }

  _setEventListeners() {
    this._element.querySelector('.button_type_like').addEventListener('click', (evt) => this._toggleLikes(evt, this._id));
    this._element.querySelector('.button_type_delete').addEventListener('click', () => this._handleDeleteIconClick());
    this._element.querySelector('.gallery__item-image').addEventListener('click', () => this._handleCardClick());
  }
}
