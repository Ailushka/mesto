import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__item');
    this._submitButton = this._form.querySelector('.button_type_save');
  }

  renderLoading(isLoading) {
    this._submitButton.textContent = isLoading
      ? 'Сохранение...'
      : 'Сохранить';
  }

  _getInputValues() {
  this._formValues = {};

  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });

  return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitCallback(this._getInputValues());
    });
  }

  close() {
    this._form.reset();

    super.close();
  }
}
