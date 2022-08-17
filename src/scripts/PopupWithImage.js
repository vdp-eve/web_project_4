import Popup from "../scripts/Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = document.querySelector(".popup__image-preview");
  }

  open(name, link) {
    const photoElement = this._cardImage;
    photoElement.alt = name;
    document.querySelector(".popup__preview-name").textContent = name;
    photoElement.src = link;
  }
}

export default PopupWithImage;
