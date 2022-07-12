export default class CreateChatController {

    constructor(network, loggedUser, storage) {
        this.network = network; //riferimento a istanza di networkAccess
        this.loggedUser = loggedUser;
        this.storage = storage; //riferimento a istanza di localStorage
    }

    async createChatFromUsername(username){  

        //controllo crazione chat con se stesso
        if(username == this.loggedUser.userName){
            return -1;
        }

        const id = this.loggedUser.id;
        const token = this.loggedUser.token;
        const data = await this.network.userDataRequest(username, id, token);
        if(data.ok == false){
            return -2;
        }
        if(this.loggedUser.chatExists(data.id)){
            return -3;
        }
        const idDest = data.id;
        const puk = data.puk;

        //richiama funzione di creazione chat a partire da id destinatario 
        this.loggedUser.createChat(idDest, username, puk);
        var res = await this.storage.insertUser(idDest, username, puk);
        var res = await this.storage.insertChat(id, idDest, 0);

        return true;
        
    }

    //metodo per creazione indiretta di chat alla ricezione di un messaggio 
    //in una chat ancora non esistente  
    async createChatFromId(idMittente){  
        if(this.loggedUser.chats.has(idMittente)){
            //se la chat già esiste
            return false;
        }

        const id = this.loggedUser.id;
        const token = this.loggedUser.token;

        //richiede i dati dell'utente con id=idMittente 
        const data = await this.network.userDataFromIdRequest(idMittente, id, token) 

        if(data.ok == false){
            return false;
        }

        //crea la chat con il mittente del messaggio e salva dati mittente
        console.log(data)
        const userNameMittente = data.userName
        const puk = data.puk
        this.loggedUser.createChat(idMittente, userNameMittente, puk)
        var res = this.storage.insertUser(idMittente, userNameMittente, puk)
        var res = this.storage.insertChat(id, idMittente, 0)
        
        return true
    }

    
    async bloccaUtente(id, token, idDaBloccare){ 
        const res = await this.network.blockUser(id, token, idDaBloccare)
        if(res.ok == false){
            return false;
        }
        return true;
    }

    async deleteChat(idDaEliminare){
        const id = this.loggedUser.id;
        await this.storage.deleteChat(id, idDaEliminare)
        await this.storage.deleteMsg(id, idDaEliminare)

        this.loggedUser.deleteChat(idDaEliminare)
        return true;
    }
}