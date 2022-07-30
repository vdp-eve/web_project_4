// All Popups
export function openModal(popupElement) {
  popupElement.classList.add("popup_open");
  document.addEventListener("keydown", closeWithEsc);
  popupElement.addEventListener("mousedown", closePopupOnRemoteClick);
}

export function closeModal(popupElement) {
  popupElement.classList.remove("popup_open");
  document.removeEventListener("keydown", closeWithEsc);
  popupElement.removeEventListener("mousedown", closePopupOnRemoteClick);
}
export function closeWithEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_open");
    closeModal(openedPopup);
  }
}
export function closePopupOnRemoteClick(evt) {
  if (evt.target.classList.contains("popup__overlay")) {
    closeModal(evt.currentTarget);
  }
}
