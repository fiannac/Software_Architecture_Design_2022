export default class RcvMsgController {
    constructor(network, loggedUser) {
        this.network = network
        this.loggedUser = loggedUser
    }

    rcvMsg(text, usernameDest, timestamp){  
        if(!this.loggedUser.chats.has(usernameDest)){
            //devo fetchare id, pubk zio peto dal network

            const id = 0
            const pubk = 0
            this.loggedUser.createChat(id, usernameDest, pubk)
        }
        this.loggedUser.createMessage(msg.text, msg.dest, 0)
    }
    
}