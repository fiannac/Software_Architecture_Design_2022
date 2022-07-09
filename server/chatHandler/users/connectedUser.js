export default class connectedUser{
    constructor(id, token, ws = null){
        this.id = id;
        this.token = token;
        this.ws = ws
    }

    send(text, idMittente, timestamp, keyD){
        console.log("send to " + this.id)
        this.ws.send(JSON.stringify({
            "idMittente": idMittente,
            "text": text,
            "timestamp": timestamp,
            "keyD": keyD,
            "type": "msg"
        }));
    }

    getToken(){
        return this.token;
    }

    setWs(ws){
        this.ws = ws
    }
}