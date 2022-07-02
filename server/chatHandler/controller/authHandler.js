import AuthServiceConnection from '../services/authServiceConnection.js';
import UserDataConnection from '../services/userDataConnection.js';

export default class AuthHandler {
    constructor(clientInterface){
        this.authServiceConnection = new AuthServiceConnection();
        this.userDataConnection = new UserDataConnection();
        this.ClientInterface = clientInterface
    }
    async registerRequest(req, res) {
        console.log("Richiesta di registrazione")
        console.log(`Dati: ${req.body.userName} ${req.body.password}, ${req.body.prk}, ${req.body.email}, ${req.body.puk}`)
        res.setHeader('Content-Type', 'application/json');
        
        if(req.body.userName == null || req.body.password == null || req.body.email == null || req.body.puk == null || req.body.prk == null){ 
            res.send(JSON.stringify({
                "ok": false
            }));
        } else  {
        //
            const regReq = await this.authServiceConnection.registerRequest(req.body.userName, req.body.password, req.body.email, req.body.puk, req.body.prk);
            if(regReq.ok == false){
                console.log("Registrazione fallita")
                res.send(JSON.stringify({ok:false}));
            } else{
                console.log("Registrazione riuscita Utente: " + req.body.userName)
                const addDataReq = await this.userDataConnection.storeDataRequest(req.body.userName, req.body.puk, regReq.id);
                res.send(JSON.stringify({ok:true}));
            }
        }
    }
    async loginRequest(req, res) {
        console.log("Richiesta di login")
        console.log(`Dati: ${req.body.userName}, ${req.body.password}`)
        res.setHeader('Content-Type', 'application/json');
        if(req.body.userName == null || req.body.password == null){
            res.send(JSON.stringify({
                "ok": false
            }));
        } else {
            const loginReq = await this.authServiceConnection.loginRequest(req.body.userName, req.body.password);
            console.log("loginReq: " + JSON.stringify(loginReq))
            if(loginReq.ok == false){
                console.log("Login fallito")
                res.send(JSON.stringify({ok:false}));
            } else {
                console.log("Login riuscito " + JSON.stringify({ok:true, token: loginReq.token, id: loginReq.id, prk: loginReq.prk}))
                this.ClientInterface.addUserConnection(loginReq.id, loginReq.token); //aggiusta questo codice
                res.send(JSON.stringify({ok:true, token: loginReq.token, id: loginReq.id, prk: loginReq.prk}));
            }
        }

    }
    async logoutRequest(req, res) {
        console.log("Richiesta di logout")
        res.setHeader('Content-Type', 'application/json');
        if(req.body.token == null || req.body.id == null){
            res.send(JSON.stringify({
                "ok": false
            }));
        } else {
            const logoutReq = this.authServiceConnection.logoutRequest(req.body.id,req.body.token);
            if(logoutReq.ok == false){
                console.log("Logout fallito")
                res.send(JSON.stringify({ok:false}));
            } else {
                console.log("Logout riuscito")
                this.ClientInterface.removeUserConnection(req.body.id);
                res.send(JSON.stringify({ok:true}));
            }
        }
    }
    async checkToken(id, token) {
        console.log("Richiesta di checkToken")
        const checkTokenReq = await this.authServiceConnection.checkToken(id, token); //
        if(checkTokenReq.ok == false){
            console.log("CheckToken fallito")
            return false;
        } else {
            console.log("CheckToken riuscito")
            return true;
        }
    }
}

