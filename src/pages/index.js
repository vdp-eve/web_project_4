import "./index.css";
import { api } from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import popupWithVerification from "../components/PopupWithVerification.js";
import FormValidator from "../components/FormValidator.js";
import {
  placeList,
  addPopupSelector,
  editaccountOpenBtn,
  submitaccountEdit,
  addPlacesOpenBtn,
  editaccountPicButton,
  accountPicSelector,
  popupPlaceName,
  popupPlaceUrl,
  popupaccountName,
  submitNewaccountPic,
  accountNameInput,
  popupaccountIconsTitle,
  accountAboutInput,
  submitNewPlace,
  editPopupSelector,
  accountName,
  accountJob,
  validationConfig
} from "../utils/constants.js";
let userId;

/*---------------Delete card------------------*/
const confirmationPopup = new popupWithVerification("#delete-popup", {
  loadingButtonText: "Deleting..."
});
confirmationPopup.setEventListeners();

/*----------------Render card function----------------*/
const renderCard = cardDataPlaceHolder => {
  const cardElement = createCard(cardDataPlaceHolder);
  cardList.addItem(cardElement);
};

/*----------------Instantiate an object for placing cards into container that contains the cards----------------*/
const cardList = new Section(
  {
    renderer: renderCard
  },
  placeList
);

/*----------------Instantiate object for showing popup image----------------*/

const previewImagePopup = new PopupWithImage("#view__image");
const handleCardClick = item => {
  previewImagePopup.open(item.name, item.link);
};

/*-----------------------New Card Object ---------------------------------*/
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

/*----------------Add Card event listener----------------*/
addPlacesOpenBtn.addEventListener("click", () => {
  addNewCardPopup.open();
  placesFormValidator.resetValidation();
});

/*-----------------------Edit account Submit Form---------------------------------*/
const userInfo = new UserInfo({
  nameSelector: accountName,
  jobSelector: accountJob,
  accountPicSelector: accountPicSelector
});
/*-----------------------New Popup Form object ---------------------------------*/
const editFormPopup = new PopupWithForm(
  editPopupSelector,
  {
    handleFormSubmit: data => {
      editaccount(data);
    }
  },
  {
    loadingButtonText: "Saving..."
  }
);
/*----------------Edit account event listener----------------*/
editaccountOpenBtn.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  popupaccountName.value = name;
  popupaccountIconsTitle.value = about;
  editFormPopup.open();
  accountFormValidator.resetValidation();
});
/*------------------------------------account picture edit--------------------------*/
const editPofilePicForm = new PopupWithForm(
  "#edit-account-pic-popup",
  {
    handleFormSubmit: data => {
      changeaccountImage(data);
    }
  },
  {
    loadingButtonText: "Updating image..."
  }
);

/*----------------Edit account picture event listener----------------*/
editPofilePicForm.setEventListeners();
editaccountPicButton.addEventListener("click", () => {
  editPofilePicForm.open();
  accountPicFormValidator.resetValidation();
});

/* ---------------------------------New Verification object for the account form --------------------------------- */
const accountFormValidator = new FormValidator(
  validationConfig,
  submitaccountEdit
);
/* ---------------------------------New Verification object for the add card form --------------------------------- */
const placesFormValidator = new FormValidator(validationConfig, submitNewPlace);

/* ---------------------------------New Verification object for the adding new account pic form --------------------------------- */
const accountPicFormValidator = new FormValidator(
  validationConfig,
  submitNewaccountPic
);
/*-------------------Call Verification object event listener for pupsubmiting--------------------------------*/
placesFormValidator.enableValidation();
accountFormValidator.enableValidation();
accountPicFormValidator.enableValidation();

/*-------------------Call event listeners for popup with forms--------------------------------*/
editFormPopup.setEventListeners();
addNewCardPopup.setEventListeners();

/*-------------------Call event listeners for popup with preview --------------------------------*/
previewImagePopup.setEventListeners();

/*--------------Function for creating new card ----------------------*/
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

/*------------------ Function to delete or change like status on server and DOM ----------------------------*/
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
/*------------------Function for updating owner account information on server and DOM----------------------------*/
const editaccount = accountDataPlaceholder => {
  editFormPopup.renderSaving(true);
  api
    .setUserInfo(accountDataPlaceholder)
    .then(accountDataPlaceholder => {
      userInfo.setUserInfo({
        name: accountDataPlaceholder.name,
        about: accountDataPlaceholder.about
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
/*--------------Function for adding new card  info to server and the DOM ----------------------*/
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
/*--------------Function for updating account image string on server and DOM----------------------*/
const changeaccountImage = accountImageUrlPlaceholder => {
  editPofilePicForm.renderSaving(true);
  api
    .updateaccountPic(accountImageUrlPlaceholder)
    .then(accountImageUrlPlaceholder => {
      userInfo.setUserAvatar({
        avatar: accountImageUrlPlaceholder.avatar
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
/*------------------Function to delete card from server and DOM ---------------------------*/
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
/*---------------GET data for cards information and account information from api---------------------------------*/
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
