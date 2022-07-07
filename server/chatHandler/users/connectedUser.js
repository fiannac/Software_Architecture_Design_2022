export default class connectedUser{
    constructor(id, token, ws = null){
        this.id = id;
        this.token = token;
        this.ws = ws
    }

    send(text, idMittente, timestamp, keyD){
        this.ws.send(JSON.stringify({
            "idMittente": idMittente,
            "text": text,
            "timestamp": timestamp,
            "keyM": keyM,
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