export default class LoginController {
    constructor(network, loggedUser, crypto, createChat, storage) {
        this.network = network
        this.loggedUser = loggedUser
        this.createChat = createChat
        this.crypto = crypto
        this.storage = storage
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
                this.storage.insertMessage(reply.id,msg.idMittente, msg.text, msg.timestamp, '0')
            }
            
            //storo queste info in locale per i prossimi login


            //carica tutte le chat!
            const chats = await this.storage.loadChats(reply.id);
            for(let chat of chats){
                this.loggedUser.createChat(chat.idDestinatario, chat.userName, chat.puk)
                const msg = await this.storage.getMessagesByChat(reply.id, chat.idDestinatario)
                for(let m of msg){
                    this.loggedUser.createMessage(m.text, chat.idDestinatario, m.timestamp)
                }
            }
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