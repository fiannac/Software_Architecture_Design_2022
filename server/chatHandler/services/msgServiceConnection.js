import { response } from 'express';
import fetch from 'node-fetch';

const msgServerIp = 'localhost';
const msgServerPort = '8890' 

export default class msgSerivceConnection{
    async storeMsg(idMittente, idDestinatario, text, keyM, keyD, timestamp){
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
                keyM: keyM,
                keyD: keyD,
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
    
    async storedMsgRequest(idDestinatario, token, timestamp){
        var resp = await fetch(`http://${msgServerIp}:${msgServerPort}/storedMsgRequest`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idDestinatario: idDestinatario,
                token: token,
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

    async blockUser(id, idBlocked){
        var resp = await fetch(`http://${msgServerIp}:${msgServerPort}/blockUser`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                idBlocked: idBlocked
            })
        })
        try{
            resp = await resp.json()
        } catch (e){
            console.log("Errore: ", e)
        }
        return resp;
    }

    async checkBlock(id, idBlocked){
        var resp = await fetch(`http://${msgServerIp}:${msgServerPort}/checkBlock`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                idBlocked: idBlocked
            })
        })
        try{
            resp = await resp.json()
            return resp.ok;
        } catch (e){
            console.log("Errore: ", e)
            return null;
        }
    }
}

