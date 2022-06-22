const showInputError = (input, formEl, settings) => {
  const errorElement = formEl.querySelector("#" + input.id + "-error");
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (input, formEl, settings) => {
  const errorElement = formEl.querySelector("#" + input.id + "-error");
  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
};

const checkInputValidity = (formEl, input, settings) => {
  if (input.validity.valid) {
    hideInputError(input, formEl, settings);
  } else {
    showInputError(input, formEl, settings);
  }
};

const hasValidInput = (inputList) =>
  inputList.every((input) => input.validity.valid === true);

const toggleButton = (inputList, button, settings) => {
  if (hasValidInput(inputList)) {
    button.disabled = false;
    button.classList.remove(settings.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(settings.inactiveButtonClass);
  }
};

const setEventListeners = (formEl, settings) => {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const button = formEl.querySelector(settings.submitButtonSelector);
  toggleButton(inputList, button, settings);
  inputList.forEach((input) => {
    input.addEventListener("input", (e) => {
      checkInputValidity(formEl, input, settings);
      toggleButton(inputList, button, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => e.preventDefault());
    setEventListeners(formEl, settings);
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  errorClass: "form__input-error_visible",
});

enableValidation(settings);
