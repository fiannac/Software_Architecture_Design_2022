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
        this.usr = usr
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

    createChat(id, username, pk){
        const user = new User(id, username, pk)
        const chat = new Chat('0', '0', user)
        this.chats.set(username,chat)

        notifyChat(username)
    }
    createMessage(text, usernameDest, timestamp){
        const chat = this.chats.get(usernameDest);
        chat.addMessage(text,'0','0');

        notifyMessage(usernameDest,text)
    }
    getChat(usernameDest){
        return this.chats.get(usernameDest).msgs();
    }
    
}