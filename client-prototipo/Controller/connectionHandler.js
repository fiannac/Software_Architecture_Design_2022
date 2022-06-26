import {useState} from 'react'
import {setConnect, setLogin, } from '../Model/authReducer'

export default class ConnectionHandler {
  constructor(ws = 'ws://localhost:8888/') {
    this.ws = new WebSocket(ws);
    this.ws.onopen = () => {setConnect()}; 
    this.ws.onclose = () => {setConnect()};
    this.ws.onmessage = ({data}) => {
      const msg = JSON.parse(data);
      if(msg?.type == 'login' && msg?.ok)
        setLogin(true);
      else if(msg?.type == 'login' && !msg?.ok)
        setConnect();
    }
  }

  login(usr, psw){
    const msg = JSON.stringify({type: 'login', usr: username, psw: psw});
    this.ws.send(msg);
  }



}