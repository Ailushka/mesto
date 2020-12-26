const editButton = document.querySelector('.button_type_edit');
const closeButtons = document.querySelectorAll('.button_type_close');
const addButton = document.querySelector('.button_type_add');
const popUpEdit = document.querySelector('.popup_type_edit');
const popUpAdd = document.querySelector('.popup_type_add');
const popUpOpen = document.querySelector('.popup_type_image');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const nameInput = document.querySelector('.form__item_type_name');
const jobInput = document.querySelector('.form__item_type_job');
const imageTitle = document.querySelector('.popup__image-title');
const imageLink = document.querySelector('.popup__image');
const cardNameInput = document.querySelector('.form__item_type_card-name');
const cardLinkInput = document.querySelector('.form__item_type_card-link');
const formElement = document.querySelector('.form_type_edit');
const newCardElement = document.querySelector('.form_type_add');
const cardsContainerElement = document.querySelector('.gallery__list');
const templateElement = document.querySelector('.template');
const ESCAPE = 27;

function renderList() {
  const cardsItems = initialCards.map(composeItem);
  cardsContainerElement.append(...cardsItems);
}

function composeItem(item) {
  const newItem = templateElement.content.cloneNode(true);
  const headerElement = newItem.querySelector('.gallery__item-title');
  headerElement.textContent = item.name;
  const imageElement = newItem.querySelector('.gallery__item-image');
  imageElement.src = item.link;
  imageElement.alt = item.name;

  newItem.querySelector('.button_type_like').addEventListener('click', (evt) => {evt.target.classList.toggle('button_clicked');});

  newItem.querySelector('.button_type_delete').addEventListener('click', (evt) => {
    evt.target.closest('.gallery__item').remove();
  });

  imageElement.addEventListener('click', () => handlePreviewPicture(item.link, item.name));

  return newItem;
}

function handlePreviewPicture(link, name) {
    imageTitle.textContent = name;
    imageLink.src = link;
    imageLink.alt = name;
    openPopUp(popUpOpen);
}

function openPopUp(popup) {
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
    const newCardName = cardNameInput.value;
    const newCardLink = cardLinkInput.value;
    const newCard = composeItem({ name: newCardName, link: newCardLink});
    cardsContainerElement.prepend(newCard);
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
