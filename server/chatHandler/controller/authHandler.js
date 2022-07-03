import AuthServiceConnection from '../services/authServiceConnection.js';
import UserDataConnection from '../services/userDataConnection.js';

export default class AuthHandler {
    constructor(clientInterface){
        this.authServiceConnection = new AuthServiceConnection();
        this.userDataConnection = new UserDataConnection();
        this.ClientInterface = clientInterface
    }
    async registerRequest(req, res) {
        res.setHeader('Content-Type', 'application/json');
        
        if(req.body.userName == null || req.body.password == null || req.body.email == null || req.body.puk == null || req.body.prk == null){ 
            res.send(JSON.stringify({
                "ok": false
            }));
        } else  {
        //
            const regReq = await this.authServiceConnection.registerRequest(req.body.userName, req.body.password, req.body.email, req.body.puk, req.body.prk);
            if(regReq.ok == false){
                res.send(JSON.stringify({ok:false}));
            } else{
                const addDataReq = await this.userDataConnection.storeDataRequest(req.body.userName, req.body.puk, regReq.id);
                res.send(JSON.stringify({ok:true}));
            }
        }
    }
    async loginRequest(req, res) {
        res.setHeader('Content-Type', 'application/json');
        if(req.body.userName == null || req.body.password == null){
            res.send(JSON.stringify({
                "ok": false
            }));
        } else {
            const loginReq = await this.authServiceConnection.loginRequest(req.body.userName, req.body.password);
            if(loginReq.ok == false){
                res.send(JSON.stringify({ok:false}));
            } else {
                this.ClientInterface.addUserConnection(loginReq.id, loginReq.token); //aggiusta questo codice
                res.send(JSON.stringify({ok:true, token: loginReq.token, id: loginReq.id, prk: loginReq.prk, puk: loginReq.puk}));
            }
        }

    }
    async logoutRequest(req, res) {
        res.setHeader('Content-Type', 'application/json');
        if(req.body.token == null || req.body.id == null){
            res.send(JSON.stringify({
                "ok": false
            }));
        } else {
            const logoutReq = this.authServiceConnection.logoutRequest(req.body.id,req.body.token);
            if(logoutReq.ok == false){
                res.send(JSON.stringify({ok:false}));
            } else {
                this.ClientInterface.removeUserConnection(req.body.id);
                res.send(JSON.stringify({ok:true}));
            }
        }
    }
    async checkToken(id, token) {
        const checkTokenReq = await this.authServiceConnection.checkToken(id, token); 
        if(checkTokenReq.ok == false){
            return false;
        } else {
            return true;
        }
    }
}

