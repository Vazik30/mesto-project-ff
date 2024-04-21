export function getUserInfo(){
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-11/users/me',{
        method: 'GET',
        headers:{
            authorization: 'f4a40ea5-6a81-4724-87f7-1839e7889f75'
        }
    })
        .then(res => res.json())
        // .then((result) => {
        //     const resJSON = JSON.stringify(result);
        //     console.log(resJSON);
        // });
}