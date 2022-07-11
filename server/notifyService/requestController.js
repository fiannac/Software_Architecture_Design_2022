import DAO from './DAO.js'
import fetch from 'node-fetch';

export default class RequestController{
    constructor(){
        this.dao = new DAO();
    }

    async deleteRequest(id){
        await this.dao.deleteToken(id);
    }

    async insertRequest(id, notifyToken){
        await this.dao.storeToken(id, notifyToken);
    }

    async notifyRequest(id){
        const token = await this.dao.fetchToken(id)
        if(token){
            this.sendPushNotification(token);
        }
    }
    

    async sendPushNotification(expoPushToken) {
        const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Hai ricevuto un nuovo messaggio',
        body: 'Clicca per visualizzarlo',
        data: { someData: 'goes here' },
        };
    
        await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
        });
    }

}