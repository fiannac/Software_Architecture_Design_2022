import CreateChatController from "./CreateChatController";
import LoginController from "./LoginController";
import RcvMsgController from "./RcvMsgController";
import RegistrationController from "./RegistrationController";
import SendMessageController from "./SendMsgController";
import NetworkAccess from "../Services/networkAccess.js"
import loggedUser from "../Model/loggedUser";

export default class Controller{
    constructor(){
        this.NetworkAccess = new NetworkAccess(this)
        this.loggedUser = new loggedUser()

        this.CreateChatController = new CreateChatController(this.NetworkAccess, this.loggedUser)
        this.LoginController = new LoginController(this.NetworkAccess, this.loggedUser)
        this.RcvMsgController = new RcvMsgController(this.NetworkAccess, this.loggedUser)
        this.RegistrationController = new RegistrationController(this.NetworkAccess)
        this.SendMessageController = new SendMessageController(this.NetworkAccess, this.loggedUser)
    }

    createChat(username){
        this.CreateChatController.createChat(username)
    }
    async login(user, psw){
        this.LoginController.login(user,psw)
    }
    rcvMsg(text, usernameDest, timestamp){
        this.RcvMsgController.rcvMsg(text, usernameDest, timestamp)
    }
    registerUser(user, email, psw){
        this.RegistrationController.registerUser(user,email,psw)
    }
    inviaMessaggio(dest, text){
        this.SendMessageController.inviaMessaggio(dest,text)
    }

}