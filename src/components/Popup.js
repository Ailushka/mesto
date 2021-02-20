export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._handleButtonClose = this._handleButtonClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleOverlayClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleOverlayClose);
  }

  setEventListeners() {
    this._popup.querySelector('.button_type_close').addEventListener('click', this._handleButtonClose);
  }

  _handleButtonClose() {
    this.close();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
  }
}

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }
}
