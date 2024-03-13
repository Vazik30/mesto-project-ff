import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {addCard, createCard, deleteCard, likeCard} from "./scripts/components/card";
import {openModal, closeModal} from "./scripts/components/modal";
//  Вывести карточки на страницу
initialCards.forEach(elem =>addCard(elem))

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupTypeCard = document.querySelector('.popup_type_new-card');
const profileEdit = document.querySelector('.profile__edit-button');
const profileAddCard = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElementNewPlace = document.forms["new-place"];
const popup = document.querySelector('.popup');
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');
const cardsContainer = document.querySelector('.places__list');
// const formElementEditProfile = document.forms["edit-profile"];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput =  document.querySelector('.popup__input_type_description');
const popupTypeImage = document.querySelector('.popup_type_image');

profileEdit.addEventListener('click', (event)=>{
    openModal(popupEditProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});


// popups.forEach((popup) => {
//     popup.addEventListener('mousedown', (evt) => {
//         if (evt.classList.target.contains('popup_is-opened')) {
//             closeModal(popup)
//         }
//         if (evt.classList.target.contains('popup__close')) {
//             closeModal(popup)
//         }
//     })
// })

popup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
        closeModal(popup)
    }
});

profileAddCard.addEventListener('click',()=>{
    openModal(popupTypeCard)
});

popupTypeCard.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
        closeModal(popupTypeCard)
    }
});

popupTypeImage.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
        closeModal(popupTypeImage)
    }
});

//функция изменения формы
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEditProfile)
}

popupEditProfile.addEventListener('submit', handleProfileFormSubmit);

//создание новой карточки
function creatNewCard(evt, modal){
    evt.preventDefault();
    const cardData = {
        name: popupInputTypeCardName.value,
        link: popupInputTypeUrl.value
    }
    const newCard = createCard(cardData, deleteCard, likeCard);
    cardsContainer.prepend(newCard);
    formElementNewPlace.reset();
    closeModal(modal)
}

popupTypeCard.addEventListener('submit',(evt)=>{creatNewCard(evt, popupTypeCard)})
