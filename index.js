let editButton = document.querySelector('.button_type_edit');
let closeButton = document.querySelector('.button_type_close');
let popUp = document.querySelector('.popup');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
let nameInput = document.querySelector('.form__item_type_name');
let jobInput = document.querySelector('.form__item_type_job');
let formElement = document.querySelector('.form');

function openPopUp() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    popUp.classList.add('popup_opened');
}

function closePopUp() {
    popUp.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopUp();
}

editButton.addEventListener('click', openPopUp);

closeButton.addEventListener('click', closePopUp);

formElement.addEventListener('submit', formSubmitHandler);
