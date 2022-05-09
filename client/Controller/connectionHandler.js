import {useState} from 'react'


export default class connectionHandler {
  constructor(setLogged, setConnected, setAuthError) {
    this.ws = new WebSocket('ws://localhost:8080/');
    this.ws.onopen = () => {setConnected(true)}
    this.ws.onclose = () => {setConnected(false); setLogged(false)}
    this.ws.onmessage = ({data}) => {
      const msg = JSON.parse(data);
      if(msg?.type == 'login' && msg?.ok)
        setLogged(true)
      else if(msg?.type == 'login' && !msg?.ok)
        setAuthError(true)
    }
  }



}