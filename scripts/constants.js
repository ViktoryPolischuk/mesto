export const initialCards = [
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

export const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const galleryContainer = document.querySelector('.gallery');

export const editButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');

export const nameElement = document.querySelector('.profile__author');
export const jobElement = document.querySelector('.profile__description');

export const imagePopup = document.querySelector('.popup_gallery-card');
export const imagePopupImage = imagePopup.querySelector('.popup__image');
export const imagePopupText = imagePopup.querySelector('.popup__image-caption');

export const cardPopup = document.querySelector('.popup_add-place');
export const cardForm = cardPopup.querySelector('.popup__form');
export const cardTitleInput = cardPopup.querySelector('.popup__input_type_title');
export const cardSourceInput = cardPopup.querySelector('.popup__input_type_source');

export const profilePopup = document.querySelector('.popup_edit-profile');
export const profileForm = profilePopup.querySelector('.popup__form');
export const profileNameInput = profilePopup.querySelector('.popup__input_type_name');
export const profileJobInput = profilePopup.querySelector('.popup__input_type_job');

