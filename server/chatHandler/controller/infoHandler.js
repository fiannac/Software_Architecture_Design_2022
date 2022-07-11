import UserDataConnection from '../services/userDataConnection.js';
import AuthServiceConnection from '../services/authServiceConnection.js';

export default class InfoHandler {
    constructor(register){
        this.userDataConnection = new UserDataConnection();
        this.authConn = new AuthServiceConnection();
        this.register = register;
    }
    async userDataRequest(username, id, token) {
        if(username == null || id == null || token == null)
            return {ok:false}
     
        if(await this.authConn.checkToken(id, token) == false)
            return {ok:false};
        
        const userDataReq = await this.userDataConnection.userDataRequest(username);
        
        if(userDataReq.ok == false)
            return {ok:false};
        
        return {ok:true, id: userDataReq.id, userName: userDataReq.userName, puk: userDataReq.puk};
    }

    async userDataIdRequest(idR, id, token) {
        if(idR == null || id == null || token == null)
            return {ok: false}
        
        if(await this.authConn.checkToken(id, token) == false)
            return {ok:false};
                
        const userDataReq = await this.userDataConnection.userDataIdRequest(idR);
            
        if(userDataReq.ok == false)
            return {ok:false};
           
        return {ok:true, id: userDataReq.id, userName: userDataReq.userName, puk: userDataReq.puk};
    }
}