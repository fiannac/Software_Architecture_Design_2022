export default class messaggio{
    constructor(testo, timestamp, type){
        this.text = testo;
        this.timestamp = timestamp;
        this.type = type;
    }

    getText(){
        return this.text;
    }

    getTimestamp(){
        return this.timestamp;
    }
   
    getSender(){
        return this.type;
    }
}