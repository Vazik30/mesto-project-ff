import {openModal, closeModal, closeBtnModal} from "./modal";

// Темплейт карточки
const cardsContainer = document.querySelector('.places__list');
const card = document.querySelector('#card-template').content;

// DOM узлы
function createCard (cardData, deleteCard) {
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const popupTypeImage = document.querySelector('.popup_type_image');
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

    //удаление карточки
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(cardElement)
    });
    return cardElement;
}
// Функция создания карточки
function addCard (cardData) {
    cardsContainer.append(createCard(cardData, deleteCard))
}
// Функция удаления карточки
function deleteCard (cardElement) {
    cardElement.remove()
}

export {createCard,deleteCard,addCard}