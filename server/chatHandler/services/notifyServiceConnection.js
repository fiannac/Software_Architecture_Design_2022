import { response } from 'express';
import fetch from 'node-fetch';

const msgServerIp = '192.168.1.18'
const msgServerPort = '8892' 

export default class msgSerivceConnection{
    async insert(id, notifyToken){
        var resp = await fetch(`http://${msgServerIp}:${msgServerPort}/insert`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                notifyToken: notifyToken
            })
        })
        try{
        resp = await resp.json()
        } catch (e){
            console.log("Errore: ", e)
        }
        return resp;
    }

    async delete(id){
        var resp = await fetch(`http://${msgServerIp}:${msgServerPort}/delete`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id:id
            })
        })
        try{
        resp = await resp.json()
        } catch (e){
            console.log("Errore: ", e)
        }
        return resp;
    }

    async notify(id){
        var resp = await fetch(`http://${msgServerIp}:${msgServerPort}/notify`, 
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id:id
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

