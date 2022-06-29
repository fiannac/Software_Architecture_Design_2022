import Chat from './chat.js'
import User from './user.js'

import { setConnState, setLoggedState } from "../App.js";
import { useReducer } from 'react';

import {notifyChat,notifyMessage} from '../View/mainPage.js';

export default class loggedUser{

    constructor(){
        this.connState = false
        this.loggedState = false 

        this.chats = new Map()
    }

    setConnState(state){
        this.connState = state
        setConnState(this.connState)
    }

    setLoggedState(state){
        this.loggedState = state
        setLoggedState(this.loggedState)
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
    setToken(token){
        this.token = token
    }

    createChat(id, username, puk){
        const user = new User(id, username, puk)
        const chat = new Chat('0', '0', user)
        this.chats.set(id,chat)
        
        notifyChat(id, username)
    }
    createMessage(text, id, timestamp){
        const chat = this.chats.get(id);
        chat.addMessage(text,'0','0');
        notifyMessage(id,text)
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
}