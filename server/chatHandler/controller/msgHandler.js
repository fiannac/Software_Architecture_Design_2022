import MsgServiceConnection from '../services/msgServiceConnection.js';
import NotifyServiceConnection from '../services/notifyServiceConnection.js';

export default class MsgHandler {
    constructor(register) {
        this.register = register
        this.msgSerivceConnection = new MsgServiceConnection();
        this.notifyServiceConnection = new NotifyServiceConnection();
    }

    async storedMsgRequest(req, res){
        if(req.body.idDestinatario == null || req.body.token == null){
            res.send(JSON.stringify({
                "ok": false
            }));
        } else {
            if(this.register.checkToken(req.body.idDestinatario, req.body.token)){
                var resp = await this.msgSerivceConnection.storedMsgRequest(req.body.idDestinatario, req.body.token, req.body.timestamp);
                res.send(JSON.stringify(resp))
            }
        }
    }
    
    async msgRequest(req, res) {
        if(req.body.idMittente == null || req.body.idDestinatario == null || req.body.token == null || req.body.text == null || req.body.timestamp == null){
            res.send(JSON.stringify({
                "ok": false
            }));
        } else {
            if(this.register.checkToken(req.body.idMittente, req.body.token)){         
                if(this.register.getUser(req.body.idDestinatario) != null){ // se l'utente destinatario è connesso
                    if(true == await this.msgSerivceConnection.checkBlock(req.body.idDestinatario, req.body.idMittente)){
                        res.send(JSON.stringify({ok:false}));
                        return;
                    }
                    this.register.getUser(req.body.idDestinatario).send(req.body.text, req.body.idMittente, req.body.timestamp, req.body.keyD);
                } else {
                    const reqMsg = await this.msgSerivceConnection.storeMsg(req.body.idMittente, req.body.idDestinatario, req.body.text, req.body.keyM, req.body.keyD , req.body.timestamp); 
                    if(reqMsg.ok == false){
                        res.send(JSON.stringify({ok:false}));
                        return;
                    }  
                }
                res.send(JSON.stringify({ok:true}));
                this.notifyServiceConnection.notify(req.body.idDestinatario);
            } else {
                res.send(JSON.stringify({ok:false}));
            }

        }
    }

    async blockUserRequest(req, res){
        if(req.body.id == null || req.body.token == null || req.body.idBlocked == null){
            res.send(JSON.stringify({
                "ok": false
            }));
        } else {
            if(this.register.checkToken(req.body.id, req.body.token)){
                const reqMsg = await this.msgSerivceConnection.blockUser(req.body.id, req.body.idBlocked);
                if(reqMsg.ok == false){
                    res.send(JSON.stringify({ok:false}));
                } else {
                     res.send(JSON.stringify({ok:true}));
                }
            } else {
                res.send(JSON.stringify({ok:false}));
            }
        }
    }
}
