const DAO = require('./DAO.js');

class RequestController{
    constructor(){
        this.dao = new DAO();
    }

    async storeMsg(req, res){
        console.log("Store msg request: "+ JSON.stringify(req.body));
        const blocked = await this.dao.checkBlockedUser(req.body.idDestinatario,req.body.idMittente)
        console.log('blocked: '+blocked);
        if(blocked == true){
            res.send(JSON.stringify({ok:false, err:'User blocked'}))
        } else {
            const resp = await this.dao.storeMsg(req.body.idMittente, req.body.idDestinatario, req.body.text, req.body.keyM, req.body.keyD, req.body.timestamp);
            res.send(JSON.stringify({ok:resp}));
        }
    }

    async storedMsgRequest(req, res){
        console.log("Stored msg request: "+ JSON.stringify(req.body));
        const resp = await this.dao.storedMsgRequest(req.body.idDestinatario, req.body.token, req.body.timestamp);
        res.send(JSON.stringify(resp));
        this.dao.deleteStoredMsg(req.body.idDestinatario);
    }

    async blockUser(req, res){
        console.log("Block user request: "+ JSON.stringify(req.body));
        const resp = await this.dao.blockUser(req.body.id, req.body.idBlocked);
        res.send(JSON.stringify({ok:resp}));
    }
}

module.exports = RequestController;