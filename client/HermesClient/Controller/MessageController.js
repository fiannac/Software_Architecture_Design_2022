export default class MessageController {
    constructor(network, loggedUser, crypto, chat, storage) {
        this.network = network
        this.loggedUser = loggedUser
        this.crypto = crypto
        this.storage = storage
        this.chat = chat
    }

    // metodo di ricezione messaggio quando l'utente è online
    async rcvMsg(text, keyD, idMittente, timestamp){  
        if(!this.loggedUser.chats.has(idMittente)){
            // se non esiste la chat col mittente è creata
            const res = await this.chat.createChatFromId(idMittente)
        }
        const key = await this.crypto.decryptKey(keyD, this.loggedUser.prk)
        const msg = await this.crypto.decryptMsg(text, key)
        this.loggedUser.createMessage(msg, idMittente, timestamp, 'rcv')
        const res = await this.storage.insertMessage(this.loggedUser.id,idMittente,msg, timestamp, 'rcv')
    }

    // metodo per l'invio di un messaggio
    async inviaMessaggio(idDest, text){  
        const id = this.loggedUser.id;
        const token = this.loggedUser.token;
        const destPuk = this.loggedUser.getUserPbk(idDest) // richiede la chiave pubblica del destinatario

        const key = this.crypto.generateKey()
        const keyM = await this.crypto.encryptKey(key, this.loggedUser.puk)
        const keyD = await this.crypto.encryptKey(key, destPuk)
        const ctext = await this.crypto.encryptMsg(text, key)  
        
        var date = new Date()
        date = date.toString()
        this.loggedUser.createMessage(text, idDest, date, 'snd')  //creazione del messaggio
        var res = await this.network.msgRequest(id, idDest, token, ctext, keyM, keyD , date);
        
        if(res == true){
            res = await this.storage.insertMessage(id, idDest, text, date, 'snd') //memorizzo in locale il messaggio trasmesso
            return true;
        } else {
            return false;
        }
    }
}