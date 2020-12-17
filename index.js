let editButton = document.querySelector('.button_type_edit');
let closeButton = document.querySelector('.button_type_close');
let addButton = document.querySelector('.button_type_add');
let popUp = document.querySelector('.popup');
let popUpEdit = document.querySelector('.popup_type_edit');
let popUpAdd = document.querySelector('.popup_type_add');
let popUpOpen = document.querySelector('.popup_type_image');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
let nameInput = document.querySelector('.form__item_type_name');
let jobInput = document.querySelector('.form__item_type_job');
let cardNameInput = document.querySelector('.form__item_type_card-name');
let cardLinkInput = document.querySelector('.form__item_type_card-link');
let formElement = document.querySelector('[name="edit-form"]');
let newCardElement = document.querySelector('[name="add-form"]');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardsContainerElement = document.querySelector('.gallery__list');
const templateElement = document.querySelector('.template');

function renderList() {
  const cardsItems = initialCards.map(composeItem);
  cardsContainerElement.append(...cardsItems);
}

function composeItem(item) {
  const newItem = templateElement.content.cloneNode(true);
  const headerElement = newItem.querySelector('.gallery-item__title');
  headerElement.textContent = item.name;
  const imageElement = newItem.querySelector('.gallery-item__image');
  imageElement.src = item.link;

  newItem.querySelector('.button_type_like').addEventListener('click', (evt) => {evt.target.classList.toggle('button_clicked');});

  newItem.querySelector('.button_type_delete').addEventListener('click', (evt) => {
    const itemToDelete = evt.target.closest('.gallery-item');
    itemToDelete.remove();
  });

  newItem.querySelector('.gallery-item__image').addEventListener('click', openItem);

  return newItem;
}

function openItem(evt) {
    const imageToOpen = evt.target.closest('.gallery-item');
    const openedImageName = imageToOpen.querySelector('.gallery-item__title').textContent;
    const openedImageLink = imageToOpen.querySelector('.gallery-item__image').src;
    document.querySelector('.popup__image-title').textContent = openedImageName;
    document.querySelector('.popup__image').src = openedImageLink;
    openPopUp(popUpOpen);
}

function openPopUp(popup) {
    popup.classList.add('popup_opened');
}

function closeSubmit(popup) {
    popup.classList.remove('popup_opened');
}

function closePopUp(evt) {
    const popUpToClose = evt.target.closest('.popup');
    popUpToClose.classList.remove('popup_opened');
}

function editPopUp() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openPopUp(popUpEdit);
}

function addItem() {
    openPopUp(popUpAdd);
}

function addSubmitHandler(evt) {
    evt.preventDefault();
    const newCardName = cardNameInput.value;
    const newCardLink = cardLinkInput.value;
    const newCard = composeItem({ name: newCardName, link: newCardLink});
    cardsContainerElement.prepend(newCard);
    closeSubmit(popUpAdd);
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closeSubmit(popUpEdit);
}

editButton.addEventListener('click', editPopUp);
addButton.addEventListener('click', addItem);

closeButton.addEventListener('click', closePopUp);

formElement.addEventListener('submit', formSubmitHandler);
newCardElement.addEventListener('submit', addSubmitHandler);

renderList();
