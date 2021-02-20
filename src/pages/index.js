import './index.css';

import { initialCards } from '../utils/initial-сards.js';
import { FormValidator, validationConfig } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  editButton,
  addButton,
  nameInput,
  jobInput,
  formElement,
  newCardElement
} from '../utils/constants.js';

const cardValidator = new FormValidator(validationConfig, formElement);
cardValidator.enableValidation();

const newCardValidator = new FormValidator(validationConfig, newCardElement);
newCardValidator.enableValidation();

const popupWithImage = new PopupWithImage('.popup__image-title', '.popup__image', '.popup_type_image');
popupWithImage.setEventListeners();

const createCard = (item) => {
  const card = new Card({ data: item, handleCardClick: () => {
    popupWithImage.open(item.name, item.link);
  }
}, '.template');
  const cardElement = card.generateCard();

  return cardElement;
}

const initialCardList = new Section({ items: initialCards, renderer: (item) => {
  const initialCardElement = createCard(item);
  initialCardList.addItem(initialCardElement);
}
}, '.gallery__list');

initialCardList.renderList();

const popupImageForm = new PopupWithForm('.popup_type_add', (item) => {
    const newCardElement = createCard(item);
    initialCardList.addNewItem(newCardElement);
    popupImageForm.close();
  }
,);

popupImageForm.setEventListeners();

addButton.addEventListener('click', () => {
    popupImageForm.open();
}
);

const userInfo = new UserInfo('.profile__name', '.profile__job');

const popupProfileForm = new PopupWithForm('.popup_type_edit', (item) => {
  userInfo.setUserInfo(item.name, item.job);
  popupProfileForm.close();
}
);

popupProfileForm.setEventListeners();


editButton.addEventListener('click', () => {
  popupProfileForm.open();

  const user = userInfo.getUserInfo();
  nameInput.setAttribute('value', user.name);
  jobInput.setAttribute('value', user.job);
}
);
