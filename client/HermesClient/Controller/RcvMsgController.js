export default class RcvMsgController {
    constructor(network, loggedUser, crypto, createChat, storage) {
        this.network = network
        this.loggedUser = loggedUser
        this.createChat = createChat
        this.crypto = crypto
        this.storage = storage
    }

    async rcvMsg(text, keyD, idMittente, timestamp){  
        if(!this.loggedUser.chats.has(idMittente)){
            const res = await this.createChat.createChatFromId(idMittente)
        }

        const key = await this.crypto.decryptKey(keyD, this.loggedUser.prk)
        const msg = await this.crypto.decryptMsg(text, key)
        this.loggedUser.createMessage(msg, idMittente, timestamp, 'rcv')
        const res = await this.storage.insertMessage(this.loggedUser.id,idMittente,msg, timestamp, 'rcv')
    }
    
}