export default class ConnectionHandler {
    constructor(network) {
        this.network = network
    }

    login(user, psw){
        //hasha la psw
        const reply = this.network.loginRequest(user,psw);
        if(reply.ok == true){
            this.network.authWSRequest(id, reply.token);
            const msgs = this.network.rcvOldMsgReq(id, reply.token);
            //cicla su tutti i messaggi ricevuti, aggiungili al model
            //memorizzo authtoken e chiave privata
            return true;
        } else {
            return false;
        }
    }
}