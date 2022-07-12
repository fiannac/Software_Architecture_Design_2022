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
    
    async registerRequest(userName, password, email, puk, prk) {
        if(userName == null || password == null || email == null || puk == null || prk == null){ 
            return {ok:false}
        }    
        const regReq = await this.authServiceConnection.registerRequest(userName, password, email, puk, prk);
        if(regReq.ok == false){
            return {ok:false};
        } 
        const addDataReq = await this.userDataConnection.storeDataRequest(userName, puk, regReq.id);
        return {ok:true};
    }

    async loginRequest(userName, password, notifyToken) {
        if(userName == null || password == null){
            return {ok:false}
        } 
        const loginReq = await this.authServiceConnection.loginRequest(userName, password);
        if(loginReq.ok == false){
            return {ok:false};
        } 
            
        this.notifyServiceConnection.insert(loginReq.id, notifyToken);
        return {ok:true, token: loginReq.token, id: loginReq.id, prk: loginReq.prk, puk: loginReq.puk};
    }

    async logoutRequest(id,token) {
        if(token == null || id == null){
            return {"ok": false};
        } 

        const logoutReq = this.authServiceConnection.logoutRequest(id,token);
        if(logoutReq.ok == false){
            return {ok:false};
        }
                
        this.register.deleteUser(id);
        this.notifyServiceConnection.delete(id);
        return {ok:true};
    }
    
    async activateAccount(id){
        const ok = await this.authServiceConnection.activateAccount(id)
        if(ok == true){
            return "Account attivato!"
        } else {
            return "Il link di attivazione utilizzato non è valido!"
        }
    }

    async authWs(message, ws){
        const msg = await JSON.parse(message);
        if(msg.id == null || msg.token == null){
            return
        }
        if(await this.authServiceConnection.checkToken(msg.id, msg.token)){
            console.log("User authenticated")
            this.register.createConnection(msg.id,ws);
            ws.send(JSON.stringify({type:'auth',ok:true}))
        }
    }

    async deleteWs(ws){
        console.log('Client disconnected');
        this.register.deleteUserByWs(ws);
    }
}

