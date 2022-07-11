import MsgServiceConnection from '../services/msgServiceConnection.js';
import NotifyServiceConnection from '../services/notifyServiceConnection.js';
import AuthServiceConnection from '../services/authServiceConnection.js';

export default class MsgHandler {
    constructor(register) {
        this.register = register
        this.msgSerivceConnection = new MsgServiceConnection();
        this.notifyServiceConnection = new NotifyServiceConnection();
        this.authConn = new AuthServiceConnection();
    }

    async storedMsgRequest(id, token){
        if(id == null || token == null)
            return {"ok": false}
     
        if(await this.authConn.checkToken(id, token)){
            var resp = await this.msgSerivceConnection.storedMsgRequest(id, token);
            return resp;
        }
        return {"ok": false};
    }
    
    async msgRequest(idM, idD, token, text, timestamp, keyD) {
        if(idM == null || idD == null || token == null || text == null || timestamp == null || keyD == null)
            return {ok: false}

        if(! await this.authConn.checkToken(idM, token)){   
            return {ok: false};
        }

        if(this.register.getUser(idD) != null){ // se l'utente destinatario è connesso
            if(true == await this.msgSerivceConnection.checkBlock(idD, idM))
                return {ok:false};
            
            this.register.getUser(idD).send(text, idM, timestamp, keyD);
        } else {
            const reqMsg = await this.msgSerivceConnection.storeMsg(idM, idD, text, keyD, timestamp); 
            if(reqMsg.ok == false)
                return {ok:false};
        }
        this.notifyServiceConnection.notify(idD);
        return {ok:true};
    }

    async blockUserRequest(id, idBlocked, token){
        if(id == null || token == null || idBlocked == null)
            return {ok: false};
        
        if(! await this.authConn.checkToken(id,token))
            return {ok: false};
    
        const reqMsg = await this.msgSerivceConnection.blockUser(id, idBlocked);
        if(reqMsg.ok == false){
            return {ok:false};
        } 
        
        return {ok:true};
    }
}
