import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {addCard,createCard,deleteCard} from "./scripts/components/card";
import {openModal, closeModal} from "./scripts/components/modal";
//  Вывести карточки на страницу
initialCards.forEach(elem =>addCard(elem))

const popupEdit = document.querySelector('.popup_type_edit');
const popupCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const cardImage = document.querySelector('.popup__image');
const profileEdit = document.querySelector('.profile__edit-button');
const profileAdd = document.querySelector('.profile__add-button');

profileEdit.addEventListener('click', ()=>{
    openModal(popupEdit, closeModal)
})

profileAdd.addEventListener('click',()=>{
    openModal(popupCard,closeModal)
})

cardImage.addEventListener('click',()=>{
    openModal(popupImage,closeModal)
})
