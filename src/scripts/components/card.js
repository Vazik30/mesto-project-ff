import {toggleLikeCard} from "../../index";
import {closeModal, openModal} from "./modal";
import {deleteCard} from "./api";

const card = document.querySelector('#card-template').content;
const cardImage = card.querySelector('.card__image');
const cardTitle = card.querySelector('.card__title');

function createCard (cardData, userId, handleImageClick, popupDeleteCard,deleteCard) {
    //добавление данных для карточки
    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    const cardElement = card.querySelector('.card').cloneNode(true);
    const elementCardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const  likeCounter = cardElement.querySelector('.likes-counter')

    const cardId = cardData._id;

    const isLiked = cardData.likes.some((like) => like._id === userId); // среди массива лайков ищем совпадение с лайком юзероа
    if (isLiked) { cardLikeButton.classList.add("card__like-button_is-active") } // добавляем класс
    likeCounter.textContent = cardData.likes.length; // меняем счетчик лайков

    likeCounter.textContent = cardData.likes.length

    if(cardData.owner._id !== userId){
        cardDeleteButton.remove()
    }

    //popup изображения при клике на картинку
    elementCardImage.addEventListener('click',()=>{handleImageClick(cardData)});
    //лайк карточки
    cardLikeButton.addEventListener('click',() => toggleLikeCard(cardId, cardLikeButton, likeCounter))
    //удаление карточки
    cardDeleteButton.addEventListener('click', () => {
        openModal(popupDeleteCard)
    });
    popupDeleteCard.querySelector('.popup__button-delete_card').addEventListener('click',()=>{deleteCard(cardData._id)
        .then(()=>{
            removeCard(cardData)
            closeModal(popupDeleteCard)
        })
    })
    return cardElement;
}
// Функция создания карточки
function removeCard(cardElement){
    cardElement.remove()
}


export {createCard}