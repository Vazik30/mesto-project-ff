
function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown',handleEscape);
}

function closeModal(popupElement){
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape);
}

function handleEscape(evt) {
    if(evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened')
        closeModal(openedPopup)
    }
}

export {openModal,closeModal}