export default class LoginController {
    constructor(network, loggedUser, crypto, createChat) {
        this.network = network
        this.loggedUser = loggedUser
        this.createChat = createChat
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

            this.loggedUser.setPrk(this.crypto.decryptPrk(reply.prk,Opsw))

            const msgs = await this.network.rcvOldMsgReq(reply.id, reply.token); 
            for(let msg of msgs.list){
                if(!this.loggedUser.chats.has(msg.idMittente)){
                    const res = await this.createChat.createChatFromId(msg.idMittente)
                } 
                this.loggedUser.createMessage(this.crypto.decryptMsg(msg.text, this.loggedUser.prk), msg.idMittente, 0)
            }
            
            //storo queste info in locale per i prossimi login
            return true;
        } else {
            return false;
        }
    }

    async logout(){
        const res = await this.network.logoutRequest(this.loggedUser.id, this.loggedUser.token);
        this.loggedUser.setId('')
        this.loggedUser.setToken('')
        this.loggedUser.setPsw('')
        this.loggedUser.setUser('')
        this.loggedUser.setPrk('')
        this.loggedUser.setLoggedState(false)
        this.loggedUser.chats.clear()
        return true;
    }
}