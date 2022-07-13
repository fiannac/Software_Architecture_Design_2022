import messaggio from './messaggio.js'

export default class Chat{
    constructor(id, user){
        this.id = id;
        this.msgs = new Array();
        this.user = user;
    }

    setTimestamp(timestamp){
        let time = new Date(timestamp);
        if(this.time==null || this.time==undefined){
            this.time = time;
        }else{
            if(time.getTime()>this.time.getTime()){
                this.time = time;
            }
        }
    }

    getTimestamp(){
        return this.time;
    }

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
