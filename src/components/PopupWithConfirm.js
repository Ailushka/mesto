import { Popup } from './Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popup.querySelector('.form');
    this._submitForm = this._submitForm.bind(this);
    this._submitButton = this._form.querySelector('.button_type_save');
    this._props = {};
  }

  open(props) {
    super.open();
    this._props = props;
  }

  renderLoading(isLoading) {
    this._submitButton.textContent = isLoading
      ? 'Удаление...'
      : 'Удалить';
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._formSubmitCallback(this._props);
  }
}
