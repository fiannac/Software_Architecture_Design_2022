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
        const prk = await this.crypto.decryptPrk(reply.prk, Opsw)
        this.loggedUser.setPrk(prk)

        var lastTimestamp = new Date('2000-01-01T00:00:00.000Z');
        const chats = await this.storage.loadChats(reply.id);
        for(let chat of chats){
            console.log(chat)
            this.loggedUser.createChat(chat.idDestinatario, chat.userName, chat.puk)
            const msg = await this.storage.getMessagesByChat(reply.id, chat.idDestinatario)
            for(let m of msg){
                this.loggedUser.createMessage(m.text, chat.idDestinatario, m.timestamp, m.idMess)
                if(new Date(m.timestamp) > lastTimestamp){
                    lastTimestamp = new Date(m.timestamp)
                }
            }
        }

        const msgs = await this.network.rcvOldMsgReq(reply.id, reply.token, lastTimestamp.toString()); 
        for(let msg of msgs.list){
            const id = reply.id

            if(!this.loggedUser.chats.has(msg.sender)){
                const res = await this.createChat.createChatFromId(msg.sender)
            } 
            const key = await this.crypto.decryptKey(msg.keyD, this.loggedUser.prk)
            console.log(msg.text)
            const text = await this.crypto.decryptMsg(msg.text, key);
            this.loggedUser.createMessage(text, msg.sender, msg.timestamp, 'rcv')
            this.storage.insertMessage(id,msg.sender, text, msg.timestamp, 'rcv')
        }
            
        this.network.authWSRequest(reply.id, reply.token);
        if(rememberMe == true){
            this.storage.storeAuthData(user, Opsw)
        }
        return true;
    }

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
        console.log(DBquery)
        if(DBquery.length == 0){
            return false
        }

        if(DBquery[0].valid == 1){
            console.log('login remember me')
            const user = DBquery[0].userName
            const psw = DBquery[0].psw
            const res = await this.login(user, psw, false)
            console.log(res)
        }
        else {
            console.log('no login remember me')
        }
    }


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
          console.log(token);
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