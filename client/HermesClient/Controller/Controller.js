import CreateChatController from "./CreateChatController";
import LoginController from "./LoginController";
import RcvMsgController from "./RcvMsgController";
import RegistrationController from "./RegistrationController";
import SendMessageController from "./SendMsgController";
import NetworkAccess from "../Services/networkAccess.js"
import loggedUser from "../Model/loggedUser";
import Crypto from '../Services/crypto.js';

export default class Controller{
    constructor(){
        this.NetworkAccess = new NetworkAccess(this)
        this.loggedUser = new loggedUser()

        this.crypto = new Crypto()

        this.CreateChatController = new CreateChatController(this.NetworkAccess, this.loggedUser)
        this.LoginController = new LoginController(this.NetworkAccess, this.loggedUser, this.crypto)
        this.RcvMsgController = new RcvMsgController(this.NetworkAccess, this.loggedUser, this.crypto)
        this.RegistrationController = new RegistrationController(this.NetworkAccess, this.crypto)
        this.SendMessageController = new SendMessageController(this.NetworkAccess, this.loggedUser, this.crypto)
    }

    async createChat(username){
        this.CreateChatController.createChat(username)
    }
    async login(user, psw){
        this.LoginController.login(user,psw)
    }
    rcvMsg(text, usernameDest, timestamp){
        this.RcvMsgController.rcvMsg(text, usernameDest, timestamp)
    }
    async registerUser(user, email, psw){
        return await this.RegistrationController.registerUser(user,email,psw)
    }
    async inviaMessaggio(dest, text){
        this.SendMessageController.inviaMessaggio(dest,text)
    }

}