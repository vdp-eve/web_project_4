// Index CSS Import
import "./index.css";

// JS Imports
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  editAccountOpenBtn,
  accountName,
  accountTitle,
  accountForm,
  popupAccountName,
  popupAccountTitle,
  submitAccountEdit,
  popupAddPlaceForm,
  addPlacesOpenBtn,
  popupPlaceName,
  popupPlaceUrl,
  submitNewPlace,
  placeList,
  validationSettings,
} from "../utils/constants.js";

// Card Functions

const createCard = (cardData) => { 
  const card = new Card( 
    cardData, 
    "#card-template",
    () => { 
      handleCardClick(cardData); 
    }, 
  ); 
  return card.getView(); 
}; 

 
const cardList = new Section( 
  { 
    items: initialCards, 
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
//Card Submit Form
const addNewCard = new PopupWithForm(popupAddPlaceForm, { 
  handleFormSubmit: (data) => { 
    cardList.addItem(createCard(data)); 
    addNewCard.close(); 
  }, 
}); 
 
addPlacesOpenBtn.addEventListener("click", () => { 
  addNewCard.open(); 
  placesFormValidator.resetValidation(); 
}); 
//Edit Submit Form
 
const newUserInfo = new UserInfo({ 
  nameSelector: accountName, 
  careerSelector: accountTitle, 
}); 

const editFormPopup = new PopupWithForm(accountForm, { 
  handleFormSubmit: (data) => { 
    newUserInfo.setUserInfo(data); 
    editFormPopup.close(); 
  }, 
}); 

editAccountOpenBtn.addEventListener("click", () => { 
  popupAccountName.value = accountName.textContent; 
  popupAccountTitle.value = accountTitle.textContent; 
  editFormPopup.open(); 
  accountFormValidator.resetValidation(); 
}); 

const accountFormValidator = new FormValidator(
  validationSettings,
  submitAccountEdit
);

const placesFormValidator = new FormValidator(
  validationSettings,
  submitNewPlace
);

cardList.renderItems();
placesFormValidator.enableValidation();
accountFormValidator.enableValidation();
editFormPopup.setEventListeners(); 
previewImagePopup.setEventListeners(); 
addNewCard.setEventListeners(); 