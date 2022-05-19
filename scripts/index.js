const popup = document.querySelector(".popup");
const editForm = document.querySelector(".popup__form");
const editButton = document.querySelector(".account__edit-button");
const closeButton = document.querySelector(".popup__close");
const accountName = document.querySelector(".account__name");
const accountDescription = document.querySelector(".account__description");
const nameInputField = document.querySelector(".popup__input_type_name");
const titleInputField = document.querySelector(
  ".popup__input_type_description"
);

function popUpVisibility() {
  if (!popup.classList.contains("popup__is_opened")) {
    nameInputField.value = accountName.textContent;
    titleInputField.value = accountDescription.textContent;
  }
  popup.classList.toggle("popup__is_opened");
}

function submitForm(event) {
  event.preventDefault();
  accountName.textContent = nameInputField.value;
  accountDescription.textContent = titleInputField.value;

  popUpVisibility();
}

editForm.addEventListener("submit", submitForm);
editButton.addEventListener("click", popUpVisibility);
closeButton.addEventListener("click", popUpVisibility);
