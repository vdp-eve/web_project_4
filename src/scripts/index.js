// Index CSS Import
import "../pages/index.css";

// JS Imports
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import { openModal } from "./utils.js";
import { closeModal } from "./utils.js";

//Edit Account Section
const editAccountOpenBtn = document.querySelector(".account__edit-button");
const accountName = document.querySelector(".account__name");
const accountIconsTitle = document.querySelector(".account__description");
const accountForm = document.querySelector("#account__edit");
const editAccountCloseBtn = document.querySelector(".popup__edit-close");
const popupAccountName = document.querySelector(".popup__account-name");
const popupAccountIconsTitle = document.querySelector(
  ".popup__account-description"
);
const submitaccountEdit = document.querySelector(".popup__edit-form");

// Add Place Section
const addPlaceForm = document.forms.addPlaceForm;
const popupAddPlaceForm = document.querySelector("#add__place");
const addPlacesOpenBtn = document.querySelector(".account__add-button");
const addPlaceCloseBtn = document.querySelector(".popup__place-close-btn");
const popupPlaceName = document.querySelector(".popup__place-name");
const popupPlaceUrl = document.querySelector(".popup__place-link");
const submitNewPlace = document.querySelector(".popup__place-form");

// Cards List
const placeList = document.querySelector(".cards__list");

// Image Popup
const imagePopup = document.querySelector("#view__image");
const viewImageCloseBtn = document.querySelector(".popup__image-close-btn");

// Place Cards
const initialCards = [
  {
    name: "Reaching for the Moon",
    link: "https://i.pinimg.com/564x/88/9b/36/889b3607b2b93430b40d7f03ae918e8d.jpg",
  },
  {
    name: "Portrait of Barbara of Portugal",
    link: "https://i.pinimg.com/564x/8a/a0/70/8aa07053178cb1bbb4a3f93379d750d2.jpg",
  },
  {
    name: "Simerenya",
    link: "https://i.pinimg.com/564x/46/66/30/46663050e388550bf24b80861796271e.jpg",
  },
  {
    name: "Cupid and Psyche",
    link: "https://i.pinimg.com/564x/16/e2/8b/16e28bbb488085cf5df69f62c07791cb.jpg",
  },
  {
    name: "Street in the Evening, Prague",
    link: "https://i.pinimg.com/564x/fe/85/3b/fe853b12ee5290a4b0967ec6e20de782.jpg",
  },
  {
    name: "Girl at the Piano",
    link: "https://i.pinimg.com/564x/d7/0b/53/d70b534791f50f62e741669aecd7a479.jpg",
  },
  {
    name: "Going Home",
    link: "https://i.pinimg.com/564x/ad/53/2b/ad532b31bbfcd006c6b8f33a9b4cebf3.jpg",
  },
  {
    name: "Rainy Night",
    link: "https://i.pinimg.com/564x/1a/50/32/1a50321b905b5ddd60b2802c1b50ad4b.jpg",
  },
  {
    name: "The Spreading Tree",
    link: "https://i.pinimg.com/564x/d6/b2/f9/d6b2f9465797c4adec5fca641a1dd2d8.jpg",
  },
];

// Popup Images

viewImageCloseBtn.addEventListener("click", () => closeModal(imagePopup));

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
  addPlaceForm.reset();
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
submitaccountEdit.addEventListener("submit", submiteditAccountForm);

// Validators
const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  saveButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-type-error",
  errorClass: "popup__error_visible",
};

const accountFormValidator = new FormValidator(
  validationSettings,
  submitaccountEdit
);
const placesFormValidator = new FormValidator(
  validationSettings,
  submitNewPlace
);
placesFormValidator.enableValidation();
accountFormValidator.enableValidation();
