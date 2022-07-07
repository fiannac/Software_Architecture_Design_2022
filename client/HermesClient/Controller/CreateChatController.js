export default class CreateChatController {
    constructor(network, loggedUser, storage) {
        this.network = network
        this.loggedUser = loggedUser
        this.storage = storage
    }

    async createChatFromUsername(username){  
        if(username == this.loggedUser.userName){
            return -1
        }
        const id = this.loggedUser.id;
        const token = this.loggedUser.token;

        const data = await this.network.userDataRequest(username, id, token) 
        if(data.ok == false){
            return -2;
        }

        if(this.loggedUser.chatExists(data.id)){
            return -3;
        }
        const idDest = data.id
        const puk = data.puk
        this.loggedUser.createChat(idDest, username, puk)
        var res = await this.storage.insertUser(idDest, username, puk)
        var res = await this.storage.insertChat(id, idDest, 0)

        return true;
        
    }

    async createChatFromId(idMittente){  
        if(this.loggedUser.chats.has(idMittente)){
            return false;
        }
        const id = this.loggedUser.id;
        const token = this.loggedUser.token;

        const data = await this.network.userDataFromIdRequest(idMittente, id, token) 

        if(data.ok == false){
            return false;
        }

        const userNameMittente = data.userName
        const puk = data.puk
        this.loggedUser.createChat(idMittente, userNameMittente, puk)
        
        var res = this.storage.insertUser(idMittente, userNameMittente, puk)
        var res = this.storage.insertChat(id, idMittente, 0)
        
        return true
    }

    async bloccaUtente(id, token, idDaBloccare){ //id è l'id dell'utente che sta bloccando/sbloccando
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