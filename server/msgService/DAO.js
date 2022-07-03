class DAO{
    constructor(){
        this.data = new Map();
        this.msgIdMittente = new Map()
    }

    async storeMsg(idMittente, idDestinatario, text, keyM, keyD, timestamp){
        if(this.data.has(idDestinatario)){
            this.data.get(idDestinatario).push({idMittente: idMittente, idDestinatario: idDestinatario, text: text, keyM:keyM, keyD:keyD, timestamp: timestamp});
        } else {
            this.data.set(idDestinatario, [{idMittente: idMittente, idDestinatario: idDestinatario, text: text, keyM:keyM, keyD:keyD,  timestamp: timestamp}]);
        }

        if(this.msgIdMittente.has(idMittente)){
            this.msgIdMittente.get(idMittente).push({idMittente: idMittente, idDestinatario: idDestinatario, text: text, keyM:keyM, keyD:keyD,  timestamp: timestamp});
        } else {
            this.msgIdMittente.set(idMittente, [{idMittente: idMittente, idDestinatario: idDestinatario, text: text, keyM:keyM, keyD:keyD,  timestamp: timestamp}]);
        }


        return true;
    }

    async storedMsgRequest(idDestinatario, token, timestamp){

        var list = [];
        if(this.data.has(idDestinatario)){
            list = this.data.get(idDestinatario);
        }  
        if(this.msgIdMittente.has(idDestinatario)){
            var list2 = this.msgIdMittente.get(idDestinatario);
            list = list2.concat(list);
        }
        list = list.filter(msg => new Date(msg.timestamp) > new Date(timestamp));
        return {list: list};
    }
    
}

module.exports = DAO