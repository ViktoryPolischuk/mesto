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

const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const cardTemplate = document.querySelector('#card').content;
const galleryContainer = document.querySelector('.gallery');

const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const nameElement = document.querySelector('.profile__author');
const jobElement = document.querySelector('.profile__description');

const imagePopup = document.querySelector('.popup_gallery-card');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupText = imagePopup.querySelector('.popup__image-caption');

const cardPopup = document.querySelector('.popup_add-place');
const cardForm = cardPopup.querySelector('.popup__form');
const cardTitleInput = cardPopup.querySelector('.popup__input_type_title');
const cardSourceInput = cardPopup.querySelector('.popup__input_type_source');

const profilePopup = document.querySelector('.popup_edit-profile');
const profileForm = profilePopup.querySelector('.popup__form');
const profileNameInput = profilePopup.querySelector('.popup__input_type_name');
const profileJobInput = profilePopup.querySelector('.popup__input_type_job');

const handleDelete = (evt) => {
  evt.target.closest('.gallery-card').remove();
}

const handleLike = (evt) => {
  evt.target.classList.toggle('gallery-card__like-button_active');
}

const handleCardImageClick = (card) => {
  imagePopupImage.src = card.link;
  imagePopupImage.alt = card.name;
  imagePopupText.textContent = card.name;
  openPopup(imagePopup);
}

const getCardElement = (card) => {
  const cardElement = cardTemplate.querySelector('.gallery-card').cloneNode(true);
  const cardImage = cardElement.querySelector('.gallery-card__image')
  const cardText = cardElement.querySelector('.gallery-card__text')
  const deleteButton = cardElement.querySelector('.gallery-card__delete-button');
  const likeButton = cardElement.querySelector('.gallery-card__like-button');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardText.textContent = card.name;
  deleteButton.addEventListener('click', handleDelete);
  likeButton.addEventListener('click', handleLike);
  cardImage.addEventListener('click', () => handleCardImageClick(card));
  return cardElement;
}

const renderCard = (galleryContainer, card) => {
  const cardElement = getCardElement(card);
  galleryContainer.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCard(galleryContainer, card);
})

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
  renderCard(galleryContainer, card);
  closePopup(cardPopup);
  cardTitleInput.value = '';
  cardSourceInput.value = '';
}

const handleEditProfileClick = () => {
  const name = nameElement.textContent;
  const job = jobElement.textContent;
  profileNameInput.value = name;
  profileJobInput.value = job;
  hideFormErrors(profileForm, formConfig);
  openPopup(profilePopup);
}

const handleAddCardClick = () => {
  hideFormErrors(cardForm, formConfig);
  openPopup(cardPopup);
}

editButton.addEventListener('click', handleEditProfileClick);
addCardButton.addEventListener('click', handleAddCardClick);

profileForm.addEventListener('submit', handleEditProfileSubmit);
cardForm.addEventListener('submit', handleAddCardSubmit);

cardPopup.addEventListener('click', handlePopupCloseClick);
profilePopup.addEventListener('click', handlePopupCloseClick);
imagePopup.addEventListener('click', handlePopupCloseClick);

enableValidation(formConfig);


