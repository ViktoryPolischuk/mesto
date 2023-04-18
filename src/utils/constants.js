export const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '0290023b-a6d2-4cdb-a8f6-af248bc818b9',
    'Content-Type': 'application/json'
  }
};

export const galleryContainerSelector = '.gallery';

export const editButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');
export const editAvatarButton = document.querySelector('.profile__avatar-button');

export const nameSelector = '.profile__author';
export const jobSelector = '.profile__description';
export const avatarSelector = '.profile__avatar-image';

export const imagePopupSelector = '.popup_gallery-card';
export const deleteCardPopupSelector = '.popup_delete-card';

export const cardPopupSelector = '.popup_add-place';
export const cardForm = document.querySelector('.popup__form_add-place');

export const profilePopupSelector = '.popup_edit-profile';
export const profileForm = document.querySelector('.popup__form_edit-profile');

export const avatarPopupSelector = '.popup_edit-avatar';
export const avatarForm = document.querySelector('.popup__form_edit-avatar');
