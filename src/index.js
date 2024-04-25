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
const popupSaveButton = document.querySelector('.popup__button');
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
const buttonSavingUserAvatar = popupTypeUpdateYourAvatar.querySelector('.popup__button');
const userAvatar = popupTypeUpdateYourAvatar.querySelector('.popup__input_type_url-avatar');
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
        profileImage.style.backgroundImage = userData.avatar;
        cards.forEach((data) =>{
            const cardElement = createCard(data,userId, handleImageClick, popupDeleteCard, deleteCard)
            cardsContainer.prepend(cardElement)
        });
    })
    .catch(err => console.log(err));

enableValidation(config);
disableValidation(formElementEditProfile, config)

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
    const valueNameInput = nameInput.value;
    const valueJobInput = jobInput.value;
    loadingDataSaving(buttonEditProfile, true)
    sendUserProfile(valueNameInput,valueJobInput).then(res=>{
        profileTitle.textContent = nameInput.value;
        profileDescription.textContent = jobInput.value;
        closeModal(popupEditProfile)
        disableValidation(formElementEditProfile,enableValidation)
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
    console.log(cardUrl)
    loadingDataSaving(buttonAddCard,true);
    sendNewCardServer(cardName,cardUrl)
        .then((cardData)=>{
        const cardsData ={
            name: cardName,
            link: cardUrl,
            alt: cardName,
            _id: cardData._id,
            owner: {_id: cardData.owner._id}
        }
        const cardElement = createCard(cardsData, userId, handleImageClick, popupDeleteCard, deleteCard)
        cardsContainer.prepend(cardElement);
        formElementNewPlace.reset();
        loadingDataSaving(buttonAddCard,false);
        closeModal(modal);
        disableValidation(formElementEditProfile,config)
    })
        .catch(err=>console.log(err))

}

formElementNewPlace.addEventListener('submit',(evt)=>{creatNewCard(evt, popupTypeCard)})

export function toggleLikeCard (cardId,likeCardElement, likeCounter) {
    const cardLike = likeCardElement.classList.contains('card__like-button_is-active');

    if (cardLike){
        deleteLike(cardId).then(res => {
            likeCardElement.classList.remove('card__like-button_is-active');
            likeCounter.textContent = res.likes.length;
        })
    } else {
        addLike(cardId).then((res)=>{

            likeCardElement.classList.add('card__like-button_is-active');

            likeCounter.textContent = res.likes.length;
        })
            .catch(err => console.log(err))
    }
}

function updateAvatar() {
    const linkAvatar = userAvatar.value;

    loadingDataSaving(buttonSavingUserAvatar, true);

    changeAvatar(linkAvatar).then((res) => {
        profileImage.style.backgroundImage = ('url(' + res.avatar + ')');
        userAvatar.value = '';
        closeModal(popupTypeUpdateYourAvatar);
    })
        .catch((error) => console.log(error))
        .finally(() => loadingDataSaving(buttonSavingUserAvatar, false))
}

profileImage.addEventListener('click', () => openModal(popupTypeUpdateYourAvatar));

// Закрытие модального окна с изменением картинки профиля
buttonSavingUserAvatar.addEventListener('click', updateAvatar);
