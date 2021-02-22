import { Popup } from './Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._form.querySelector('.button_type_save');
  }

  open(cardData) {
    super.open();
    this._cardId = cardData.card._cardId;
    this._element = cardData.card._element;
    console.log(cardData);
  }

  renderLoading(isLoading) {
    this._submitButton.textContent = isLoading
      ? 'Удаление...'
      : 'Удалить';
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit);
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this._formSubmitCallback(this.cardId);
  }

  removeCard() {
    this._element.remove();
  }

}
