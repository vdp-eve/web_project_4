//Account and Place Sections
export const editAccountOpenBtn = document.querySelector(
  ".account__edit-button"
);

export const accountNameInput = document.querySelector(".account__name");
export const accountTitleInput = document.querySelector(".account__description");
export const accountName = ".account__name";
export const accountTitle = 
  ".account__description"
;
export const accountForm = "#account__edit";
export const editAccountCloseBtn = document.querySelector(".popup__edit-close");
export const popupAccountName = document.querySelector(".popup__account-name");
export const popupAccountTitle = document.querySelector(
  ".popup__account-description"
);
export const submitAccountEdit = document.querySelector(".popup__edit-form");

// Popup Sections
export const popupAddPlaceForm = "#add__place";
export const addPlacesOpenBtn = document.querySelector(".account__add-button");
export const addPlaceCloseBtn = document.querySelector(
  ".popup__place-close-btn"
);
export const popupPlaceName = document.querySelector(".popup__place-name");
export const popupPlaceUrl = document.querySelector(".popup__place-link");
export const submitNewPlace = document.querySelector(".popup__place-form");

// Cards List
export const placeList = document.querySelector(".cards__list");

// Place Cards
export const initialCards = [
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

// Validators

export const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-type-error",
  errorClass: "popup__error_visible",
};
