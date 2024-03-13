import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {addCard, createCard, deleteCard, likeCard} from "./scripts/components/card";
import {openModal, closeModal} from "./scripts/components/modal";
//  Вывести карточки на страницу
initialCards.forEach(elem =>addCard(elem))

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
// const popupInputTypeName = popupEditProfile.querySelector('.popup__input_type_name');
// const popupInputTypeDescription = popupEditProfile.querySelector('.popup__input_type_description');
const formElementEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput =  document.querySelector('.popup__input_type_description');

profileEdit.addEventListener('click', (event)=>{
    openModal(popupEditProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

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

//функция изменения формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEditProfile)
}

formElementEditProfile.addEventListener('submit', handleFormSubmit);

//создание новой карточки
function creatNewCard(evt, modal){
    evt.preventDefault();
    const cardData = {
        name: popupInputTypeCardName.value,
        link: popupInputTypeUrl.value
    }
    const newCard = createCard(cardData, deleteCard, likeCard);
    cardsContainer.prepend(newCard);
    modal.reset();
    closeModal(modal)
}

formElementNewPlace.addEventListener('submit',(evt)=>{creatNewCard(evt, formElementNewPlace)})
