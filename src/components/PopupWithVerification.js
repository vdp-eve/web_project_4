import Popup from "./Popup";

class PopupWithVerification extends Popup {
  constructor(popupSelector, { loadingButtonText = "Saving..." }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._saveButton = this._form.querySelector(".popup__button");
    this._saveButtonText = this._saveButton.textContent;
    this._loadingButtonText = loadingButtonText;
  }

  open(action) {
    this._handleSubmit = action;
    super.open();
  }
  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", evt => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }

  renderSaving(isSaving, loadingText = this._loadingButtonText) {
    if (isSaving) {
      this._saveButton.textContent = loadingText;
    } else {
      this._saveButton.textContent = this._saveButtonText;
    }
  }
}

export default PopupWithVerification;
