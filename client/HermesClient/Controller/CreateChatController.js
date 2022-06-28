export default class CreateChatController {
    constructor(network, loggedUser) {
        this.network = network
        this.loggedUser = loggedUser
    }

    async createChatFromUsername(username){  
        //se la chat esiste già non la devo creare.

        const id = this.loggedUser.id;
        const token = this.loggedUser.token;

        const data = await this.network.userDataRequest(username, id, token) 

        if(data.ok == false){
            return false;
        }

        const idDest = data.id
        const puk = JSON.stringify(data.puk)
        //controlla se effettivamente l'utente esiste!
        this.loggedUser.createChat(idDest, username, puk)

        return true;
        //memorizza chat in locale
    }

    async createChatFromId(idMittente){  
        //se la chat esiste già non la devo creare.

        const id = this.loggedUser.id;
        const token = this.loggedUser.token;

        const data = await this.network.userDataFromIdRequest(idMittente, id, token) 

        if(data.ok == false){
            return false;
        }

        const userNameMittente = data.userName
        const puk = JSON.stringify(data.puk)
        //controlla se effettivamente l'utente esiste!
        this.loggedUser.createChat(idMittente, userNameMittente, puk)
        return true;
        //memorizza chat in locale
    }
    
}