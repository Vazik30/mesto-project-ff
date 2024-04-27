import './pages/index.css';
import {createCard} from "./scripts/components/card";
import {openModal, closeModal} from "./scripts/components/modal";
import {enableValidation, disableValidation} from "./scripts/components/validation";
import {getUserInfo, getCardList,sendUserProfile,sendNewCardServer,addLike,deleteLike, deleteCard, changeAvatar} from "./scripts/components/api";
//  Вывести карточки на страницу

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupTypeCard = document.querySelector('.popup_type_new-card');
const profileEdit = document.querySelector('.profile__edit-button');
const profileAddCard = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const buttonEditProfile = document.querySelector('.popup__button-edit-profile')
const formElementNewPlace = document.forms["new-place"];
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');
const cardsContainer = document.querySelector('.places__list');
const buttonAddCard = document.querySelector('.popup__button-add-card');
const formElementEditProfile = document.forms["edit-profile"];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput =  document.querySelector('.popup__input_type_description');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');
const popupDeleteCard = document.querySelector('.popup_delete_card');
const popups = document.querySelectorAll('.popup');
const popupTypeUpdateYourAvatar = document.querySelector('.popup_type_update_user_avatar');
const avatarLink = popupTypeUpdateYourAvatar.querySelector('.popup__input_type_url-avatar');
let userId = null;

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

Promise.all([getCardList(),getUserInfo()])
    .then(([cards, userData]) =>{
        userId = userData._id;
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = (`url(${userData.avatar})`);
        cards.forEach((data) =>{
            const cardElement = createCard(data,userId, handleImageClick,toggleLikeCard, openDeleteModalCard)
            cardsContainer.prepend(cardElement)
        });
    })
    .catch(err => console.log(err));

enableValidation(config);
disableValidation(popupEditProfile, config)

function handleImageClick(cardData) {
    popupCaption.textContent = cardData.name;
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    openModal(popupTypeImage)
}

profileEdit.addEventListener('click', (event)=>{
    openModal(popupEditProfile);
    disableValidation(popupEditProfile, config)
    getUserInfo().then((userData)=>{
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
    })
        .catch(err=>console.log(err))
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
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
    formElementNewPlace.reset()
    disableValidation(popupTypeCard,config)
});

//функция изменения формы
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const valueNameInput = nameInput.value;
    const valueJobInput = jobInput.value;
    loadingDataSaving(buttonEditProfile, true)
    sendUserProfile(valueNameInput,valueJobInput).then(res=>{
        profileTitle.textContent = res.name;
        profileDescription.textContent = res.about;
        closeModal(popupEditProfile)
        disableValidation(formElementEditProfile,config)
        }
    )
        .catch(err=> {console.log(err)})
        .finally(()=>loadingDataSaving(buttonEditProfile,false))

}

const loadingDataSaving = (button, loading) => {
    if (loading) {
        button.textContent = 'Сохранение...';
    } else {
        button.textContent = 'Сохранить';
    }
};

formElementEditProfile.addEventListener('submit', handleProfileFormSubmit);

//создание новой карточки
function creatNewCard(evt, modal){
    evt.preventDefault();
    enableValidation(config);
    const cardName = popupInputTypeCardName.value;
    const cardUrl = popupInputTypeUrl.value;
    loadingDataSaving(buttonAddCard,true);
    sendNewCardServer(cardName,cardUrl)
        .then((cardData)=>{
        const cardsData ={
            name: cardName,
            link: cardUrl,
            alt: cardName,
            _id: cardData._id,
            likes: [],
            owner: {_id: cardData.owner._id}
        }
        const cardElement = createCard(cardsData, userId, handleImageClick,toggleLikeCard, openDeleteModalCard)
        cardsContainer.prepend(cardElement);
        formElementNewPlace.reset();
        closeModal(modal);
        disableValidation(formElementEditProfile,config)
    })
        .catch(err=>console.log(err))
        .finally(()=>loadingDataSaving(buttonAddCard,false))

}

formElementNewPlace.addEventListener('submit',(evt)=>{
    creatNewCard(evt, popupTypeCard)
})

export function toggleLikeCard (cardId,likeCardElement, likeCounter) {
    const cardLike = likeCardElement.classList.contains('card__like-button_is-active');

    if (cardLike){
        deleteLike(cardId).then(res => {
            likeCardElement.classList.remove('card__like-button_is-active');
            likeCounter.textContent = res.likes.length;
        })
            .catch(err=> console.log(err))
    } else {
        addLike(cardId).then((res)=>{

            likeCardElement.classList.add('card__like-button_is-active');

            likeCounter.textContent = res.likes.length;
        })
            .catch(err => console.log(err))
    }
}

function openAvatarModal () {
    openModal(popupTypeUpdateYourAvatar);
    avatarLink.value ='';
    // popupTypeUpdateYourAvatar.reset();
    disableValidation(popupTypeUpdateYourAvatar,config)
}

function userAvatar (userData) {
    getUserInfo(userData)
        .then((userInfo)=>{
            profileImage.style.backgroundImage = (`url(${userInfo.avatar})`);
        })
        .catch(err => console.log(err))
}

function saveFormTypeAvatar (event) {
    event.preventDefault();
    const link = avatarLink.value;

    loadingDataSaving(popupTypeUpdateYourAvatar,true);

    changeAvatar(link)
        .then((userData)=> {
            userAvatar(userData);
            closeModal(popupTypeUpdateYourAvatar)
        })
        .catch(err => console.log(err))
        .finally(()=>{
            // popupTypeUpdateYourAvatar.reset();
            loadingDataSaving(popupTypeUpdateYourAvatar,false);
        })
}

profileImage.addEventListener('click', openAvatarModal);

popupTypeUpdateYourAvatar.addEventListener('submit', saveFormTypeAvatar)

// Карточка которую хотим удалить
let card = {};

// Открытие модального окна с карточкой
export const openDeleteModalCard = ({ cardId, cardElement }) => {
    card.cardId = cardId;
    card.cardElement = cardElement;
    openModal(popupDeleteCard);
}

popupDeleteCard.addEventListener('click', ()=>{
    deleteCard(card.cardId).then(()=>{
        card.cardElement.remove();
        closeModal(popupDeleteCard);
        card = {cardElement:null, cardId:null};
    })
})

export const deleteMyCard = (cardId) => {
    deleteCard(cardId);
    document.getElementById(cardId).remove()
}