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
  cardSelector,
  userId
} from '../utils/constants.js';

const cardValidator = new FormValidator(validationConfig, formElement);
cardValidator.enableValidation();

const newCardValidator = new FormValidator(validationConfig, newCardElement);
newCardValidator.enableValidation();

const newAvatarValidator = new FormValidator(validationConfig, updateAvatarForm);
newAvatarValidator.enableValidation();

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-20', 'aeac4cc4-9284-4753-bb8f-afa2eb1b5233');

const popupWithConfirm = new PopupWithConfirm('.popup_type_confirm',
(element, data) => {
  console.log(element);
  popupWithConfirm.renderLoading(true);

  api.deleteCard(data._id)
    .then(() => {
      element.remove();
      element = null;
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupWithConfirm.renderLoading(false);
      popupWithConfirm.close();
    })
}
)

popupWithConfirm.setEventListeners();

api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
  })
  .catch(err => console.log(err));

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    function handleCardClick() {
      popupWithImage.open(cardData.name, cardData.link);
    },
    function handleLikeClick() {
      if(!this.isLiked(cardData)) {
        api.putLike(cardData._id)
          .then(result => this.handleLikeButton(result))
          .catch(err => console.log(err));
      } else {
        api.deleteLike(cardData._id)
          .then(result => this.handleLikeButton(result))
          .catch(err => console.log(err));
      }
    },
    function handleDeleteIconClick(evt) {
      popupWithConfirm.open(evt.target.parentElement, cardData);
    },
    '.template',
    userInfo.getId()
  ).generateCard();
  return card;
}

const initialCardList = new Section('.gallery__list');

api.getInitialCards()
  .then((data) => {
    data.forEach(item => {
      initialCardList.addItem(createCard(item))
    })
  })
  .catch(err => console.log(err));

  const popupWithImage = new PopupWithImage('.popup__image-title', '.popup__image', '.popup_type_image');
  popupWithImage.setEventListeners();

  const popupImageForm = new PopupWithForm('.popup_type_add', (item) => {
    popupImageForm.renderLoading(true);
    api.postCard(item)
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

const popupProfileForm = new PopupWithForm('.popup_type_edit', (data) => {
    popupProfileForm.renderLoading(true);

    api.patchUserInfo(data.name, data.job)
      .then((result) => {
        userInfo.setUserInfo(result)
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
    api.patchUserAvatar(item.link)
      .then(() => userInfo.updateAvatar(item.link))
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
