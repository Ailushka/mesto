export const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.button_type_save',
    inputInvalidClass: 'form__item_type_error',
    buttonInvalidClass: 'button_disabled',
};

export class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputInvalidCLass = config.inputInvalidCLass;
    this._buttonInvalidClass = config.buttonInvalidClass;
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._inputList = this._form.querySelectorAll(this._inputSelector);
  }

  _showError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._inputInvalidClass);
  }

  _hideError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(this._inputInvalidClass);
  }

  _checkInputValidity(input) {
      if (!input.validity.valid) {
          this._showError(input);
      } else {
          this._hideError(input);
      }
  }

  _setButtonState(isActive) {
      if (isActive) {
          this._button.classList.remove(this._buttonInvalidClass);
          this._button.disabled = false;
      } else {
          this._button.classList.add(this._buttonInvalidClass);
          this._button.disabled = true;
      }
  }

  _setEventListeners() {
      this._inputList.forEach((input) => {
          input.addEventListener('input', () => {
              this._checkInputValidity(input);
              this._setButtonState(this._form.checkValidity());
          });
      });
  }

  enableValidation() {
      this._setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._setButtonState(this._form.checkValidity());
      })
  }
}
