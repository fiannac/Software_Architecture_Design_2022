import Chat from './chat.js'
import User from './user.js'

export default class loggedUser{

    constructor(){
        this.connState = false //stato di connessione
        this.loggedState = false //stato di login
        this.chats = new Map() //lista delle chat associate
    }

    setConnState(state){
        this.connState = state
        if(this.observerState != null){
            // Richiama la funzione notify dell'app
            this.observerState(this.connState, this.loggedState)
        }
    }

    setLoggedState(state){
        this.loggedState = state
        if(this.observerState != null){
            // Richiama la funzione notify dell'app
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

    //funzione di creazione chat
    createChat(id, username, puk){
        //crea un riferimento ad un nuovo utente
        const user = new User(id, username, puk)
        //crea chat con utente
        const chat = new Chat('0', '0', user)
        //aggiunge la chat alla lista delle chat (per l'id utente)
        this.chats.set(id,chat)
        //notifica l'observer nella view
        if(this.observerChat != null){
            this.observerChat(this.chats)
        }
    }

    //funzione di creazione messaggio
    createMessage(text, id, timestamp, type){
        const chat = this.chats.get(id);
        //aggiunge messaggio alla chat
        chat.addMessage(text,timestamp, type);

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

    //"observer" passato come parametro è la funzione di notify della main page
    subscribeChatObserver(observer){
        this.observerChat = observer
        this.observerChat(this.chats)
    }

    unsubscribeChatObserver(){
        this.observerChat = null
    }

    //"observer" passato come parametro è la funzione di notify dell'app
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