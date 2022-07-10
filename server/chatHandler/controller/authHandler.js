import AuthServiceConnection from '../services/authServiceConnection.js';
import UserDataConnection from '../services/userDataConnection.js';
import NotifyServiceConnection from '../services/notifyServiceConnection.js';

export default class AuthHandler {
    constructor(register){
        this.authServiceConnection = new AuthServiceConnection();
        this.userDataConnection = new UserDataConnection();
        this.notifyServiceConnection = new NotifyServiceConnection();
        this.register = register
    }
    async registerRequest(req, res) {
        res.setHeader('Content-Type', 'application/json');
        if(req.body.userName == null || req.body.password == null || req.body.email == null || req.body.puk == null || req.body.prk == null){ 
            res.send(JSON.stringify({
                "ok": false
            }));
        } else  {
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
        console.log(req.body.userName, req.body.password)
        if(req.body.userName == null || req.body.password == null){
            res.send(JSON.stringify({
                "ok": false
            }));
        } else {
            const loginReq = await this.authServiceConnection.loginRequest(req.body.userName, req.body.password);
            console.log(loginReq)
            if(loginReq.ok == false){
                res.send(JSON.stringify({ok:false}));
            } else {
                this.register.createUser(loginReq.id, loginReq.token);
                this.notifyServiceConnection.insert(loginReq.id, req.body.notifyToken);
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
                this.register.deleteUser(req.body.id);
                res.send(JSON.stringify({ok:true}));
                this.notifyServiceConnection.delete(req.body.id);
            }
        }
    }
    
    async activateAccount(req, res){
        const ok = await this.authServiceConnection.activateAccount(req.params.id)
        if(ok == true){
            res.send("Account attivato!")
        } else {
            res.send("Il link di attivazione utilizzato non è valido!")
        }
    }

    async authWs(message, ws){
        const msg = await JSON.parse(message);
        if(msg.id == null || msg.token == null){
            return
        }
        if(this.register.checkToken(msg.id, msg.token)){
            console.log("User authenticated")
            this.register.authConnection(msg.id,ws);
            ws.send(JSON.stringify({type:'auth',ok:true}))
        }
    }

    async deleteWs(ws){
        console.log('Client disconnected');
        this.register.deleteUserByWs(ws);
    }
}

