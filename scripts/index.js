//Popups

const editAccountPopup = document.querySelector(".popup_type_edit-profile");
const addCardPopup = document.querySelector(".popup_type_add-card");
const imagePopup = document.querySelector(".popup_type_image-preview");

//Forms
const formAccount = document.querySelector(".form_type_profile");
const inputName = document.querySelector(".form__input_type_name");
const inputOccupation = document.querySelector(".form__input_type_occupation");

const formAdd = document.querySelector(".form_type_add");
const addTitleInput = document.querySelector(".form__input_type_image-title");
const addImageInput = document.querySelector(".form__input_type_image-link");

//Buttons
const openAccountPopupButton = document.querySelector(".account__edit-button");
const closeAccountPopupButton = document.querySelector(".popup__button-close");

const closeImagePopupButton = document.querySelector(
  ".popup__button-close_type_image"
);

const addCardButton = document.querySelector(".account__add-button");
const closeAddPopupButton = document.querySelector(
  ".popup__button-close_type_add"
);

//Other Elements
const accountName = document.querySelector(".account__name");
const accountOccupation = document.querySelector(".account__description");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".cards__card");

const cardsList = document.querySelector(".cards__list");

const previewImage = document.querySelector(".popup__image-preview");
const previewImageTitle = document.querySelector(".popup__image-title");

const closeButtons = document.querySelectorAll(".popup__button-close");

//Functions
function handleClickToClose(e) {
  if (e.target.classList.contains("popup_open")) {
    closePopup(e.target);
  }
}

function handleEscToClose(e) {
  if (e.key === "Escape") {
    const popupVisible = document.querySelector(".popup_open");
    closePopup(popupVisible);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("mousedown", handleClickToClose);
  document.addEventListener("keydown", handleEscToClose);
}

function openEditAccountPopup() {
  inputName.value = accountName.textContent;
  inputOccupation.value = accountOccupation.textContent;
  openPopup(editAccountPopup);
}

function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("mousedown", handleClickToClose);
  document.removeEventListener("keydown", handleEscToClose);
}

function saveFormAccountPopup(e) {
  closePopup(editAccountPopup);
  e.preventDefault();
  accountName.textContent = inputName.value;
  accountOccupation.textContent = inputOccupation.value;
}

const createCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__button_type_delete");
  const likeButton = cardElement.querySelector(".card__button_type_like");

  cardImage.src = card.link;
  cardImage.alt = `Photo of ${card.name}`;
  cardTitle.textContent = card.name;

  const handleDelete = () => {
    cardElement.remove();
  };
  deleteButton.addEventListener("click", handleDelete);
  likeButton.addEventListener("click", toggleLikeButton);
  cardImage.addEventListener("click", function () {
    previewImage.src = card.link;
    previewImage.alt = `Photo of ${card.name}`;
    previewImageTitle.textContent = card.name;
    openPopup(imagePopup);
  });

  return cardElement;
};

function toggleLikeButton(e) {
  const activeLikeButton = e.target;
  activeLikeButton.classList.toggle("card__button_type_active");
}

const renderCard = (card) => {
  const item = createCard(card);
  cardsList.prepend(item);
};

initialCards.forEach(renderCard);

//Event Listeners
openAccountPopupButton.addEventListener("click", openEditAccountPopup);

closeAccountPopupButton.addEventListener("click", () => {
  closePopup(editAccountPopup);
});

closeImagePopupButton.addEventListener("click", () => {
  closePopup(imagePopup);
});

addCardButton.addEventListener("click", () => {
  openPopup(addCardPopup);
});

formAccount.addEventListener("submit", saveFormAccountPopup);

closeAddPopupButton.addEventListener("click", () => {
  closePopup(addCardPopup);
});

formAdd.addEventListener("submit", function (e) {
  e.preventDefault();
  const card = {
    name: addTitleInput.value,
    link: addImageInput.value,
  };
  renderCard(card);
  closePopup(addCardPopup);
  formAdd.reset();
});
