import { initialCards } from './initial-сards.js';
import { FormValidator, validationConfig } from './formvalidator.js';
import { Card } from './card.js';


const editButton = document.querySelector('.button_type_edit');
const closeButtons = document.querySelectorAll('.button_type_close');
const addButton = document.querySelector('.button_type_add');
const popUpEdit = document.querySelector('.popup_type_edit');
const popUpAdd = document.querySelector('.popup_type_add');
export const popUpOpen = document.querySelector('.popup_type_image');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const nameInput = document.querySelector('.form__item_type_name');
const jobInput = document.querySelector('.form__item_type_job');
export const imageTitle = document.querySelector('.popup__image-title');
export const imageLink = document.querySelector('.popup__image');
const cardNameInput = document.querySelector('.form__item_type_card-name');
const cardLinkInput = document.querySelector('.form__item_type_card-link');
const formElement = document.querySelector('.form_type_edit');
const newCardElement = document.querySelector('.form_type_add');
const cardsContainerElement = document.querySelector('.gallery__list');
const ESCAPE = 27;

const cardValidator = new FormValidator(validationConfig, formElement);
cardValidator.enableValidation();

const newCardValidator = new FormValidator(validationConfig, newCardElement);
newCardValidator.enableValidation();

function renderList() {
  initialCards.forEach((item) => {
    const card = new Card(item, '.template');
    const cardElement = card.generateCard();
    cardsContainerElement.append(cardElement);
});
}

function handlePreviewPicture(link, name) {
    imageTitle.textContent = name;
    imageLink.src = link;
    imageLink.alt = name;
    openPopUp(popUpOpen);
}

export function openPopUp(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('click', closePopUpByOverlay);
    document.addEventListener('keydown', closePopUpByEsc);
}

function closePopUp(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('click', closePopUpByOverlay);
    document.removeEventListener('keydown', closePopUpByEsc);
}

function closePopUpByOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopUp(evt.target);
  }
}

function closePopUpByEsc(evt) {
  const popUpOpened = document.querySelector('.popup_opened');
  if (evt.keyCode === ESCAPE) {
    closePopUp(popUpOpened);
  }
}

function openProfileForm() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openPopUp(popUpEdit);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const item = {
      name: cardNameInput.value,
      link: cardLinkInput.value
    }
    const newCard = new Card(item, '.template');
    const newCardElement = newCard.generateCard();
    cardsContainerElement.prepend(newCardElement);
    closePopUp(popUpAdd);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopUp(popUpEdit);
}

editButton.addEventListener('click', openProfileForm);
addButton.addEventListener('click', () => openPopUp(popUpAdd));

closeButtons.forEach((item) => {
  item.addEventListener('click', (evt) => {
      const popUpToClose = evt.target.closest('.popup');
      closePopUp(popUpToClose);
  });
});

formElement.addEventListener('submit', handleProfileFormSubmit);
newCardElement.addEventListener('submit', handleCardFormSubmit);

renderList();
