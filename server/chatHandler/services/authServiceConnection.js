import fetch from 'node-fetch';

const authServerIp = '192.168.1.7'
const authServerPort = '8889' 


export default class AuthServiceConnection{
    async registerRequest(userName, password, email, puk, prk){
        var response = await fetch(`http://${authServerIp}:${authServerPort}/register`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                password: password,
                email: email,
                puk: puk,
                prk: prk
            })
        })
        response = await response.json()
        console.log("response: ", response)
        return response;
    }
    async loginRequest(userName, password){
        var response = await fetch(`http://${authServerIp}:${authServerPort}/login`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                password: password
            })
        })
        response = await response.json()
        console.log("response: ", response.body)
        return response;
    }
    async logoutRequest(token, id){
        var response = await fetch(`http://${authServerIp}:${authServerPort}/logout`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                id: id
            })
        })
        response = await response.json()
        return response;
    }
    async checkToken(token, id){
        var response = await fetch(`http://${authServerIp}:${authServerPort}/checkToken`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                id: id
            })
        })
        response = await response.json()
        return response;s
    }
}


