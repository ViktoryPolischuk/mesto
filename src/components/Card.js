export default class Card {
  constructor(data, templateSelector, handleCardClick, handleCardDelete, handleCardLike, userId) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._userId = userId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery-card')
      .cloneNode(true);
    return cardElement;
  }

  _handleDelete() {
    this._handleCardDelete(this);
  }

  _handleLike() {
    this._handleCardLike(this);
  }

  _handleCardImageClick() {
    this._handleCardClick(this._imageElement);
  }

  _toggleLike() {
    this._likeButton.classList.toggle('gallery-card__like-button_active', this.isLiked());
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._handleDelete()
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLike()
    });
    this._imageElement.addEventListener('click', () => {
      this._handleCardImageClick()
    });
  }

  getId() {
    return this._id;
  }

  getCardElement() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.gallery-card__image');
    this._textElement = this._element.querySelector('.gallery-card__text');
    this._likeCount = this._element.querySelector('.gallery-card__like-count');
    this._likeButton = this._element.querySelector('.gallery-card__like-button');
    this._deleteButton = this._element.querySelector('.gallery-card__delete-button');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._textElement.textContent = this._name;
    this._likeCount.textContent = this._likes.length;
    this._deleteButton.classList.toggle('gallery-card__delete-button_visible', this._userId === this._ownerId)
    this._toggleLike()
    this._setEventListeners();
    return this._element;
  }

  deleteCardElement() {
    this._element.remove();
  }

  setLike(likes) {
    this._likes = likes;
    this._likeCount.textContent = this._likes.length;
    this._toggleLike();
  }

  isLiked() {
    return this._likes.some(user => user._id === this._userId);
  }
}
