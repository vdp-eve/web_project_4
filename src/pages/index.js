// Index CSS Import
import "./index.css";

// JS Imports
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Api from "../components/api.js";
import UserInfo from "../components/UserInfo.js";
import {
  editAccountOpenBtn,
  accountName,
  accountTitle,
  accountForm,
  popupAccountName,
  accountNameInput,
  accountTitleInput,
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

const api = new Api ({
baseUrl: "https://around.nomoreparties.co/v1/group-12",
authToken: "099989f7-9742-46ef-99f8-aa8e6872a6c3 "
});

api.getCardList().then(res => console.log(res))
api.getCardList().then(cardData => {
  const cardList = new Section( 
    { 
      items: cardData, 
      renderer: (cardData) => { 
        cardList.addItem(createCard(cardData)); 
      }, 
    }, 
    placeList 
  ); 
});

// Card Functions

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
  careerSelector: accountTitle
}); 

const editFormPopup = new PopupWithForm(accountForm, { 
  handleFormSubmit: (data) => { 
    newUserInfo.setUserInfo(data); 
    editFormPopup.close(); 
  }, 
}); 

editAccountOpenBtn.addEventListener("click", () => { 
  const {name, occupation} = newUserInfo.getUserInfo()
  popupAccountName.value = name;
  popupAccountTitle.value = occupation;
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

placesFormValidator.enableValidation();
accountFormValidator.enableValidation();
editFormPopup.setEventListeners(); 
previewImagePopup.setEventListeners(); 
addNewCard.setEventListeners(); 
