import "./index.css"; 

import FormValidator from "../components/FormValidator.js"; 

import Card from "../components/Card.js"; 

import Section from "../components/Section.js"; 

import PopupWithImage from "../components/PopupWithImage.js"; 

import PopupWithForm from "../components/PopupWithForm.js"; 

import UserInfo from "../components/UserInfo.js"; 

import { 

  initialPlaces, 

  placeList, 

  addPopupSelector, 

  editaccountOpenBtn, 

  submitaccountEdit, 

  addPlacesOpenBtn, 

  popupPlaceName, 

  popupPlaceUrl, 

  popupaccountName, 

  accountNameInput, 

  popupaccountIconsTitle, 

  accountOccupationInput, 

  submitNewPlace, 

  editPopupSelector, 

  accountName, 

  accountJob, 

  validationConfig, 

} from "../utils/constants.js"; 

 

/*-------------------- Cards -------------------*/ 

const createCard = (cardData) => { 

  const card = new Card( 

    cardData, 

    "#card-template", 

    () => { 

      handleCardClick(cardData); 

    }, 

    () => { 

      if (document.querySelector(".cards__list").childNodes.length) { 

        document 

          .querySelector(".cards__no-places") 

          .classList.remove("cards__no-places_active"); 

      } else { 

        document 

          .querySelector(".cards__no-places") 

          .classList.add("cards__no-places_active"); 

      } 

    } 

  ); 

 

  return card.getView(); 

}; 

 

//section called cardList created for cards 

const cardList = new Section( 

  { 

    items: initialPlaces, 

    renderer: (cardData) => { 

      cardList.addItem(createCard(cardData)); 

    }, 

  }, 

  placeList 

); 

 

const previewImagePopup = new PopupWithImage("#view__image"); 

 

const handleCardClick = (item) => { 

  previewImagePopup.open(item.name, item.link); 

}; 

 

/*-----------------------New Card Submit Form---------------------------------*/ 

const addNewCard = new PopupWithForm(addPopupSelector, { 

  handleFormSubmit: (data) => { 

    //create card and add to card list section 

    cardList.addItem(createCard(data)); 

    addNewCard.close(); 

  }, 

}); 

 

addPlacesOpenBtn.addEventListener("click", () => { 

  addNewCard.open(); 

  placesFormValidator.resetValidation(); 

}); 

 

/*-----------------------Edit account Submit Form---------------------------------*/ 

 

const newUserInfo = new UserInfo({ 

  nameSelector: accountName, 

  jobSelector: accountJob, 

}); 

 

const editFormPopup = new PopupWithForm(editPopupSelector, { 

  handleFormSubmit: (data) => { 

    newUserInfo.setUserInfo(data); 

    editFormPopup.close(); 

  }, 

}); 

 

editaccountOpenBtn.addEventListener("click", () => { 

  popupaccountName.value = accountNameInput.textContent; 

  popupaccountIconsTitle.value = accountOccupationInput.textContent; 

  editFormPopup.open(); 

  //const { name, occupation } = newUserInfo.getUserInfo(); 

  accountFormValidator.resetValidation(); 

}); 

 

/* --------------------------------- Verification --------------------------------- */ 

const accountFormValidator = new FormValidator( 

  validationConfig, 

  submitaccountEdit 

); 

const placesFormValidator = new FormValidator(validationConfig, submitNewPlace); 

 

cardList.renderItems(); 

placesFormValidator.enableValidation(); 

accountFormValidator.enableValidation(); 

editFormPopup.setEventListeners(); 

previewImagePopup.setEventListeners(); 

addNewCard.setEventListeners(); 

 