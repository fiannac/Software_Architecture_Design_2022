export const serverIp = '109.116.253.181'
export const serverPort = '8888'

export default class NetworkAccess {
    constructor(controller, ws = `ws://${serverIp}:${serverPort}/`) {
        this.ws = this.createWS(ws,controller)
        this.controller = controller
        this.createWS = this.createWS.bind(this)
    }
    
    createWS(wsAddress,controller){
        if(this.ws != null){
            this.ws.close()
        }
        ws = new WebSocket(wsAddress);
        ws.controller = controller
        ws.onopen = this.WSopen; 
        ws.onclose = this.WSclose;
        ws.onmessage = this.WSmsg;
        return ws;
    }

    reconnect(){
        this.ws = this.createWS(`ws://${serverIp}:${serverPort}/`, this.controller)
        this.controller.rememberMeLogin()
    }

    disconnect(){
        this.ws.close();
    }

    WSopen(){
        this.controller.updateConnectionState(true)
    }

    WSclose(){
        this.controller.updateConnectionState(false)
    }

    WSmsg(event){
        const msg = JSON.parse(event.data);
        if(msg?.type == 'auth' && msg?.ok == true){
            this.controller.updateLoggedState(true)
        } else if(msg?.type == 'msg'){
            this.controller.rcvMsg(msg.text, msg.keyD, msg.idMittente, msg.timestamp)
        }
    }

    authWSRequest(id, token){
        const jmsg = JSON.stringify({type: 'authWS', id: id, token: token});
        this.ws.send(jmsg);
        console.log("Richiesta di auth")
    }

    async msgRequest(idMittente, idDestinatario, token, text, keyM, keyD, timestamp){
        var response = await fetch(`http://${serverIp}:${serverPort}/msg`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idMittente: idMittente,
                idDestinatario: idDestinatario,
                token: token,
                text: text,
                keyM: keyM,
                keyD: keyD,
                timestamp: timestamp
            })
        }).then((respone) => respone.json()).then(json => json.ok)
        return response;
    }

    async rcvOldMsgReq(idDestinatario, token, timestamp){
        var response = await fetch(`http://${serverIp}:${serverPort}/storedmsg`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idDestinatario: idDestinatario,
                token: token,
                timestamp: timestamp
            })
        }).then((response) => response.json())
        return response;
    }

    async registerRequest(user, email, psw, puk, prk){
        var response= await fetch(`http://${serverIp}:${serverPort}/register`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: user,
                email: email,
                password: psw,
                puk:puk,
                prk:prk
            })
        })
        response = await response.json()
        return response.ok
    }   

    async loginRequest(usr, psw, notifyToken){
        var response = await fetch(`http://${serverIp}:${serverPort}/login`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: usr,
                password: psw, 
                notifyToken: notifyToken
            })
        }).then((res) => res.json())
        if(response.ok == true){
            const ok = true;
            const token = response.token;
            const id = response.id;
            const prk = response.prk;
            const puk = response.puk;
            return {ok, token, id, prk, puk};
        } else {
            const ok = false;
            const token = "";
            const id = "";
            return {ok, token, id};
        }

    }

    async logoutRequest(id, token){
        var response = await fetch(`http://${serverIp}:${serverPort}/logout`,
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                token: token
            })
        }).then((res) => res.json()).then((res) => {return res})
        return response.ok;
    }

    async userDataRequest(destUsr, id, token){
        var response = await fetch(`http://${serverIp}:${serverPort}/userdata`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userNameDest: destUsr,
                id: id,
                token: token
            })
        })
        response = await response.json()
        return response;
    }

    async userDataFromIdRequest(idMittente, id, token){
        var response = await fetch(`http://${serverIp}:${serverPort}/userdataId`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idRichiesto: idMittente,
                id: id,
                token: token
            })
        })
        response = await response.json()
        return response;
    }

    async blockUser(id, token, idBlocked){
        var response = await fetch(`http://${serverIp}:${serverPort}/blockUser`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                token: token,
                idBlocked: idBlocked
            })
        }).then((res) => res.json())
        return response.ok;
    }
}