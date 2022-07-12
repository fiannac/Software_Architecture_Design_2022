import ChatController from "./ChatController";
import LoginController from "./LoginController";
import MessageController from "./MessageController";
import RegistrationController from "./RegistrationController";
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

        this.ChatController = new ChatController(this.NetworkAccess, this.loggedUser, this.storage)
        this.LoginController = new LoginController(this.NetworkAccess, this.loggedUser, this.crypto, this.ChatController, this.storage)
        this.MessageController = new MessageController(this.NetworkAccess, this.loggedUser, this.crypto, this.ChatController, this.storage)
        this.RegistrationController = new RegistrationController(this.NetworkAccess, this.crypto, this.storage)
    }
    
    updateConnectionState(val){
        return this.loggedUser.setConnState(val)
    }

    updateLoggedState(val){
        return this.loggedUser.setLoggedState(val)
    }

    async createChatFromUsername(username){
        return await this.ChatController.createChatFromUsername(username)
    }
    async createChatFromId(id){
        return await this.ChatController.createChatFromId(id)
    }
    async login(user, psw, rememberMe){
        return this.LoginController.login(user,psw, rememberMe)
    }
    rcvMsg(text, usernameDest, idMittente,timestamp){
        return this.MessageController.rcvMsg(text, usernameDest, idMittente,timestamp)
    }
    async registerUser(user, email, psw){
        return await this.RegistrationController.registerUser(user,email,psw)
    }
    async inviaMessaggio(dest, text){
        return this.MessageController.inviaMessaggio(dest,text)
    }
    async logout(){
        this.LoginController.logout()
    }

    async bloccaUtente(idDaBloccare){
        const id = this.loggedUser.id
        const token = this.loggedUser.token
        return await this.ChatController.bloccaUtente(id, token, idDaBloccare)
    } 

    async rememberMeLogin(){
        return this.LoginController.rememberMeLogin()
    }

    async deleteChat(id){
        return await this.ChatController.deleteChat(id)
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

    connect(){
        this.NetworkAccess.connect()
    }

    resume(){
        if(this.loggedUser.loggedState == true){
            this.NetworkAccess.authWSRequest(this.loggedUser.id, this.loggedUser.token)
            this.MessageController.getStoredMsg(this.loggedUser.id, this.loggedUser.token)
        }
    }

    disconnect(){
        this.NetworkAccess.disconnect()
        this.loggedUser.setConnState(false)
    }
}