
function openModal(modal, closeModal,closeBtnModal) {
    modal.classList.add('popup_is-opened');
    modal.querySelector('.popup__close').addEventListener('click', ()=>{
        closeModal(modal)
    })
    window.addEventListener('keydown',(evt)=> {
        closeBtnModal(evt, modal)
    })
}

function closeModal(popupElement){
    popupElement.classList.remove('popup_is-opened')
}

function closeBtnModal(evt, popupElement) {
    if(evt.key === "Escape") {
        popupElement.classList.remove('popup_is-opened')
    }
}

export {openModal,closeModal ,closeBtnModal}