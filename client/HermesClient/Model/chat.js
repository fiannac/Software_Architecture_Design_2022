import messaggio from './messaggio.js'

export default class Chat{
    constructor(id, timestamp, user){
        this.id = id;
        this.time = timestamp;
        this.msgs = new Array();
        this.user = user;
    }

    //funzione di add di un nuovo messaggio 
    addMessage(testo, timestamp, type){
        const msg = new messaggio(testo, timestamp, type)
        this.msgs.push(msg)
    }

    getPubk(){
        return this.user.pk;
    }
    getUserName(){
        return this.user.userName;
    }
    getMessages(){
        return this.msgs;
    }
}    
