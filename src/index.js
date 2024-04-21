import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard, likeCard} from "./scripts/components/card";
import {openModal, closeModal} from "./scripts/components/modal";
import {enableValidation} from "./scripts/components/validation";
import {getUserInfo} from "./scripts/components/api";
//  Вывести карточки на страницу

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupTypeCard = document.querySelector('.popup_type_new-card');
const profileEdit = document.querySelector('.profile__edit-button');
const profileAddCard = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const formElementNewPlace = document.forms["new-place"];
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');
const cardsContainer = document.querySelector('.places__list');
const formElementEditProfile = document.forms["edit-profile"];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput =  document.querySelector('.popup__input_type_description');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');
const popups = document.querySelectorAll('.popup');
let userId = null;

const config = {
    formSelector: 'popup__form',
    inputSelector: 'popup__input',
    submitButtonSelector: 'popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

console.log(getUserInfo())

enableValidation(config);

function addCard (cardData) {
    cardsContainer.append(createCard(cardData, deleteCard, likeCard, handleImageClick))
}

initialCards.forEach(elem =>addCard(elem))

function handleImageClick(cardData) {
    popupCaption.textContent = cardData.name;
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    openModal(popupTypeImage)
}

profileEdit.addEventListener('click', (event)=>{
    openModal(popupEditProfile);
    getUserInfo().then((userData)=>{
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
    })
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    // profileImage.style.backgroundImage = ('url(' + userData.avatar + ')');
});

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            closeModal(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closeModal(popup)
        }
    })
})

profileAddCard.addEventListener('click',()=>{
    openModal(popupTypeCard)
});

//функция изменения формы
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEditProfile)
}

formElementEditProfile.addEventListener('submit', handleProfileFormSubmit);

//создание новой карточки
function creatNewCard(evt, modal){
    evt.preventDefault();
    enableValidation(config);
    const cardData = {
        name: popupInputTypeCardName.value,
        link: popupInputTypeUrl.value
    }
    const newCard = createCard(cardData, deleteCard, likeCard, handleImageClick);
    cardsContainer.prepend(newCard);
    formElementNewPlace.reset();
    closeModal(modal)
}

formElementNewPlace.addEventListener('submit',(evt)=>{creatNewCard(evt, popupTypeCard)})
