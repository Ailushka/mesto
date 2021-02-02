import { imageTitle, imageLink, popUpOpen, openPopUp } from './index.js';

// создаем класс
export class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
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

// Вернём элемент наружу
  return this._element;
}

  _setEventListeners() {
    this._element.querySelector('.button_type_like').addEventListener('click', (evt) => {evt.target.classList.toggle('button_clicked');
    });
    this._element.querySelector('.button_type_delete').addEventListener('click', (evt) => {
      evt.target.closest('.gallery__item').remove();
    });
    this._element.querySelector('.gallery__item-image').addEventListener('click', () => this._handlePreviewPicture());
  }

  _handlePreviewPicture() {
      imageTitle.textContent = this._name;
      imageLink.src = this._link;
      imageLink.alt = this._name;
      openPopUp(popUpOpen);
  }
}
