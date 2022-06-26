import {messaggio} from './messaggio.js'

export default class Chat{
    constructor(id, timestamp, user){
        this.id = id;
        this.time = timestamp;
        this.msgs = new Array();
        this.user = user;
    }

    addMessage(testo, timestamp, type){
        const msg = new messaggio(testo, timestamp, type)
        this.msgs.push(msg)
    }
}    
