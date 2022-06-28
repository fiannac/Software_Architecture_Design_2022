export default class LoginController {
    constructor(network, loggedUser, crypto) {
        this.network = network
        this.loggedUser = loggedUser
        this.crypto = crypto
    }

    async login(user, Opsw){
        const psw = this.crypto.hashPsw(Opsw)
        const reply = await this.network.loginRequest(user,psw);

        if(reply.ok == true){
            this.network.authWSRequest(reply.id, reply.token);

            this.loggedUser.setId(reply.id)
            this.loggedUser.setToken(reply.token)
            this.loggedUser.setPsw(Opsw)
            this.loggedUser.setUser(user)
            this.loggedUser.setPrk(this.crypto.decryptPrk(reply.prk, Opsw))

            const msgs = await this.network.rcvOldMsgReq(reply.id, reply.token);
            for(let msg of msgs.list){
                if(!this.loggedUser.chats.has(msg.dest)){
                    const data = await this.network.userDataRequest(msg.dest, reply.id, reply.token) 
                    const idDest = data.id
                    const pubk = data.pubk
                    this.loggedUser.createChat(idDest, msg.dest,pubk)
                }
                this.loggedUser.createMessage(msg.text, msg.dest, 0)
            }
            
            //storo queste info in locale per i prossimi login
            return true;
        } else {
            return false;
        }
    }
}