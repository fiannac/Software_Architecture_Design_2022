import { setConnState, setLoggedState } from "../App.js";

export default class NetworkAccess {
    constructor(controller, ws = 'ws://localhost:8888/') {
        this.ws = this.createWS(ws,controller)
        this.controller = controller

    }
    
    createWS(ws,controller){
        ws = new WebSocket(ws);
        ws.controller = controller
        ws.onopen = this.WSopen; 
        ws.onclose = this.WSclose;
        ws.onmessage = this.WSmsg;
        return ws;
    }

    WSopen(){
        setConnState(true) //da cambiare
    }

    WSclose(){
        setConnState(false)
    }

    WSmsg(event){
        const msg = JSON.parse(event.data);
        if(msg?.type == 'auth' && msg?.ok == true){
            setLoggedState(true)
        } else if(msg?.type == 'msg'){
            console.log(msg)
            this.controller.rcvMsg(msg.text, msg.idMittente, msg.timestamp)
        }
    }

    authWSRequest(id, token){
        const jmsg = JSON.stringify({type: 'authWS', id: id, token: token});
        this.ws.send(jmsg);
    }

    async msgRequest(idMittente, idDestinatario, token, text){
        const response = await fetch('http://localhost:8888/msg', 
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
                text: text
            })
        }).then((respone) => respone.json()).then(json => json.ok)
        return response;
    }

    async rcvOldMsgReq(idDestinatario, token){
        const response = await fetch('http://localhost:8888/storedmsg', 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idDestinatario: idDestinatario,
                token: token
            })
        }).then((respone) => respone.json())
        return response;
    }

    async registerRequest(user, email, psw, puk, prk){
        return await fetch('http://localhost:8888/register', 
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
        }).then((respone) => respone.json()).then(json => json.ok)
    }

    async loginRequest(usr, psw){
        const response = await fetch('http://localhost:8888/login', 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: usr,
                password: psw
            })
        }).then((res) => res.json()).then((res) => {return res})

        if(response.ok == true){
            const ok = true;
            const token = response.token;
            const id = response.id;
            const prk = response.prk;
            return {ok, token, id, prk};
        } else {
            console.log(response.ok)
            const ok = false;
            const token = "";
            const id = "";
            return {ok, token, id};
        }

    }

    async logoutRequest(id, token){
        const response = await fetch('http://localhost:8888/logout',
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
        return await fetch('http://localhost:8888/userdata', 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userNameDest: destUsr,
                idMittente: id,
                token: token
            })
        }).then((respone) => respone.json())
    }

    async userDataFromIdRequest(idMittente, id, token){
        return await fetch('http://localhost:8888/userdataId', 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idRichiesto: idMittente,
                idMittente: id,
                token: token
            })
        }).then((respone) => respone.json())
    }

}