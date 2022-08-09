import { openModal } from "./utils.js";

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.apply(this);
    this._closePopup = this._closePopup.apply(this);
  }

  close() {
    this._popup.classList.remove("popup_open");
    document.removeEventListener("keydown", this._handleEscCLose);
    this._popup.removeEventListener("mousedown", this._closePopup);
  }

  open() {
    this._popup.classList.add("popup_open");
    this._popup.addEventListener("mousedown", this._closePopup);
    document.addEventListener("keydown", this._handleEscClose);
  }

  _closePopup(event) {
    if (event.target.classList.contains("popup__overlay")) {
      this.close();
    }
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup
      .querySelector(".popup__close-btn")
      .addEventListener("click", () => this.close());
  }
}

export default Popup;
