import Card from './components/Card.js'
import FormValidator from './components/FormValidator.js';
import UserInfo from './components/UserInfo.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import Section from './components/Section.js';
import {
  initialCards,
  formConfig,
  galleryContainerSelector,
  editButton,
  addCardButton,
  nameSelector,
  jobSelector,
  imagePopupSelector,
  cardPopupSelector,
  cardForm,
  profilePopupSelector,
  profileForm,
} from './utils/constants.js';

const userInfo = new UserInfo({nameSelector, jobSelector});

const handleEditProfileSubmit = ({name, job}) => {
  if (name === '' || job === '') {
    return
  }
  userInfo.setUserInfo({name, job})
  profilePopup.close();
}


const handleAddCardSubmit = ({title, source}) => {
  if (title === '' || source === '') {
    return
  }
  renderCard({name: title, link: source});
  cardPopup.close();
}

const profilePopup = new PopupWithForm(profilePopupSelector, handleEditProfileSubmit);
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(cardPopupSelector, handleAddCardSubmit);
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const cardFormValidator = new FormValidator(formConfig, cardForm);
const profileFormValidator = new FormValidator(formConfig, profileForm);

const handleCardImageClick = (card) => {
  imagePopup.open(card);
}

const createCard = (data) => {
  const card = new Card(data, '#card', handleCardImageClick);
  const cardElement = card.getCardElement();
  return cardElement;
}

const renderCard = (data) => {
  const cardElement = createCard(data);
  cardList.addItem(cardElement);
}

const cardList = new Section({items: initialCards, renderer: renderCard}, galleryContainerSelector);

const handleEditProfileClick = () => {
  const {name, job} = userInfo.getUserInfo();
  profileForm.name.value = name;
  profileForm.job.value = job;
  profileFormValidator.hideErrors();
  profilePopup.open();
}

const handleAddCardClick = () => {
  cardFormValidator.hideErrors();
  cardPopup.open();
}

editButton.addEventListener('click', handleEditProfileClick);
addCardButton.addEventListener('click', handleAddCardClick);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

cardList.renderItems()
