import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popup.querySelector('.form');
    this._submitForm = this._submitForm.bind(this);
    this.close = this.close.bind(this);
  }

  _getInputValues() {
  this._inputList = this._form.querySelectorAll('.form__item');

  this._formValues = {};

  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });

  return this._formValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submitForm);
    super.setEventListeners();
  }

  _submitForm(evt) {
    evt.preventDefault();

    this._formSubmitCallback(this._getInputValues());

  }

  close() {
    this._form.reset();
    this._form.removeEventListener('submit', this._submitForm);
    super.close();
  }
}
