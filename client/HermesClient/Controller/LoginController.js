export default class LoginController {
    constructor(network, loggedUser, crypto, createChat, storage) {
        this.network = network
        this.loggedUser = loggedUser
        this.createChat = createChat
        this.crypto = crypto
        this.storage = storage
    }

    async login(user, Opsw){
        const psw = await this.crypto.hashPsw(Opsw)
        const reply = await this.network.loginRequest(user,psw);
        if(reply.ok == false){
            return false
        }else {
            this.loggedUser.setId(reply.id)
            this.loggedUser.setToken(reply.token)
            this.loggedUser.setPsw(Opsw)
            this.loggedUser.setUser(user)
            this.loggedUser.setPuk(reply.puk)
            const prk = await this.crypto.decryptPrk(reply.prk, Opsw)
            this.loggedUser.setPrk(prk)

            var lastTimestamp = new Date('2000-01-01T00:00:00.000Z');
            const chats = await this.storage.loadChats(reply.id);
            for(let chat of chats){
                this.loggedUser.createChat(chat.idDestinatario, chat.userName, chat.puk)
                const msg = await this.storage.getMessagesByChat(reply.id, chat.idDestinatario)
                for(let m of msg){
                    this.loggedUser.createMessage(m.text, chat.idDestinatario, m.timestamp, m.idMess)
                    if(new Date(m.timestamp) > lastTimestamp){
                        lastTimestamp = new Date(m.timestamp)
                    }
                }
            }

            const msgs = await this.network.rcvOldMsgReq(reply.id, reply.token, lastTimestamp.toString()); 
            for(let msg of msgs.list){
                const id = reply.id
                if(id == msg.idDestinatario){
                    if(!this.loggedUser.chats.has(msg.idMittente)){
                        const res = await this.createChat.createChatFromId(msg.idMittente)
                    } 
                    const key = await this.crypto.decryptKey(msg.keyD, this.loggedUser.prk)
                    const text = await this.crypto.decryptMsg(msg.text, key);
                    this.loggedUser.createMessage(text, msg.idMittente, msg.timestamp, 'rcv')
                    this.storage.insertMessage(id,msg.idMittente, text, msg.timestamp, 'rcv')
                } else {
                    if(!this.loggedUser.chats.has(msg.idDestinatario)){
                        const res = await this.createChat.createChatFromId(msg.idDestinatario)
                    } 
                    const key = await this.crypto.decryptKey(msg.keyM, this.loggedUser.prk)
                    const text = await this.crypto.decryptMsg(msg.text, key);
                    this.loggedUser.createMessage(text, msg.idDestinatario, msg.timestamp, 'snd')
                    this.storage.insertMessage(id,msg.idDestinatario, text, msg.timestamp, 'snd')
                }
            }
            
            this.network.authWSRequest(reply.id, reply.token);
            return true;
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