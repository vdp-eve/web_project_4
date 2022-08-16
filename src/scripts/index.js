// Index CSS Import
import "../pages/index.css";

// JS Imports
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import { openModal } from "./utils.js";
import { closeModal } from "./utils.js";
import {
  initialCards,
  editAccountOpenBtn,
  accountName,
  accountIconsTitle,
  accountForm,
  editAccountCloseBtn,
  popupAccountName,
  popupAccountIconsTitle,
  submitAccountEdit,
  addPlaceForm,
  popupAddPlaceForm,
  addPlacesOpenBtn,
  addPlaceCloseBtn,
  popupPlaceName,
  popupPlaceUrl,
  submitNewPlace,
  placeList,
  validationSettings,
} from "./constants.js";

// Image Popup
const imagePopup = document.querySelector("#view__image");
const viewImageCloseButton = document.querySelector(".popup__image-close-btn");

// Popup Images

viewImageCloseButton.addEventListener("click", () => closeModal(imagePopup));

// Card Functions
function renderCard(cardEl, container) {
  container.prepend(cardEl);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template");
  return card.getView();
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  renderCard(cardElement, placeList);
});

// Place Form
function submitAddPlaceForm(event) {
  event.preventDefault();
  const name = popupPlaceName.value;
  const link = popupPlaceUrl.value;
  const newCardElement = createCard({ name, link });
  renderCard(newCardElement, placeList);
  closeModal(popupAddPlaceForm);
}

submitNewPlace.addEventListener("submit", submitAddPlaceForm);
addPlacesOpenBtn.addEventListener("click", () => openModal(popupAddPlaceForm));
addPlaceCloseBtn.addEventListener("click", () => closeModal(popupAddPlaceForm));

//Account Form
function submiteditAccountForm(event) {
  event.preventDefault();
  accountName.textContent = popupAccountName.value;
  accountIconsTitle.textContent = popupAccountIconsTitle.value;
  closeModal(accountForm);
}

editAccountOpenBtn.addEventListener("click", () => {
  fillAccountForm();
  openModal(accountForm);
});

const fillAccountForm = () => {
  popupAccountName.value = accountName.textContent;
  popupAccountIconsTitle.value = accountIconsTitle.textContent;
};

editAccountCloseBtn.addEventListener("click", () => closeModal(accountForm));
submitAccountEdit.addEventListener("submit", submiteditAccountForm);

const accountFormValidator = new FormValidator(
  validationSettings,
  submitAccountEdit
);

const placesFormValidator = new FormValidator(
  validationSettings,
  submitNewPlace
);

placesFormValidator.enableValidation();
accountFormValidator.enableValidation();
