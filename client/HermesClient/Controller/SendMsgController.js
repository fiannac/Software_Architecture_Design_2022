export default class SendMessageController {
    constructor(network, loggedUser) {
        this.network = network
        this.loggedUser = loggedUser
    }

    async inviaMessaggio(dest, text){  

        //fetcha dal database la pubk del destinatario, cripta il testo.

        //fetcha id, destId, token
        const id = this.loggedUser.id;
        const token = this.loggedUser.token;
        const destId = 0; //aggiungere metodi al loggedUser
        const destUser = user;
        //cripta il testo
        const res = await this.network.msgRequest(id, destId, token, text);

        //salva in locale il messaggio
        this.loggedUser.createMessage(text, destUser, 0)
    }
    
}