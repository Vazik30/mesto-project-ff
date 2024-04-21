
// Темплейт карточки
const card = document.querySelector('#card-template').content;
const cardImage = card.querySelector('.card__image');
const cardTitle = card.querySelector('.card__title');


// DOM узлы
function createCard (cardData, deleteCard, likeCard, handleImageClick) {
    //добавление данных для карточки
    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    const cardElement = card.querySelector('.card').cloneNode(true);
    const elementCardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardId = cardData['_id']

    //popup изображения при клике на картинку
    elementCardImage.addEventListener('click',()=>{handleImageClick(cardData)});
    //лайк карточки
    // if (cardData.owner['_id'] === userId){
    cardLikeButton.addEventListener('click',likeCard)
    // } else {
    //     cardDeleteButton.remove();

    //удаление карточки
    cardDeleteButton.addEventListener('click', () => {
        deleteCard(cardElement)
    });
    return cardElement;
}
// Функция создания карточки

function likeCard(button) {
    button.target.classList.toggle('card__like-button_is-active')
}

function deleteCard (cardElement) {
    cardElement.remove()
}

export {createCard, deleteCard, likeCard}