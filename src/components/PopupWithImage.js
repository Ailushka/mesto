import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(imageTitle, imageLink, popupSelector) {
    super(popupSelector);
    this._imageTitle = this._popup.querySelector(imageTitle);
    this._imageLink = this._popup.querySelector(imageLink);
  }

  open(name, link) {
    this._imageTitle.textContent = name;
    this._imageLink.src = link;
    this._imageLink.alt = name;
    super.open();
  }
}
