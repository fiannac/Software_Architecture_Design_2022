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
}