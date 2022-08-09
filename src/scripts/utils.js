// Popups
export function openModal(popupElement) {
  popupElement.classList.add("popup_open");
  document.addEventListener("keydown", closeWithEsc);
  popupElement.addEventListener("mousedown", closePopup);
}

export function closeModal(popupElement) {
  popupElement.classList.remove("popup_open");
  document.removeEventListener("keydown", closeWithEsc);
  popupElement.removeEventListener("mousedown", closePopup);
}
export function closeWithEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_open");
    closeModal(openedPopup);
  }
}
export function closePopup(event) {
  if (event.target.classList.contains("popup__overlay")) {
    closeModal(event.currentTarget);
  }
}
