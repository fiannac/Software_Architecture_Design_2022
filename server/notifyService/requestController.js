import DAO from './DAO.js'
import fetch from 'node-fetch';

export default class RequestController{
    constructor(){
        this.dao = new DAO();
    }

    async deleteRequest(req, res){
        this.dao.deleteToken(req.body.id);
    }

    async insertRequest(req, res){
        this.dao.storeToken(req.body.id, req.body.notifyToken);
    }

    async notifyRequest(req, res){
        const token = await this.dao.fetchToken(req.body.id)
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