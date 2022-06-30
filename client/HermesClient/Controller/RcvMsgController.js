export default class RcvMsgController {
    constructor(network, loggedUser, crypto, createChat, storage) {
        this.network = network
        this.loggedUser = loggedUser
        this.createChat = createChat
        this.crypto = crypto
        this.storage = storage
    }

    async rcvMsg(text, idMittente, timestamp){  
        if(!this.loggedUser.chats.has(idMittente)){
            const res = await this.createChat.createChatFromId(idMittente)
        }
        this.loggedUser.createMessage(this.crypto.decryptMsg(text, this.loggedUser.prk), idMittente, timestamp, 'rcv')

        const res = await this.storage.insertMessage(this.loggedUser.id,idMittente,text, timestamp, 'rcv')
    }
    
}