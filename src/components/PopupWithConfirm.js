import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._saveButton = this._popup.querySelector('.popup__save-button');
  }

  open(handleFormSubmit) {
    super.open();
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  setButtonLoading(buttonText) {
    this._saveButton.textContent = buttonText;
  }
}
