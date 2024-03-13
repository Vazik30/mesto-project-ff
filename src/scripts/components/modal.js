
function openModal(modal) {
    modal.classList.add('popup_is-opened');
    modal.querySelector('.popup__close').addEventListener('click', ()=>{
        closeModal(modal)
    });
    document.addEventListener('keydown',handleEscape);
}

function closeModal(popupElement){
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape);
    popupElement.querySelector('.popup__close').removeEventListener('click', ()=>{
        // closeModal(popupElement)
        popupElement.classList.remove('popup_is-opened');
    });
}

function handleEscape(evt) {
    if(evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened')
    closeModal(openedPopup)
    }
}

export {openModal,closeModal}