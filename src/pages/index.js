// Index CSS Import

import "./index.css"; 
 
// JS Imports 
import { api } from "../components/Api.js"; 
import Card from "../components/Card.js"; 
import Section from "../components/Section.js"; 
import PopupWithImage from "../components/PopupWithImage.js"; 
import PopupWithForm from "../components/PopupWithForm.js"; 
import UserInfo from "../components/UserInfo.js"; 
import PopupWithVerification from "../components/PopupWithVerification.js"; 
import FormValidator from "../components/FormValidator.js"; 
import { 
  editAccountOpenBtn, 
  accountName, 
  accountTitle, 
  submitAccountEdit, 
  addPlacesOpenBtn, 
  editAccountPicButton, 
  accountPicSelector, 
  popupPlaceName, 
  popupPlaceUrl, 
  popupAccountName, 
  submitNewAccountPic, 
  accountNameInput, 
  popupAccountIconsTitle, 
  accountTitleInput, 
  submitNewPlace, 
  editPopupSelector, 
  placeList,

  addPopupSelector, 
  validationSettings

} from "../utils/constants.js"; 

let userId; 


// Card Functions 
const confirmationPopup = new PopupWithVerification("#delete-popup", { 
  loadingButtonText: "Deleting..." 
}); 
confirmationPopup.setEventListeners(); 

 
const renderCard = cardDataPlaceHolder => { 
  const cardElement = createCard(cardDataPlaceHolder); 
  cardList.addItem(cardElement); 
}; 
 
const cardList = new Section( 
  { 
    renderer: renderCard 
  }, 
  placeList 
); 
 
 
const previewImagePopup = new PopupWithImage("#view__image"); 
const handleCardClick = item => { 
  previewImagePopup.open(item.name, item.link); 
}; 
 
const addNewCardPopup = new PopupWithForm( 
  addPopupSelector, 
  { 
    handleFormSubmit: data => { 
      addACard(data); 
    } 
  }, 
  { 
    loadingButtonText: "Saving..." 
 } 
); 
 
addPlacesOpenBtn.addEventListener("click", () => { 
 addNewCardPopup.open(); 
  placesFormValidator.resetValidation(); 
}); 
 
const userInfo = new UserInfo({ 
  nameSelector: accountName, 
  jobSelector: accountTitle, 
  accountPicSelector: accountPicSelector 
}); 
 
// Popup Functions 
const editFormPopup = new PopupWithForm( 
  editPopupSelector, 
  { 
    handleFormSubmit: data => { 
      editAccount(data); 
    } 
  }, 
  { 
    loadingButtonText: "Saving..." 
  } 
); 
editAccountOpenBtn.addEventListener("click", () => { 
  const { name, about } = userInfo.getUserInfo(); 
  popupAccountName.value = name; 
  popupAccountIconsTitle.value = about; 

  editFormPopup.open(); 
  accountFormValidator.resetValidation(); 
}); 
const editPofilePicForm = new PopupWithForm( 
  "#edit-account-pic-popup", 
  { 
    handleFormSubmit: data => { 
      changeAccountImage(data); 
    } 
  }, 
  { 
    loadingButtonText: "Updating image..." 
  } 
); 
 
editPofilePicForm.setEventListeners(); 
editAccountPicButton.addEventListener("click", () => { 
  editPofilePicForm.open(); 
  accountPicFormValidator.resetValidation(); 
}); 
 
const accountFormValidator = new FormValidator( 
  validationSettings, 
  submitAccountEdit 
); 
const placesFormValidator = new FormValidator(validationSettings, submitNewPlace); 
 
const accountPicFormValidator = new FormValidator( 
  validationSettings, 
  submitNewAccountPic 
); 
 
editFormPopup.setEventListeners(); 
addNewCardPopup.setEventListeners(); 
 
previewImagePopup.setEventListeners(); 
 
const createCard = cardDataPlaceHolder => { 
  const card = new Card( 
    cardDataPlaceHolder, 
    "#card-template", 
    () => { 

      handleCardClick(cardDataPlaceHolder);
    }, 
    () => { 
      confirmationPopup.open(() => {
        handleDeleteConfirmation(card); 
      }); 
    }, 
    () => { 
      toggleLike(card); 
    }, 
    userId 
  ); 
  return card.getView(); 
}; 
 
const toggleLike = cardPlaceholder => { 
  api 
    .toggleLike(cardPlaceholder.getCardId(), cardPlaceholder.isLiked()) 
    .then(likes => { 
      cardPlaceholder.updateLikes(likes.likes); 
    }) 
    .catch(err => { 
      console.log(err); 
    }); 
}; 
const editAccount = accountData => { 
  editFormPopup.renderSaving(true); 
  api 
    .setUserInfo(accountData) 
    .then(accountData => { 
      userInfo.setUserInfo({ 
        name: accountData.name, 
        about: accountData.about 
      }); 
      editFormPopup.close(); 
    }) 
    .catch(err => { 
      console.log(err); 
    }) 
    .finally(() => { 
      editFormPopup.renderSaving(false); 
    }); 
}; 
const addACard = cardDataPlaceholder => { 
  addNewCardPopup.renderSaving(true); 
  api 
    .addCard(cardDataPlaceholder) 
    .then(res => { 
      renderCard(res); 
      addNewCardPopup.close(); 
    }) 
    .catch(err => { 
      console.log(err); 
    }) 
    .finally(() => { 
      addNewCardPopup.renderSaving(false); 
    }); 
}; 
const changeAccountImage = accountImageUrl => { 
  editPofilePicForm.renderSaving(true); 
  api 
    .updateAccountPic(accountImageUrl) 
    .then(accountImageUrl => { 
      userInfo.setUserAvatar({ 
        avatar: accountImageUrl.avatar 
      }); 
      editPofilePicForm.close(); 
    }) 
    .catch(err => { 
      console.log(err); 
    }) 
    .finally(() => { 
      editPofilePicForm.renderSaving(false); 
    }); 
}; 
const handleDeleteConfirmation = card => { 
  confirmationPopup.renderSaving(true); 
  api 
    .deleteCard(card.getCardId()) 
    .then(() => { 
      card.removeCard(); 
      confirmationPopup.close(); 
    }) 
    .catch(err => { 
      console.log(err); 
    }) 
    .finally(() => { 
      confirmationPopup.renderSaving(false); 
    }); 
}; 
api 
  .initialize() 
  .then(([user, cardsData]) => { 
    userId = user._id; 
    cardList.renderItems(cardsData); 
    userInfo.setUserInfo({ 
      name: user.name, 
      about: user.about 
    }); 
    userInfo.setUserAvatar({ 
      avatar: user.avatar 
    }); 
  }) 
  .catch(err => { 
    console.log(err); 
  }); 
 
placesFormValidator.enableValidation(); 
accountFormValidator.enableValidation(); 
accountPicFormValidator.enableValidation(); 