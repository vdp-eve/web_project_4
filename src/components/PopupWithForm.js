import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    { handleFormSubmit },
    { loadingButtonText = "Saving..." }
  ) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll(".popup__form-input");
    this._saveButton = this._form.querySelector(".popup__button");
    this._saveButtonText = this._saveButton.textContent;
    this._loadingButtonText = loadingButtonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  _getInputValues() {
    const objData =  {}
    this._inputList.forEach(input => { 
          objData[input.name] = input.value; 
    });
    return objData 
  }

  close() {
    super.close();
    this._form.reset();
  }

  open() {
    super.open();
  }

  renderSaving(isSaving, loadingText = this._loadingButtonText) {
    if (isSaving) {
      this._saveButton.textContent = loadingText;
    } else {
      this._saveButton.textContent = this._saveButtonText;
    }
  }

}
