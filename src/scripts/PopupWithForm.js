import { openModal } from "./utils.js";
import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, { handlePopupFormSave }) {
    super(popupSelector);
    this._handlePopupFormSave = handlePopupFormSave;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popupForm.qierySelectorAll(".popup__form-input");
    this._saveButton = this._popupForm.querySelector(".popup__button");
    this._saveButtonContent = this._saveButton.value;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handlePopupFormSave(this._getInputValues());
    });
  }

  _getInputValues() {
    this._objData = {};
    this._inputList.forEach((input) => {
      this._objData[input.name] = input.value;
    });
    return this._objData;
  }

  setInputValues(data) {
    this._objInput = {};
    this._inputList.forEach((input) => {
      console.log(data);
      this._objInput[input.name] = data[input.value];
    });
  }

  close() {
    super.close();
    this._saveButton._textContent = "Save";
    this._popupForm.reset();
  }
}

export default PopupWithForm;
