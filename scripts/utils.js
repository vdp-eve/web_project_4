/* --------------------------------- All popups --------------------------------- */
function openModal(popupElement) {
  popupElement.classList.add("popup_open");
  document.addEventListener("keydown", closeWithEsc);
  popupElement.addEventListener("mousedown", closePopupOnRemoteClick);
}

function closeModal(popupElement) {
  popupElement.classList.remove("popup_open");
  document.removeEventListener("keydown", closeWithEsc);
  popupElement.removeEventListener("mousedown", closePopupOnRemoteClick);
}
function closeWithEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_open");
    closeModal(openedPopup);
  }
}
function closePopupOnRemoteClick(evt) {
  if (evt.target.classList.contains("popup__overlay")) {
    closeModal(evt.currentTarget);
  }
}
