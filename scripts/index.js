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

const cardTemplate = document.querySelector('#card').content;
const galleryContainer = document.querySelector('.gallery');

const handleDelete = (evt) => {
  evt.target.closest('.gallery-card').remove();
}

const handleLike = (evt) => {
  evt.target.classList.toggle('gallery-card__like-button_active');
}

const handleIncreaseImage = (evt) => {
  const popup = document.querySelector('.popup_gallery-card');
  const popupImageElement = popup.querySelector('.popup__image');
  const popupTextElement = popup.querySelector('.popup__image-caption');
  const cardElement = evt.target.closest('.gallery-card');
  const cardImageElement = cardElement.querySelector('.gallery-card__image');
  const cardTextElement = cardElement.querySelector('.gallery-card__text');
  popupImageElement.src = cardImageElement.src;
  popupTextElement.textContent = cardTextElement.textContent;
  openPopup(popup);
}

const getCardElement = (card) => {
  const cardElement = cardTemplate.querySelector('.gallery-card').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.gallery-card__image')
  cardImageElement.src = card.link;
  cardElement.querySelector('.gallery-card__text').textContent = card.name;
  const deleteButton = cardElement.querySelector('.gallery-card__delete-button');
  const likeButton = cardElement.querySelector('.gallery-card__like-button');
  deleteButton.addEventListener('click', handleDelete);
  likeButton.addEventListener('click', handleLike);
  cardImageElement.addEventListener('click',handleIncreaseImage);
  return cardElement;
}

const renderCard = (galleryContainer, card) => {
  const cardElement = getCardElement(card);
  galleryContainer.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCard(galleryContainer, card);
})

const handlePopupClose = (evt) => {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

const openPopup = (popup) => {
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', handlePopupClose);
  popup.classList.add('popup_opened');
}

const handleEditProfileSubmit = (evt) => {
  evt.preventDefault();
  const popup = evt.target.closest('.popup')
  const nameInput = popup.querySelector('.popup__input_name');
  const jobInput = popup.querySelector('.popup__input_job');
  const name = nameInput.value;
  const job = jobInput.value;
  if (name === '' || job === '') {
    return
  }
  nameElement.textContent = name;
  jobElement.textContent = job;
  handlePopupClose(evt);
}

const handleAddCardSubmit = (evt) => {
  evt.preventDefault();
  const popup = evt.target.closest('.popup')
  const titleInput = popup.querySelector('.popup__input_title');
  const sourceInput = popup.querySelector('.popup__input_source');
  const title = titleInput.value;
  const source = sourceInput.value;
  if (title === '' || source === '') {
    return
  }
  const card = {name: title, link: source};
  renderCard(galleryContainer, card);
  handlePopupClose(evt);
}

const editButton = document.querySelector('.profile__edit-button');
const nameElement = document.querySelector('.profile__author');
const jobElement = document.querySelector('.profile__description');
const addCardButton = document.querySelector('.profile__add-button');

const handleEditClick = () => {
  const popup = document.querySelector('.popup_edit-profile');
  const formElement = popup.querySelector('.popup__container');
  const nameInput = popup.querySelector('.popup__input_name');
  const jobInput = popup.querySelector('.popup__input_job');
  const name = nameElement.textContent;
  const job = jobElement.textContent;
  nameInput.value = name;
  jobInput.value = job;
  formElement.addEventListener('submit', handleEditProfileSubmit);
  openPopup(popup);
}

const handleAddClick = () => {
  const popup = document.querySelector('.popup_add-place');
  const formElement = popup.querySelector('.popup__container');
  const titleInput = popup.querySelector('.popup__input_title');
  const sourceInput = popup.querySelector('.popup__input_source');
  titleInput.value = '';
  sourceInput.value = '';
  formElement.addEventListener('submit', handleAddCardSubmit);
  openPopup(popup);
}

editButton.addEventListener('click', handleEditClick);
addCardButton.addEventListener('click',handleAddClick);






