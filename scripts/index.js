import Card from './Card.js'
import FormValidator from './FormValidator.js';
import {
  initialCards,
  formConfig,
  galleryContainer,
  editButton,
  addCardButton,
  nameElement,
  jobElement,
  imagePopup,
  imagePopupImage,
  imagePopupText,
  cardPopup,
  cardForm,
  cardTitleInput,
  cardSourceInput,
  profilePopup,
  profileForm,
  profileNameInput,
  profileJobInput
} from './constants.js';

const cardFormValidator = new FormValidator(formConfig, cardForm);
const profileFormValidator = new FormValidator(formConfig, profileForm);

const handleCardImageClick = (card) => {
  imagePopupImage.src = card.link;
  imagePopupImage.alt = card.name;
  imagePopupText.textContent = card.name;
  openPopup(imagePopup);
}

const createCard = (data, handleCardImageClick) => {
  const card = new Card(data, '#card', handleCardImageClick);
  const cardElement = card.getCardElement();
  return cardElement;
}

const renderCard = (galleryContainer, data, handleCardImageClick) => {
  const cardElement = createCard(data, handleCardImageClick);
  galleryContainer.prepend(cardElement);
}

const handleEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscKeydown);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKeydown);
}

const handlePopupCloseClick = (evt) => {
  if (evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close-button')){
    closePopup(evt.target.closest('.popup'));
  }
}

const handleEditProfileSubmit = (evt) => {
  evt.preventDefault();
  const name = profileNameInput.value;
  const job = profileJobInput.value;
  if (name === '' || job === '') {
    return
  }
  nameElement.textContent = name;
  jobElement.textContent = job;
  closePopup(profilePopup);
}

const handleAddCardSubmit = (evt) => {
  evt.preventDefault();
  const title = cardTitleInput.value;
  const source = cardSourceInput.value;
  if (title === '' || source === '') {
    return
  }
  const card = {name: title, link: source};
  renderCard(galleryContainer, card, handleCardImageClick);
  closePopup(cardPopup);
  evt.target.reset();
}

const handleEditProfileClick = () => {
  const name = nameElement.textContent;
  const job = jobElement.textContent;
  profileNameInput.value = name;
  profileJobInput.value = job;
  profileFormValidator.hideErrors();
  openPopup(profilePopup);
}

const handleAddCardClick = () => {
  cardFormValidator.hideErrors();
  openPopup(cardPopup);
}

editButton.addEventListener('click', handleEditProfileClick);
addCardButton.addEventListener('click', handleAddCardClick);

profileForm.addEventListener('submit', handleEditProfileSubmit);
cardForm.addEventListener('submit', handleAddCardSubmit);

const popups = Array.from(document.querySelectorAll('.popup'));
popups.forEach((popup) => {
  popup.addEventListener('mousedown', handlePopupCloseClick);
})

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

initialCards.forEach((data) => {
  renderCard(galleryContainer, data, handleCardImageClick);
})


