import CreateChatController from "./CreateChatController";
import LoginController from "./LoginController";
import RcvMsgController from "./RcvMsgController";
import RegistrationController from "./RegistrationController";
import SendMessageController from "./SendMsgController";
import NetworkAccess from "../Services/networkAccess.js"
import loggedUser from "../Model/loggedUser";
import Crypto from '../Services/cryptoService.js';
import LocalStorage from '../Services/LocalStorage.js';

export default class Controller{
    constructor(){
        this.loggedUser = new loggedUser()

        this.NetworkAccess = new NetworkAccess(this)
        this.storage = new LocalStorage()
        this.crypto = new Crypto()

        this.CreateChatController = new CreateChatController(this.NetworkAccess, this.loggedUser, this.storage)
        this.LoginController = new LoginController(this.NetworkAccess, this.loggedUser, this.crypto, this.CreateChatController, this.storage)
        this.RcvMsgController = new RcvMsgController(this.NetworkAccess, this.loggedUser, this.crypto, this.CreateChatController, this.storage)
        this.RegistrationController = new RegistrationController(this.NetworkAccess, this.crypto, this.storage)
        this.SendMessageController = new SendMessageController(this.NetworkAccess, this.loggedUser, this.crypto, this.storage)
    }

    reconnect(){
        this.NetworkAccess.reconnect()
    }

    subscribeChatObserver(observer){
        this.loggedUser.subscribeChatObserver(observer)
    }

    unsubscribeChatObserver(){
        this.loggedUser.unsubscribeChatObserver()
    }

    subscribeStateObserver(observer){
        this.loggedUser.subscribeStateObserver(observer)
    }
    
    unsubscribeStateObserver(){
        this.loggedUser.unsubscribeStateObserver()
    }
    
    updateConnectionState(val){
        return this.loggedUser.setConnState(val)
    }

    updateLoggedState(val){
        return this.loggedUser.setLoggedState(val)
    }

    async createChatFromUsername(username){
        return await this.CreateChatController.createChatFromUsername(username)
    }
    async createChatFromId(id){
        return await this.CreateChatController.createChatFromId(id)
    }
    async login(user, psw, rememberMe){
        return this.LoginController.login(user,psw, rememberMe)
    }
    rcvMsg(text, usernameDest, idMittente,timestamp){
        return this.RcvMsgController.rcvMsg(text, usernameDest, idMittente,timestamp)
    }
    async registerUser(user, email, psw){
        return await this.RegistrationController.registerUser(user,email,psw)
    }
    async inviaMessaggio(dest, text){
        return this.SendMessageController.inviaMessaggio(dest,text)
    }
    async logout(){
        this.LoginController.logout()
    }

    async bloccaUtente(idDaBloccare){
        const id = this.loggedUser.id
        const token = this.loggedUser.token
        return await this.CreateChatController.bloccaUtente(id, token, idDaBloccare)
    } 

    async rememberMeLogin(){
        return this.LoginController.rememberMeLogin()
    }
}