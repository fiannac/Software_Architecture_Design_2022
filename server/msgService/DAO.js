class DAO{
    constructor(){
        this.data = new Map();
        this.blocked = new Map();
    }

    async storeMsg(idMittente, idDestinatario, text, keyM, keyD, timestamp){
        if(this.data.has(idDestinatario)){
            this.data.get(idDestinatario).push({idMittente: idMittente, idDestinatario: idDestinatario, text: text, keyM:keyM, keyD:keyD, timestamp: timestamp});
        } else {
            this.data.set(idDestinatario, [{idMittente: idMittente, idDestinatario: idDestinatario, text: text, keyM:keyM, keyD:keyD,  timestamp: timestamp}]);
        }
        return true;
    }

    async storedMsgRequest(idDestinatario, token, timestamp){
        var list = [];
        if(this.data.has(idDestinatario)){
            list = this.data.get(idDestinatario);
        }  
        list = list.filter(msg => new Date(msg.timestamp) > new Date(timestamp));
        return {list: list};
    }

    async deleteStoredMsg(idDestinatario){
        if(this.data.has(idDestinatario)){
            this.data.delete(idDestinatario);
        }  
    }

    async blockUser(id, idBlocked){
        if(this.blocked.has(id)){
            if(this.blocked.get(id).has(idBlocked)){
                this.blocked.get(id).delete(idBlocked);
            } else {
                this.blocked.get(id).set(idBlocked,true);
            }
        } else {
            const newBlocklist = new Map();
            newBlocklist.set(idBlocked,true);
            this.blocked.set(id,newBlocklist);
        }
    }

    async checkBlockedUser(id, idBlocked){
        console.log(this.blocked);
        if(this.blocked.has(id)){
            console.log('has id');
            console.log(this.blocked.get(id));
            console.log(idBlocked);

            console.log(this.blocked.get(id).has(idBlocked));
            if(this.blocked.get(id).has(idBlocked)){
                return true;
            }
        }
        return false;
    }
}

module.exports = DAO