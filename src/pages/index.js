// Index CSS Import
import "./index.css";

// JS Imports
import FormValidator from "../scripts/FormValidator.js";
import Card from "../scripts/Card.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import {
  initialCards,
  editAccountOpenBtn,
  accountName,
  accountTitle,
  accountForm,
  popupAccountName,
  popupAccountTitle,
  submitAccountEdit,
  addPlaceForm,
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

//New Card Form
const addNewCard = new PopupWithForm(popupAddPlaceForm, { 
  handleFormSubmit: (cardData) => { 
    cardList.addItem(createCard(cardData)); 
    addNewCard.close(); 
  }, 
}); 

addPlacesOpenBtn.addEventListener("click", () => { 
  addNewCard.open(); 
  placesFormValidator.resetValidation(); 
}); 

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