const DAO = require('./DAO.js');

class RequestController{
    
    constructor(){
        this.dao = new DAO();
    }

    async storeData(id, userName, puk){
        let ok = await this.dao.storeData(id, userName, puk);
        return {ok:ok};
    }

    async userData(username){
        let userData = await this.dao.userData(username);
        return userData;
    }

    async userDataById(id){
        let userData = await this.dao.userDataById(id);
        return userData;
    }
}

module.exports = RequestController;