import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

//Edit Account Section
const editAccountOpenBtn = document.querySelector(".account__edit-btn");
const accountName = document.querySelector(".account__name");
const accountIconsTitle = document.querySelector(".account__occupation");
const accountForm = document.querySelector("#account__edit");
const editAccountCloseBtn = document.querySelector(".popup__edit-close");
const popupAccountName = document.querySelector(".popup__account-name");
const popupAccountIconsTitle = document.querySelector(
  ".popup__account-occupation"
);
const submitaccountEdit = document.querySelector(".popup__edit-form");

// Add Place Section
const addPlaceForm = document.forms.addPlaceForm;
const popupAddPlaceForm = document.querySelector("#add__place");
const addPlacesOpenBtn = document.querySelector(".account__add-btn");
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
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
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
function submitAddPlaceForm(evt) {
  evt.preventDefault();
  const name = popupPlaceName.value;
  const link = popupPlaceUrl.value;
  const newCardElement = createCard({ name, link });
  renderCard(newCardElement, placeList);
  closeModal(popupAddPlaceForm);
  addPlaceForm.reset();
  console.log(newCardElement);
  placesFormValidator.toggleButtonState();
}

submitNewPlace.addEventListener("submit", submitAddPlaceForm);
addPlacesOpenBtn.addEventListener("click", () => openModal(popupAddPlaceForm));
addPlaceCloseBtn.addEventListener("click", () => closeModal(popupAddPlaceForm));

//Account Form
function submitEditaccountForm(evt) {
  evt.preventDefault();
  accountName.textContent = popupAccountName.value;
  accountIconsTitle.textContent = popupAccountIconsTitle.value;
  closeModal(accountForm);
}

editAccountOpenBtn.addEventListener("click", () => {
  fillaccountForm();
  openModal(accountForm);
});

const fillaccountForm = () => {
  popupAccountName.value = accountName.textContent;
  popupAccountIconsTitle.value = accountIconsTitle.textContent;
};

editAccountCloseBtn.addEventListener("click", () => closeModal(accountForm));
submitaccountEdit.addEventListener("submit", submitEditaccountForm);

// Validation
const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__button",
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
