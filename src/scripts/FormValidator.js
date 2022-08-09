import { openModal } from "./utils.js";

class FormValidator {
  constructor(validationSettings, formElement) {
    this._popupForm = formElement;

    this._popupFormSelector = validationSettings.formSelector;
    this._inputSelector = validationSettings.inputSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;
    this._inputList = [
      ...this._popupForm.querySelectorAll(this._inputSelector),
    ];
    this._buttonElement = this._popupForm.querySelector(
      this._submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._popupForm.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._popupForm.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
      });
    });
  }

  enableValidation() {
    this._popupForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
