import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export default class LoginController {
    constructor(network, loggedUser, crypto, createChat, storage) {
        this.network = network 
        this.loggedUser = loggedUser
        this.createChat = createChat
        this.crypto = crypto
        this.storage = storage
    }

    //richiamata a partire dalla loginPress della loginPage
    async login(user, Opsw, rememberMe){
        const psw = await this.crypto.hashPsw(Opsw)
        const notifyToken = await this.registerForPushNotificationsAsync()
        const reply = await this.network.loginRequest(user,psw,notifyToken);
        if(reply.ok == false){
            return false
        }

        this.loggedUser.setId(reply.id)
        this.loggedUser.setToken(reply.token)
        this.loggedUser.setPsw(Opsw)
        this.loggedUser.setUser(user)
        this.loggedUser.setPuk(reply.puk)

        //risposta alla richiesta di login restutisce anche chiave privata cryptata con psw utente.
        //decypting prk con psw utente per memorizzare prk in locale in chiaro. 
        const prk = await this.crypto.decryptPrk(reply.prk, Opsw)
        this.loggedUser.setPrk(prk)

        if(this.loggedUser.loggedState != true){
            
            const chats = await this.storage.loadChats(reply.id);
            for(let chat of chats){
                this.loggedUser.createChat(chat.idDestinatario, chat.userName, chat.puk)
                const msg = await this.storage.getMessagesByChat(reply.id, chat.idDestinatario)
                for(let m of msg){
                    this.loggedUser.createMessage(m.text, chat.idDestinatario, m.timestamp, m.idMess)
                }
            }
        }
        //se utente non ha effettuato logout e remember me==true

        //ricezione dei messaggi non consegnati
        const msgs = await this.network.rcvOldMsgReq(reply.id, reply.token); 
        
        for(let msg of msgs.list){
            const id = reply.id
            if(!this.loggedUser.chats.has(msg.sender)){
                //non esiste chat con il sender del msg, è creata usando il suo id
                const res = await this.createChat.createChatFromId(msg.sender)
            } 

            // per ciascuno dei messaggi non ancora consegnati ricavo la chiave di cifratura, li aggiungo ai messaggi e li storo
            // key è cifrata dal mittente con la chiave pubblica del loggedUser 
            const key = await this.crypto.decryptKey(msg.keyD, this.loggedUser.prk)
            const text = await this.crypto.decryptMsg(msg.text, key);
            this.loggedUser.createMessage(text, msg.sender, msg.timestamp, 'rcv')
            this.storage.insertMessage(id,msg.sender, text, msg.timestamp, 'rcv')
        }
        
        // richiesta di autenticazione del canale di comunicazione
        this.network.authWSRequest(reply.id, reply.token);
        if(rememberMe == true){
            this.storage.storeAuthData(user, Opsw)
        }
        return true;
    }

    // funzione per effettuare il logout col reset di tutti gli attributi di loggedUser
    async logout(){
        const res = await this.network.logoutRequest(this.loggedUser.id, this.loggedUser.token);
        this.loggedUser.setId('')
        this.loggedUser.setToken('')
        this.loggedUser.setPsw('')
        this.loggedUser.setUser('')
        this.loggedUser.setPrk('')
        this.loggedUser.setLoggedState(false)
        this.loggedUser.chats.clear()
        this.storage.clearAuthData()
        return true;
    }

    
    async rememberMeLogin(){
        const DBquery = await this.storage.getAuthData()
        if(DBquery.length == 0){
            return false
        }

        if(DBquery[0].valid == 1){
            const user = DBquery[0].userName
            const psw = DBquery[0].psw
            const res = await this.login(user, psw, false)
        }
       
    }

    //funzione che returna token univoco per il dispositivo utilizzato
    async registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
    }
}