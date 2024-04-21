function getUserInfo(){
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-11/users/me',{
        method: 'GET',
        headers:{
            authorization: 'f4a40ea5-6a81-4724-87f7-1839e7889f75'
        }
    })
        .then(res => res.json())
}

function getCardList() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-11/cards',
        {method:'GET',
            headers:{
            authorization: 'f4a40ea5-6a81-4724-87f7-1839e7889f75'
            }
        })
        .then(res => res.json())
}

function sendUserProfile() {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-11/users/me', {
        method: 'PATCH',
        headers:{
            authorization: 'f4a40ea5-6a81-4724-87f7-1839e7889f75',
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json())
}

function sendNewCardServer(cardName,cardUrl){
    return fetch('https://nomoreparties.co/v1/wff-cohort-11/cards',{
        method: 'POST',
        headers:{
            authorization: 'f4a40ea5-6a81-4724-87f7-1839e7889f75',
            'Content-Type': 'application/json',
            body:{
                name:cardName,
                link:cardUrl,
            }
        }
    }).then(res=>res.json())
}

export {getUserInfo,getCardList,sendUserProfile,sendNewCardServer}