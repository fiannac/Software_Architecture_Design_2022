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

    async registerRequest(req, res) {
        return this.authHandler.registerRequest(req, res);
    }
    async loginRequest(req, res) {
        return this.authHandler.loginRequest(req, res);
    }
    async logoutRequest(req, res) {
        return this.authHandler.logoutRequest(req, res);
    }
    async checkToken(id, token) {
        return this.authHandler.checkToken(id, token);
    }

    async activateAccount(req, res){
        return this.authHandler.activateAccount(req, res);
    }

    async userDataRequest(req, res) {
        return this.infoHandler.userDataRequest(req, res);
    }
    async userDataIdRequest(req, res) {
       return this.infoHandler.userDataIdRequest(req, res);
    }

    async storedMsgRequest(req, res){
        return this.msgHandler.storedMsgRequest(req, res);
    }   
    async msgRequest(req, res) {
        return this.msgHandler.msgRequest(req, res);
    }

    async blockUserRequest(req, res){
        return this.msgHandler.blockUserRequest(req, res);     
    }

    async authWs(msg, ws){
        return this.authHandler.authWs(msg, ws);
    }

    async deleteWs(msg, ws){
        return this.authHandler.deleteWs(msg, ws);
    }

}