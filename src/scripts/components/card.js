import {openModal, closeModal, closeBtnModal} from "./modal";
import {likeCard} from "./like";
import {deleteCard} from "./deletCard";

// Темплейт карточки
const cardsContainer = document.querySelector('.places__list');
const card = document.querySelector('#card-template').content;

// DOM узлы
function createCard (cardData, deleteCard, likeCard) {
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const popupTypeImage = document.querySelector('.popup_type_image');
    const cardLikeButton = card.querySelector('.card__like-button')
    //добавление данных для карточки
    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    const cardElement = card.querySelector('.card').cloneNode(true);
    //popup изображения при клике на картинку
    cardElement.querySelector('.card__image').addEventListener('click',()=>{
        //добавление данных для popup
        document.querySelector('.popup__caption').textContent = cardData.name;
        document.querySelector('.popup__image').src = cardData.link;
        document.querySelector('.popup__image').alt = cardData.name;
        openModal(popupTypeImage,closeModal, closeBtnModal)
    });
    //закртые модального окна через overlay
    popupTypeImage.addEventListener("click", (evt) => {
        if (evt.currentTarget === evt.target) {
            closeModal(popupTypeImage)
        }
    });

    cardElement.querySelector('.card__like-button').addEventListener('click',likeCard)

    //удаление карточки
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(cardElement)
    });
    return cardElement;
}
// Функция создания карточки
function addCard (cardData) {
    cardsContainer.append(createCard(cardData, deleteCard, likeCard))
}

const formElementNewPlace = document.querySelector('.popup__form[name="new-place"]');
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url')

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

export {addCard, creatNewCard}