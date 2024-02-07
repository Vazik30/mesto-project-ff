// Темплейт карточки
const placesList = document.querySelector(('.places__list'));
const card = document.querySelector('#card-template').content;

// DOM узлы
function getCard (item, deleteCard) {
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    cardTitle.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    const cardElement = card.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(cardElement)
    })
    return cardElement;
}
// Функция создания карточки
function creatCard (name, link) {
    const item = {name, link}
    placesList.append(getCard(item, deleteCard))
}
// Функция удаления карточки
function deleteCard (item) {
    item.remove()
}
// @todo: Вывести карточки на страницу
initialCards.forEach(elem =>creatCard(elem.name, elem.link))