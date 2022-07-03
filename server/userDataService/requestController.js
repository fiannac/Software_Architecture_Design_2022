const DAO = require('./DAO.js');

class RequestController{
    
    constructor(){
        this.dao = new DAO();
    }

    async storeData(req, res){
        console.log("Store data request: "+ JSON.stringify(req.body));
        let ok = await this.dao.storeData(req.body.id, req.body.userName, req.body.puk);
        res.send(JSON.stringify({ok:ok}));
    }

    async userData(req, res){
        console.log("User data request: "+ JSON.stringify(req.body));
        let userData = await this.dao.userData(req.body.userName);
        res.send(JSON.stringify(userData));
    }

    async userDataById(req, res){
        console.log("User data request: "+ JSON.stringify(req.body));
        let userData = await this.dao.userDataById(req.body.id);
        res.send(JSON.stringify(userData));
    }
}

module.exports = RequestController;