export default class RcvMsgController {
    constructor(network, loggedUser, crypto) {
        this.network = network
        this.loggedUser = loggedUser
        this.crypto = crypto
    }

    rcvMsg(text, usernameDest, timestamp){  
        console.log(usernameDest)
        if(!this.loggedUser.chats.has(usernameDest)){
            //devo fetchare id, pubk zio peto dal network
            const data = this.network.userDataRequest(usernameDest, this.loggedUser.id, this.loggedUser.token) 
            const idDest = data.id
            const pubk = data.pubk
            this.loggedUser.createChat(idDest, usernameDest,pubk)
        }
        this.loggedUser.createMessage(this.crypto.decryptMsg(text, this.loggedUser.prk), usernameDest, 0)
        //stora in locale
    }
    
}