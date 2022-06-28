export default class SendMessageController {
    constructor(network, loggedUser, crypto) {
        this.network = network
        this.loggedUser = loggedUser
        this.crypto = crypto
    }

    async inviaMessaggio(idDest, text){  
        const id = this.loggedUser.id;
        const token = this.loggedUser.token;
        const destPubk = this.loggedUser.getUserPbk(idDest)
        const ctext = this.crypto.encryptMsg(text, destPubk)
        
        const res = await this.network.msgRequest(id, idDest, token, ctext);
        this.loggedUser.createMessage(text, idDest, 0)
        //salva in locale il messaggio
    }
    
}