export default class SendMessageController {
    constructor(network, loggedUser, crypto, storage) {
        this.network = network
        this.loggedUser = loggedUser
        this.crypto = crypto
        this.storage = storage
    }

    async inviaMessaggio(idDest, text){  
        const id = this.loggedUser.id;
        const token = this.loggedUser.token;
        const destPubk = this.loggedUser.getUserPbk(idDest)
        const ctext = this.crypto.encryptMsg(text, destPubk)
        
        
        const date = new Date()

        var res = await this.network.msgRequest(id, idDest, token, ctext);
        res = await this.loggedUser.createMessage(text, idDest, 0)
        //salva in locale il messaggio
        res = await this.storage.insertMessage(id,idDest, text, 0, '0')
    }
    
}