import {checkResponse} from "../../utils/checkResponse";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
    headers: {
        authorization: 'f4a40ea5-6a81-4724-87f7-1839e7889f75',
        'Content-Type': 'application/json',
    },
};


function getUserInfo(){
    return fetch(`${config.baseUrl}/users/me`,{
        method: 'GET',
        headers:config.headers
    })
        .then(checkResponse)

}

function getCardList() {
    return fetch(`${config.baseUrl}/cards`,
        {method:'GET',
            headers:config.headers
        })
        .then(checkResponse)
}

function sendUserProfile(name, link) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers:config.headers,
        body: JSON.stringify({
            name:name,
            about: link
        })
    })
        .then(checkResponse)
}

function sendNewCardServer(cardName,cardUrl){
    return fetch(`${config.baseUrl}/cards`,{
        method: 'POST',
        headers:config.headers,
            body: JSON.stringify({
                name:cardName,
                link:cardUrl,
            })
        })
        .then(checkResponse)
}

function addLike(cardId, likeCountElement, likeButtonElement) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
        method:'PUT',
        headers:config.headers
    })
        .then(checkResponse)
}

function deleteLike(cardId, likeCountElement, likeButtonElement) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
        method:'DELETE',
        headers:config.headers
    })
        .then(checkResponse)
}

function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method:'DELETE',
        headers:config.headers
    })
        .then(checkResponse)
}

function changeAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`,{
        method:'PATCH',
        headers:config.headers,
        body: JSON.stringify({
            avatar: avatar
            }

        )
    })
        .then(checkResponse)
}


export {getUserInfo, getCardList, sendUserProfile, sendNewCardServer, addLike, deleteLike, deleteCard, changeAvatar}