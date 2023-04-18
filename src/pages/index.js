import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js'
import {
  formConfig,
  galleryContainerSelector,
  editButton,
  addCardButton,
  editAvatarButton,
  nameSelector,
  jobSelector,
  avatarSelector,
  imagePopupSelector,
  deleteCardPopupSelector,
  cardPopupSelector,
  avatarPopupSelector,
  avatarForm,
  cardForm,
  profilePopupSelector,
  profileForm,
  apiConfig
} from '../utils/constants.js';

const api = new Api(apiConfig);
const userInfo = new UserInfo({nameSelector, jobSelector, avatarSelector});

let userId;

const handleEditProfileSubmit = ({name, job}) => {
  profilePopup.setButtonLoading('Сохранение...');
  api.editUserInfo({name, about: job})
    .then((data) => {
      userInfo.setUserInfo({name: data.name, job: data.about});
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.setButtonLoading('Сохранить');
    });
}

const handleEditAvatarSubmit = ({avatar}) => {
  avatarPopup.setButtonLoading('Сохранение...');
  api.editUserAvatar(avatar)
    .then((data) => {
      userInfo.setUserAvatar(data.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.setButtonLoading('Сохранить');
    });
}

const handleAddCardSubmit = ({title, source}) => {
  cardPopup.setButtonLoading('Создание...');
  api.addCard({name: title, link: source})
    .then((data) => {
      renderCard(data);
      cardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardPopup.setButtonLoading('Создать');
    });
}

const handleDeleteCardSubmit = (card) => {
  deleteCardPopup.setButtonLoading('Удаление...')
  api.deleteCard(card.getId())
    .then((data) => {
      card.deleteCardElement()
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      deleteCardPopup.setButtonLoading('Да');
    });
}

const handleLikeClick = (card) => {
  api.toggleLike(card.getId(), card.isLiked())
    .then((data) => {
      card.setLike(data.likes)
    })
    .catch((err) => {
      console.log(err);
    });
}

const profilePopup = new PopupWithForm(profilePopupSelector, handleEditProfileSubmit);
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(cardPopupSelector, handleAddCardSubmit);
cardPopup.setEventListeners();

const deleteCardPopup = new PopupWithConfirm(deleteCardPopupSelector);
deleteCardPopup.setEventListeners();

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const avatarPopup = new PopupWithForm(avatarPopupSelector, handleEditAvatarSubmit);
avatarPopup.setEventListeners();

const cardFormValidator = new FormValidator(formConfig, cardForm);
const profileFormValidator = new FormValidator(formConfig, profileForm);
const avatarFormValidator = new FormValidator(formConfig, avatarForm);

const handleCardImageClick = (card) => {
  imagePopup.open(card);
}

const handleCardDelete = (card) => {
  deleteCardPopup.open(() => handleDeleteCardSubmit(card));
}

const createCard = (data) => {
  const card = new Card(data, '#card', handleCardImageClick, handleCardDelete, handleLikeClick, userId);
  const cardElement = card.getCardElement();
  return cardElement;
}

const renderCard = (data) => {
  const cardElement = createCard(data);
  cardList.addItem(cardElement);
}

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

const handleEditAvatarClick = () => {
  avatarFormValidator.hideErrors();
  avatarPopup.open();
}

editButton.addEventListener('click', handleEditProfileClick);
addCardButton.addEventListener('click', handleAddCardClick);
editAvatarButton.addEventListener('click', handleEditAvatarClick);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const cardList = new Section({renderer: renderCard}, galleryContainerSelector);

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then(([initialUserInfo, initialCards]) => {
    userId = initialUserInfo._id;
    userInfo.setUserInfo({name: initialUserInfo.name, job: initialUserInfo.about});
    userInfo.setUserAvatar(initialUserInfo.avatar);
    cardList.renderItems(initialCards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });
