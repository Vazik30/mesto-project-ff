
function openModal(modal, closeModal, closeBtnModal) {
    modal.classList.add('popup_is-opened','popup_is-animated');
    modal.querySelector('.popup__close').addEventListener('click', ()=>{
        closeModal(modal)
    })
    document.addEventListener('keydown',closeBtnModal)
}

function closeModal(popupElement){
    popupElement.classList.remove('popup_is-opened')
}

function closeBtnModal(evt) {
    if(evt.key === 'Escape') {
        const popup = document.querySelector('.popup');
        closeModal(popup)
    }
}

export {openModal,closeModal}