import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {addCard, creatNewCard} from "./scripts/components/card";
import {openModal, closeModal, closeBtnModal} from "./scripts/components/modal";
import {deleteCard} from "./scripts/components/deletCard";
import {likeCard} from "./scripts/components/like";
//  Вывести карточки на страницу
initialCards.forEach(elem =>addCard(elem))

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupTypeCard = document.querySelector('.popup_type_new-card');
const profileEdit = document.querySelector('.profile__edit-button');
const profileAddCard = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElementNewPlace = document.querySelector('.popup__form[name="new-place"]');


profileEdit.addEventListener('click', (event)=>{
    openModal(popupEditProfile, closeModal, closeBtnModal);
    popupEditProfile.querySelector('.popup__input_type_name').value = profileTitle.textContent;
    popupEditProfile.querySelector('.popup__input_type_description').value = profileDescription.textContent;
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

const formElementEdidProfile = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput =  document.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()

//функция изменения формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEditProfile)
}

formElementEdidProfile.addEventListener('submit', handleFormSubmit);

formElementNewPlace.addEventListener('submit',(evt)=>{creatNewCard(evt, formElementNewPlace)})
