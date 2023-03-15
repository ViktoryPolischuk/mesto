export default class Card {
  constructor(data, templateSelector, openImagePopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
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
    this._element.remove();
  }

  _handleLike() {
    this._likeButton.classList.toggle('gallery-card__like-button_active');
  }

  _handleCardImageClick() {
    this._openImagePopup({name: this._name, link: this._link});
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

  getCardElement() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.gallery-card__image');
    this._textElement = this._element.querySelector('.gallery-card__text');
    this._likeButton = this._element.querySelector('.gallery-card__like-button');
    this._deleteButton = this._element.querySelector('.gallery-card__delete-button');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._textElement.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}
