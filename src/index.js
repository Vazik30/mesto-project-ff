import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {addCard} from "./scripts/components/card";
import {openModal, closeModal, closeBtnModal} from "./scripts/components/modal";
//  Вывести карточки на страницу
initialCards.forEach(elem =>addCard(elem))

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupTypeCard = document.querySelector('.popup_type_new-card');
const profileEdit = document.querySelector('.profile__edit-button');
const profileAddCard = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

profileEdit.addEventListener('click', (event)=>{
    openModal(popupEditProfile, closeModal, closeBtnModal);
    popupEditProfile.querySelector('.popup__input_type_name').textContent = profileTitle.value;
    popupEditProfile.querySelector('.popup__input_type_description').textContent = profileDescription.value;
});

popupEditProfile.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
        closeModal(popupEditProfile)
    }
});

profileAddCard.addEventListener('click',()=>{
    openModal(popupTypeCard,closeModal, closeBtnModal)
});

popupTypeCard.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
        closeModal(popupTypeCard)
    }
});
