import MsgServiceConnection from '../services/msgServiceConnection.js';

export default class MsgHandler {
    constructor(userConnections) {
        this.userConnections = userConnections
        this.msgSerivceConnection = new MsgServiceConnection();
    }
    async storedMsgRequest(req, res){
        console.log("richiesta di stored msg: ", req.body);
        if(req.body.idDestinatario == null || req.body.token == null){
            res.send(JSON.stringify({
                "ok": false
            }));
        } else {
            console.log("Id destinatario: ", req.body.idDestinatario);
            if(this.userConnections.has(req.body.idDestinatario)){
                var resp = await this.msgSerivceConnection.storedMsgRequest(req.body.idDestinatario);
                console.log("Richiesta di stored msg riuscita: ", resp);
                res.send(JSON.stringify(resp))
                console.log("Richiesta riuscita:" + resp)
            } else {
                console.log("Utente non connesso " + this.userConnections)
            }
        }
    }
    async msgRequest(req, res) {
        console.log("Richiesta di msg", req.body)
        if(req.body.idMittente == null || req.body.idDestinatario == null || req.body.token == null || req.body.text == null || req.body.timestamp == null){
            console.log("Abortura richiesta di msg")
            res.send(JSON.stringify({
                "ok": false
            }));
        } else {
            console.log("invio richiesta di msg")
            if(this.userConnections.has(req.body.idMittente)){ //sempre vero?, no francesco, fallo
                console.log("Ho gia i dati dell'utente")
                if(this.userConnections.get(req.body.idMittente).token == req.body.token){
                    const reqMsg = await this.msgSerivceConnection.storeMsg(req.body.idMittente, req.body.idDestinatario, req.body.text, req.body.timestamp);
                    console.log("Richiesta di msg riuscita" + reqMsg)
                    if(reqMsg.ok == false){
                        console.log("Richiesta store fallita")
                        res.send(JSON.stringify({ok:false}));
                    } else if(this.userConnections.has(req.body.idDestinatario)){ // se l'utente destinatario è connesso
                        this.userConnections.get(req.body.idDestinatario).ws.send(JSON.stringify({
                            "idMittente": req.body.idMittente,
                            "text": req.body.text,
                            "timestamp": req.body.timestamp,
                            "type": "msg"
                        }));
                    }
                    console.log("Richiesta riuscita")
                    res.send(JSON.stringify({ok:true}));
                } else {
                    console.log("Token non corrispondente")
                    res.send(JSON.stringify({ok:false}));
                }
            } else {
                console.log("Utente Mittente non connesso wtf?!!!")
                res.send(JSON.stringify({ok:false}));
            }

        }
    }
}
