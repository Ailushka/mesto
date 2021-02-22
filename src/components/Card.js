// создаем класс
export class Card {
  constructor(data, handleCardClick, handleLikeClick, handleDeleteIconClick, cardSelector, myId) {
    this._cardData = data;
    this._title = this._cardData.name;
    this._link = this._cardData.link;
    this._name = this._cardData.name;
    this._likes = this._cardData.likes.length;
    this._cardId = this._cardData._id;
    this._ownerId = this._cardData.owner._id;
    this._myId = myId;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick.bind(this);
    this._handleLikeClick = handleLikeClick.bind(this);
    this._handleDeleteIconClick = handleDeleteIconClick.bind(this);
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

  _checkMyCard() {
    return this._ownerId === this._myId ? true : false;
  }

  isLiked(cardData) {
    return cardData.likes.some(like => {
      return like._id === this._myId;
    })
  }

  generateCard() {
// Запишем разметку в приватное поле _element.
// Так у других элементов появится доступ к ней.
  this._element = this._getTemplate();
  this._likeButton = this._element.querySelector('.button_type_like');
  this._likeCounter = this._element.querySelector('.gallery__item-like-counter');

  if(!this._checkMyCard()) {
    this._element.querySelector('.button_type_delete').style.display = 'none';
  }

// Добавим данные
  this._element.querySelector('.gallery__item-title').textContent = this._name;
  this._element.querySelector('.gallery__item-image').src = this._link;
  this._element.querySelector('.gallery__item-image').alt = this._name;
  this._likeCounter.textContent = this._likes;

  this._setEventListeners();
  this.handleLikeButton(this._cardData);

// Вернём элемент наружу
  return this._element;
}

  handleLikeButton(cardData) {
    if(this.isLiked(cardData)) {
      this._likeButton.classList.add('button_clicked');
    } else {
      this._likeButton.classList.remove('button_clicked');
    }
    this._likeCounter.textContent = cardData.likes.length;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick()
    });

    if(this._checkMyCard()) {
      this._element.querySelector('.button_type_delete').addEventListener('click', () => {
        this._handleDeleteIconClick(this)
      });
    }

    this._element.querySelector('.gallery__item-image').addEventListener('click', () => {
       this._handleCardClick(this._name, this._link)
    });
  }
}
