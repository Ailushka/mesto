import './index.css';

import { initialCards } from '../utils/initial-сards.js';
import { FormValidator, validationConfig } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import {
  editButton,
  addButton,
  nameInput,
  jobInput,
  formElement,
  newCardElement,
  updateAvatarForm,
  updatedAvatar,
  updateAvatar,
  userName,
  userJob,
  userId
} from '../utils/constants.js';

const cardValidator = new FormValidator(validationConfig, formElement);
cardValidator.enableValidation();

const newCardValidator = new FormValidator(validationConfig, newCardElement);
newCardValidator.enableValidation();

const newAvatarValidator = new FormValidator(validationConfig, updateAvatarForm);
newAvatarValidator.enableValidation();

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-20', 'aeac4cc4-9284-4753-bb8f-afa2eb1b5233');

const popupWithImage = new PopupWithImage('.popup__image-title', '.popup__image', '.popup_type_image');
popupWithImage.setEventListeners();

const popupWithConfirm = new PopupWithConfirm('.popup_type_confirm',
(props) => {
  const {card} = props;
  popupWithConfirm.renderLoading(true);
  api.deleteCard(card._id)
    .then(() => card.removeElement())
    .catch(err => console.log(err))
    .finally(() => {
      popupWithConfirm.renderLoading(false);
      popupWithConfirm.close();
    })
})

popupWithConfirm.setEventListeners();

api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
    userId = data._id;
  })
  .catch(err => console.log(err));

const createCard = (item) => {
  const card = new Card({ data: item,
    handleCardClick: () => {
    popupWithImage.open(item.name, item.link);
  },
    handleDeleteIconClick: () => {
      popupWithConfirm.open(card, item._id);
    }
}, '.template', userId, api);
  const cardElement = card.generateCard();

  return cardElement;
}

const initialCardList = new Section('.gallery__list');

api.getInitialCards()
  .then((data) => {
    data.forEach(item => {
      initialCardList.addItem(createCard(item))
    })
  })
  .catch(err => console.log(err));

const popupImageForm = new PopupWithForm('.popup_type_add', (item) => {
    popupImageForm.renderLoading(true);
    api.postCard({item.name, item.link})
      .then((data) => {
        initialCardList.addNewItem(createCard(data))
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupImageForm.renderLoading(false);
        popupImageForm.close();
      })
  });

popupImageForm.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');

const popupProfileForm = new PopupWithForm('.popup_type_edit', (item) => {
    popupProfileForm.renderLoading(true);
    api.patchUserInfo({item.name, item.job})
      .then((data) => {
        userInfo.setUserInfo(data)
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupProfileForm.renderLoading(false);
        popupProfileForm.close();
      })
  });

popupProfileForm.setEventListeners();

const popupAvatarForm = new PopupWithForm('.popup_type_avatar-update', (item) => {
    popupAvatarForm.renderLoading(true);
    updatedAvatar.src = item.avatar;
    api.patchUserAvatar(item)
      .catch(err => console.log(err))
      .finally(() => {
        popupAvatarForm.renderLoading(false);
        popupAvatarForm.close();
      })
  });

popupAvatarForm.setEventListeners();

addButton.addEventListener('click', () => {
    popupImageForm.open();
}
);

updateAvatar.addEventListener('click', () => {
    popupAvatarForm.open();
}
);

editButton.addEventListener('click', () => {
  popupProfileForm.open();

  const user = userInfo.getUserInfo();
  nameInput.setAttribute('value', user.name);
  jobInput.setAttribute('value', user.job);
}
);
