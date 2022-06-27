export default class CreateChatController {
    constructor(network, loggedUser) {
        this.network = network
        this.loggedUser = loggedUser
    }

    createChat(username){  
        //se la chat esiste già non la devo creare.

        const id = this.loggedUser.id;
        const token = this.loggedUser.token;

        const data = this.network.userDataRequest(username, id, token) //forse jsonparse

        const idDest = data.id
        const pubk = data.pubk

        this.loggedUser.createChat(idDest, username, pubk)

        //memorizza chat in locale
    }
    
}