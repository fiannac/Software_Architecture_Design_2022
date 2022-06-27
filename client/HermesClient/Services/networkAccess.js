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
            this.controller.rcvMsg(msg.text, msg.dest, msg.timestamp)
        }
    }

    

    authWSRequest(id, token){
        const jmsg = JSON.stringify({type: 'authWS', id: id, token: token});
        this.ws.send(jmsg);
    }

    async msgRequest(id, destId, token, msgText){
        const response = await fetch('http://localhost:8888/msg', 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                idDest: destId,
                token: token,
                msgText: msgText
            })
        }).then((respone) => respone.json()).then(json => json.ok)
        return response;
    }

    async rcvOldMsgReq(id, token){
        const response = await fetch('http://localhost:8888/storedmsg', 
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
        }).then((respone) => respone.json())
        return response;
    }

    async registerRequest(user, email, psw, pubk, prvk){
        return await fetch('http://localhost:8888/register', 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usr: user,
                mail: email,
                psw: psw,
                pubk:pubk,
                prvk:prvk
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
                usr: usr,
                psw: psw
            })
        }).then((res) => res.json()).then((res) => {return res})

        if(response.ok == true){
            const ok = true;
            const token = response.token;
            const id = response.id;
            return {ok, token, id};
        } else {
            console.log(response.ok)
            const ok = false;
            const token = "";
            const id = "";
            return {ok, token, id};
        }

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
                usr: destUsr,
                id: id,
                token: token
            })
        }).then((respone) => respone.json())
    }

}