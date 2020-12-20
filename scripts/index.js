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

  imageElement.addEventListener('click', handlePreviewPicture);

  return newItem;
}

function handlePreviewPicture(evt) {
    const imageToOpen = evt.target.closest('.gallery__item');
    const openedImageName = imageToOpen.querySelector('.gallery__item-title').textContent;
    const openedImageLink = imageToOpen.querySelector('.gallery__item-image').src;
    imageTitle.textContent = openedImageName;
    imageLink.src = openedImageLink;
    imageLink.alt = openedImageName;
    openPopUp(popUpOpen);
}

function openPopUp(popup) {
    popup.classList.add('popup_opened');
}

function closePopUp(popup) {
    popup.classList.remove('popup_opened');
}

function editPopUp() {
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

editButton.addEventListener('click', editPopUp);
addButton.addEventListener('click', () => openPopUp(popUpAdd));


closeButton.forEach((item) => {
  item.addEventListener('click', function closePopUp(evt) {
      const popUpToClose = evt.target.closest('.popup');
      popUpToClose.classList.remove('popup_opened');
  });
});

formElement.addEventListener('submit', handleProfileFormSubmit);
newCardElement.addEventListener('submit', handleCardFormSubmit);

renderList();
