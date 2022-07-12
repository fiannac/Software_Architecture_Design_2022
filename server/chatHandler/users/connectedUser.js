export default class connectedUser{
    constructor(id, ws){
        this.id = id;
        this.ws = ws
    }

    send(text, idMittente, timestamp, keyD){
        console.log("send to " + this.id)
        if(this.ws == null){
            return false;
        }
        this.ws.send(JSON.stringify({
            "idMittente": idMittente,
            "text": text,
            "timestamp": timestamp,
            "keyD": keyD,
            "type": "msg"
        }));
    }
}