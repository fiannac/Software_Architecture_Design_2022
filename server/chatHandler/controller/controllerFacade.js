import AuthHandler from "./authHandler.js";
import InfoHandler from "./infoHandler.js";
import MsgHandler from "./msgHandler.js";
import ConnectionRegister from "../users/connectionsRegister.js";

export default class ControllerFacade {
    constructor(){
        this.register = new ConnectionRegister();
        this.authHandler = new AuthHandler(this.register);
        this.infoHandler = new InfoHandler(this.register);
        this.msgHandler = new MsgHandler(this.register);
    }

    async registerRequest(userName, password, email, puk, prk) {
        return this.authHandler.registerRequest(userName, password, email, puk, prk);
    }
    async loginRequest(userName, password, notifyToken) {
        return this.authHandler.loginRequest(userName, password, notifyToken);
    }
    async logoutRequest(id,token) {
        return this.authHandler.logoutRequest(id,token);
    }
    async checkToken(id, token) {
        return this.authHandler.checkToken(id, token);
    }
    async activateAccount(id){
        return this.authHandler.activateAccount(id);
    }
    async userDataRequest(username, id, token) {
        return this.infoHandler.userDataRequest(username, id, token);
    }
    async userDataIdRequest(idR, id, token) {
       return this.infoHandler.userDataIdRequest(idR, id, token);
    }
    async storedMsgRequest(id, token){
        return this.msgHandler.storedMsgRequest(id, token);
    }   
    async msgRequest(idM, idD, token, text, timestamp, keyD) {
        return this.msgHandler.msgRequest(idM, idD, token, text, timestamp, keyD);
    }
    async blockUserRequest(id, idBlocked, token){
        return this.msgHandler.blockUserRequest(id, idBlocked, token);     
    }
    async authWs(msg, ws){
        return this.authHandler.authWs(msg, ws);
    }
    async deleteWs(msg, ws){
        return this.authHandler.deleteWs(msg, ws);
    }
}