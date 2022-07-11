const DAO = require('./DAO.js');

class RequestController{
    constructor(){
        this.dao = new DAO();
    }

    async storeMsg(idMittente, idDestinatario, text, keyD, timestamp){
        const blocked = await this.dao.checkBlockedUser(idDestinatario,idMittente)
        if(blocked == true){
            return {ok:false};
        } else {
            const resp = await this.dao.storeMsg(idMittente, idDestinatario, text, keyD, timestamp);
            return {ok:resp};
        }
    }

    async storedMsgRequest(idDestinatario){
        const resp = await this.dao.storedMsgRequest(idDestinatario);
        await this.dao.deleteStoredMsg(idDestinatario);
        return resp;
    }

    async blockUser(id, idBlocked){
        const blocked = await this.dao.checkBlockedUser(id, idBlocked)
        let resp = 0;
        if(blocked == true){
            resp = await this.dao.unblockUser(id, idBlocked);
        } else {
            resp = await this.dao.blockUser(id, idBlocked);
        }
        return {ok:resp};
    }

    async checkBlock(id, idBlocked){
        const blocked = await this.dao.checkBlockedUser(id, idBlocked)
        return {ok:blocked};
    }
}

module.exports = RequestController;