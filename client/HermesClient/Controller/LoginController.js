export default class LoginController {
    constructor(network, loggedUser) {
        this.network = network
        this.loggedUser = loggedUser
    }

    async login(user, psw){
        //hasha la psw
        const reply = await this.network.loginRequest(user,psw);

        console.log(reply)
        if(reply.ok == true){
            this.network.authWSRequest(reply.id, reply.token);

            /*const msgs = this.network.rcvOldMsgReq(reply.id, reply.token);
            for(let msg of msgs){
                if(!this.loggedUser.chats.has(msg.dest)){
                    //la pubk potrebbe dover essere fetchata dal server.
                    this.loggedUser.createChat(msg.id, msg.dest,msg.pubk)
                }
                this.loggedUser.createMessage(msg.text, msg.dest, 0)
            }
            */

            this.loggedUser.setId(reply.id)
            this.loggedUser.setToken(reply.token)
            this.loggedUser.setPsw(psw)
            this.loggedUser.setUser(user)
            this.loggedUser.setPrk(reply.prk)
            
            //storo queste info in locale per i prossimi login
            return true;
        } else {
            return false;
        }
    }
}