import fetch from 'node-fetch';

const userServerIp = '192.168.1.7'
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
}

