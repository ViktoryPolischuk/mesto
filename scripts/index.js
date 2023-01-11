let editButton = document.querySelector('.profile__edit-button');
let nameElement = document.querySelector('.profile__author');
let jobElement = document.querySelector('.profile__description');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let formElement = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');

function handleEditClick () {
  let name = nameElement.textContent;
  let job = jobElement.textContent;
  nameInput.value = name;
  jobInput.value = job;
  popup.classList.add('popup_opened');
}

function handleFormClose () {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    let name = nameInput.value;
    let job = jobInput.value;
    nameElement.textContent = name;
    jobElement.textContent = job;
    handleFormClose();
}

editButton.addEventListener('click', handleEditClick);
closeButton.addEventListener('click', handleFormClose);
formElement.addEventListener('submit', handleFormSubmit);
