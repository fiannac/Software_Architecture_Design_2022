export default class CreateChatController {
    constructor(network, loggedUser) {
        this.network = network
        this.loggedUser = loggedUser
    }

    async createChat(username){  
        //se la chat esiste già non la devo creare.

        const id = this.loggedUser.id;
        const token = this.loggedUser.token;

        const data = await this.network.userDataRequest(username, id, token) 

        const idDest = data.id
        const pubk = data.pubk

        this.loggedUser.createChat(idDest, username, pubk)

        //memorizza chat in locale
    }
    
}