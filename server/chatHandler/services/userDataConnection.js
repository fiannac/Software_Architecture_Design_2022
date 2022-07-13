import fetch from 'node-fetch';
import FormData from 'form-data';
const userServerIp = 'localhost';
const userServerPort = '8891' 

export default class UserDataConnection {
    async storeDataRequest(userName, puk, id){
        var response = await fetch(`http://${userServerIp}:${userServerPort}/storeData`,
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                puk: puk,
                id: id
            })
        })
        response = await response.json()
        return response;
    }
    async userDataRequest(userName){
        var response = await fetch(`http://${userServerIp}:${userServerPort}/userData`,
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName
            })
        })
        response = await response.json()
        return response;
    }
    async userDataIdRequest(id){
        var response = await fetch(`http://${userServerIp}:${userServerPort}/userDataById`,
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        response = await response.json()
        return response;
    }

    async setAvatar(id, img){
        let form = new FormData();
        console.log("IMG:",img)
        form.append('file', img.buffer, img.originalname);
        try{
        let res = await fetch(`http://${userServerIp}:${userServerPort}/upload/` + id, {mode: 'cors',method: "POST", body: form});
        }catch(e){
            return {ok:false}
        }
        return {ok:true}
    }
}