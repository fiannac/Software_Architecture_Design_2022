import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, Button, TextInput } from 'react-native';

import connectionHandler from './Controller/connectionHandler.js';

import LoginPage from './Views/LoginPage.js'
import MainPage from './Views/MainPage.js'


var conn =  null;
var refreshIntervalId = null;


export default function App() {
  const [logged, setLogged] = useState(false);
  const [connected, setConnected] = useState(false);
  const [authError, setAuthError] = useState(false);

  useEffect(()=>{
    if(!connected){
      console.log("connessione...")
      conn = new connectionHandler(setLogged, setConnected, setAuthError);
    } else {
      clearInterval(refreshIntervalId);
    }
  }, [connected])


  if(!connected){
    refreshIntervalId = setInterval(()=>
      {conn = new connectionHandler(setLogged, setConnected, setAuthError);}
    ,1000)
    return(
      <Text> Connessione in corso...</Text>
    )
  }

  if(logged){
    return(
      <MainPage conn = {conn} setLogged = {setLogged}></MainPage>
    )
  } else {
    return(
      <LoginPage conn = {conn} authError = {authError}></LoginPage>
    )
  }
}