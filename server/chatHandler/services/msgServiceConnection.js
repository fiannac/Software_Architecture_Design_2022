import { response } from 'express';
import fetch from 'node-fetch';

const msgServerIp = '192.168.1.7'
const msgServerPort = '8890' 

export default class msgSerivceConnection{
    async storeMsg(idMittente, idDestinatario, text, timestamp){
        var resp = await fetch(`http://${msgServerIp}:${msgServerPort}/storeMsg`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idMittente: idMittente,
                idDestinatario: idDestinatario,
                text: text,
                timestamp: timestamp
            })
        })
        try{
        resp = await resp.json()
        } catch (e){
            console.log("Errore: ", e)
        }
        return resp;
    }
    
    async storedMsgRequest(idDestinatario){
        var resp = await fetch(`http://${msgServerIp}:${msgServerPort}/storedMsgRequest`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idDestinatario: idDestinatario
            })
        })
        try{
            resp = await resp.json()
        } catch (e){
            console.log("Errore: ", e)
        }
        return resp;
    }
}

