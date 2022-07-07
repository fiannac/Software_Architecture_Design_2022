import MsgServiceConnection from '../services/msgServiceConnection.js';
import NotifyServiceConnection from '../services/notifyServiceConnection.js';

export default class MsgHandler {
    constructor(userConnections) {
        this.userConnections = userConnections
        this.msgSerivceConnection = new MsgServiceConnection();
        this.notifyServiceConnection = new NotifyServiceConnection();
    }
    async storedMsgRequest(req, res){
        if(req.body.idDestinatario == null || req.body.token == null || req.body.timestamp == null){
            res.send(JSON.stringify({
                "ok": false
            }));
        } else {
            if(this.userConnections.has(req.body.idDestinatario)){
                var resp = await this.msgSerivceConnection.storedMsgRequest(req.body.idDestinatario, req.body.token, req.body.timestamp);
                res.send(JSON.stringify(resp))
            } else {
            }
        }
    }
    async msgRequest(req, res) {
        if(req.body.idMittente == null || req.body.idDestinatario == null || req.body.token == null || req.body.text == null || req.body.timestamp == null){
            res.send(JSON.stringify({
                "ok": false
            }));
        } else {
            if(this.userConnections.has(req.body.idMittente)){ //sempre vero?, no francesco, fallo
                if(this.userConnections.get(req.body.idMittente).token == req.body.token){
                    const reqMsg = await this.msgSerivceConnection.storeMsg(req.body.idMittente, req.body.idDestinatario, req.body.text, req.body.keyM, req.body.keyD , req.body.timestamp);
                    if(reqMsg.ok == false){
                        res.send(JSON.stringify({ok:false}));
                        return;
                    } else if(this.userConnections.has(req.body.idDestinatario)){ // se l'utente destinatario è connesso
                        this.userConnections.get(req.body.idDestinatario).ws.send(JSON.stringify({
                            "idMittente": req.body.idMittente,
                            "text": req.body.text,
                            "timestamp": req.body.timestamp,
                            "keyM": req.body.keyM,
                            "keyD": req.body.keyD,
                            "type": "msg"
                        }));
                    }
                    res.send(JSON.stringify({ok:true}));
                    this.notifyServiceConnection.notify(req.body.idDestinatario);
                } else {
                    res.send(JSON.stringify({ok:false}));
                }
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
            if(this.userConnections.has(req.body.id)){
                if(this.userConnections.get(req.body.id).token == req.body.token){
                    const reqMsg = await this.msgSerivceConnection.blockUser(req.body.id, req.body.idBlocked);
                    if(reqMsg.ok == false){
                        res.send(JSON.stringify({ok:false}));
                    } else {
                        res.send(JSON.stringify({ok:true}));
                    }
                } else {
                    res.send(JSON.stringify({ok:false}));
                }
            } else {
                res.send(JSON.stringify({ok:false}));
            }
        }
    }
}
