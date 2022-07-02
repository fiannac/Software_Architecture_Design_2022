const DAO = require('./DAO.js');

class RequestController{
    
    constructor(){
        this.dao = new DAO();
    }

    async login(req, res){
        console.log("Login request: ", req.body);
        const data = await this.dao.login(req.body.userName, req.body.password);
        console.log("Dati otteniti dal db: ", JSON.stringify(data));
        res.send(JSON.stringify(data));
    }

    async logout(req, res){
        console.log("Logout request: ", req.body);
        const data = await this.dao.logout(req.body.id,req.body.token);
        res.send(JSON.stringify(data));
    }

    async register(req, res){
        console.log("Register request: ", req.body);
        const data = await this.dao.register(req.body.userName, req.body.password, req.body.prk, req.body.email);
        res.send(JSON.stringify(data));
    }

    async checkToken(req, res){
        console.log("Check token request: ", req.body);
        const data = await this.dao.checkToken(req.body.id,req.body.token);
        res.send(JSON.stringify(data));
    }
}

module.exports = RequestController;