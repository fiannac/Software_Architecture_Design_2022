export default class MessageController {
    constructor(network, loggedUser, crypto, chat, storage) {
        this.network = network
        this.loggedUser = loggedUser
        this.crypto = crypto
        this.storage = storage
        this.chat = chat
    }

    async rcvMsg(text, keyD, idMittente, timestamp){  
        if(!this.loggedUser.chats.has(idMittente)){
            const res = await this.chat.createChatFromId(idMittente)
        }
        const key = await this.crypto.decryptKey(keyD, this.loggedUser.prk)
        const msg = await this.crypto.decryptMsg(text, key)
        this.loggedUser.createMessage(msg, idMittente, timestamp, 'rcv')
        const res = await this.storage.insertMessage(this.loggedUser.id,idMittente,msg, timestamp, 'rcv')
    }

    async inviaMessaggio(idDest, text){  
        const id = this.loggedUser.id;
        const token = this.loggedUser.token;
        const destPuk = this.loggedUser.getUserPbk(idDest)

        const key = this.crypto.generateKey()
        const keyM = await this.crypto.encryptKey(key, this.loggedUser.puk)
        const keyD = await this.crypto.encryptKey(key, destPuk)
        const ctext = await this.crypto.encryptMsg(text, key)
        
        var date = new Date()
        date = date.toString()
        this.loggedUser.createMessage(text, idDest, date, 'snd')
        var res = await this.network.msgRequest(id, idDest, token, ctext, keyM, keyD , date);
        
        if(res == true){
            res = await this.storage.insertMessage(id, idDest, text, date, 'snd')
            return true;
        } else {
            return false;
        }
    }

    async getStoredMsg(id, token){
        const msgs = await this.network.rcvOldMsgReq(id, token);
        for(let msg of msgs.list){
            const id = reply.id
            if(!this.loggedUser.chats.has(msg.sender)){
                const res = await this.createChat.createChatFromId(msg.sender)
            } 
            const key = await this.crypto.decryptKey(msg.keyD, this.loggedUser.prk)
            const text = await this.crypto.decryptMsg(msg.text, key);
            this.loggedUser.createMessage(text, msg.sender, msg.timestamp, 'rcv')
            this.storage.insertMessage(id,msg.sender, text, msg.timestamp, 'rcv')
        }
    }

}