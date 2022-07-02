export default class CreateChatController {
    constructor(network, loggedUser, storage) {
        this.network = network
        this.loggedUser = loggedUser
        this.storage = storage
    }

    async createChatFromUsername(username){  
        if(username == this.loggedUser.userName){
            return false
        }
        const id = this.loggedUser.id;
        const token = this.loggedUser.token;

        const data = await this.network.userDataRequest(username, id, token) 

        if(data.ok == false){
            return false;
        }
        if(this.loggedUser.chatExists(data.id)){
            return false;
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
        
        //memorizza chat in locale
        var res = this.storage.insertUser(idMittente, userNameMittente, puk)
        var res = this.storage.insertChat(id, idMittente, 0)
        
        return true
    }
    
}