export const editaccountOpenBtn = document.querySelector(".account__edit-btn");
export const accountNameInput = document.querySelector(".account__edit-name");
export const accountOccupationInput =
  document.querySelector(".account__about-me");
export const popupaccountName = document.querySelector(
  ".js-input-type-account-name"
);
export const popupaccountIconsTitle = document.querySelector(
  ".js-input-type-account-about-me"
);
export const submitaccountEdit = document.querySelector(".popup__edit-form");
/* -------------------------------- add place ------------------------------- */
export const addPlacesOpenBtn = document.querySelector(
  ".account__add-places-btn"
);
export const popupPlaceName = document.querySelector(
  ".js-input-type-place-name"
);
export const popupPlaceUrl = document.querySelector(".js-input-type-place-url");
export const submitNewPlace = document.querySelector(".popup__place-form");
/* ----------------------------- Generate Cards ----------------------------- */
export const placeList = document.querySelector(".cards__list");
/* ------------------------------ image preview ----------------------------- */

export const addPopupSelector = "#add-place-popup";
export const editPopupSelector = "#edit__account";
export const accountName = ".account__edit-name";
export const accountJob = ".account__about-me";

export const initialPlaces = [
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

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-type-error",
  errorClass: "popup__error_visible",
};
