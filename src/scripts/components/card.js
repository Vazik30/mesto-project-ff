import {openModal, closeModal} from "./modal";

// Темплейт карточки
const cardsContainer = document.querySelector('.places__list');
const card = document.querySelector('#card-template').content;
const cardImage = card.querySelector('.card__image');
const cardTitle = card.querySelector('.card__title');
const popupTypeImage = document.querySelector('.popup_type_image');
// const cardLikeButton = card.querySelector('.card__like-button');
// const cardDeleteButton = card.querySelector('.card__delete-button')
const popupCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');

// DOM узлы
function createCard (cardData, deleteCard, likeCard) {
    //добавление данных для карточки
    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    //popup изображения при клике на картинку
    const cardElement = card.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').addEventListener('click',()=>{handleImageClick(cardData)});
    //закртые модального окна через overlay
    popupTypeImage.addEventListener("click", (evt) => {
        if (evt.currentTarget === evt.target) {
            closeModal(popupTypeImage)
        }
    });
    //лайк карточки
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

function handleImageClick(cardData) {
    popupCaption.textContent = cardData.name;
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    openModal(popupTypeImage)
}

function likeCard(button) {
    button.target.classList.toggle('card__like-button_is-active')
}

function deleteCard (cardElement) {
    cardElement.remove()
}

export {addCard, createCard, deleteCard, likeCard}