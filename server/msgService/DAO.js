class DAO{
    constructor(){
        this.data = new Map();
    }

    async storeMsg(idMittente, idDestinatario, text, timestamp){
        console.log("Store msg request: ", idMittente, idDestinatario, text, timestamp);
        if(this.data.has(idDestinatario)){
            console.log("Some messages found ", this.data.get(idDestinatario));
            this.data.get(idDestinatario).push({idMittente: idMittente, idDestinatario: idDestinatario, text: text, timestamp: timestamp});
        } else {
            console.log("No messages found");
            this.data.set(idDestinatario, [{idMittente: idMittente, idDestinatario: idDestinatario, text: text, timestamp: timestamp}]);
        }
        return true;
    }

    async storedMsgRequest(idDestinatario){
        var list = [];
        if(this.data.has(idDestinatario)){
            console.log("Some messages found ", this.data.get(idDestinatario));
            list = this.data.get(idDestinatario);
        } else {
            console.log("No messages found for ", idDestinatario);
            console.log("All messages: ", this.data);
        }
        return {list: list};
    }
    
}

module.exports = DAO