class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._handleCardClick = handleCardClick;
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = document
      .querySelector(templateSelector)
      .content.querySelector(".card");
    this._element;
    this._cardImage;
  }
  createCardElement() {
    this._element = this._getElement();

    this._setImageAndName();
    this._setEventListener();

    return this._element;
  }

  _getElement() {
    return this._cardTemplate.cloneNode(true);
  }
  _setEventListener() {
    const likeButton = this._element.querySelector(".card__button_type_like");
    const deleteButton = this._element.querySelector(
      ".card__button_type_delete"
    );
    likeButton.addEventListener("click", this._like);
    deleteButton.addEventListener("click", this._delete);

    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _like(evt) {
    const heart = evt.target;
    heart.classList.toggle("card__active-button");
  }

  _delete = () => {
    this._element.remove();
    this._element = null;
  };

  _setImageAndName() {
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.style = `background-image:url(${this._link});`;
    this._element.querySelector(".card__title").textContent = this._name;
  }
}

export default Card;
