import Chat from './chat.js'
import User from './user.js'

export default class loggedUser{

    constructor(){
        this.connState = false
        this.loggedState = false 

        this.chats = new Map()
    }

    setConnState(state){
        this.connState = state
        if(this.observerState != null){
            this.observerState(this.connState, this.loggedState)
        }
    }

    setLoggedState(state){
        this.loggedState = state
        if(this.observerState != null){
            this.observerState(this.connState, this.loggedState)
        }
    }

    setId(id){
        this.id = id
    }
    setUser(usr){
        this.userName = usr
    }
    setPsw(psw){
        this.password = psw
    }
    setPrk(prk){
        this.prk = prk
    }
    setPuk(puk){
        this.puk = puk
    }
    setToken(token){
        this.token = token
    }

    createChat(id, username, puk){
        const user = new User(id, username, puk)
        const chat = new Chat('0', user)
        this.chats.set(id,chat)
        if(this.observerChat != null){
            this.observerChat(this.chats)
        }
    }

    createMessage(text, id, timestamp, type){
        const chat = this.chats.get(id);
        chat.addMessage(text,timestamp, type);
        chat.setTimestamp(timestamp);
        if(this.observerChat != null){
            this.observerChat(this.chats)
        }
    }
    getChat(idMittente){
        return this.chats.get(idMittente).msgs();
    }

    getUserPbk(idMittente){
        return this.chats.get(idMittente).getPubk()
    }
    getUserUserName(idMittente){
        return this.chats.get(idMittente).getUserName()
    }

    chatExists(id){
        return this.chats.has(id)
    }

    subscribeChatObserver(observer){
        this.observerChat = observer
        this.observerChat(this.chats)
    }
    unsubscribeChatObserver(){
        this.observerChat = null
    }

    subscribeStateObserver(observer){
        this.observerState = observer
        this.observerState(this.loggedState)
    }  
    unsubscribeStateObserver(){
        this.observerState = null
    }

    deleteChat(id){
        this.chats.delete(id)
        if(this.observerChat != null){
            this.observerChat(this.chats)
        }
    }

}