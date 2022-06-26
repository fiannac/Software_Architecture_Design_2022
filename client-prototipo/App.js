import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, Button, TextInput } from 'react-native';

import ConnectionHandler from './Controller/connectionHandler.js';

import LoginPage from './Views/LoginPage.js'
import MainPage from './Views/MainPage.js'

import {connectionState} from './Model/authReducer'
import {useSelector, Provider } from 'react-redux';

import {createStore} from "redux"
import {setConnect} from './Model/authReducer'

export const state = createStore(connectionState);
var conn = new ConnectionHandler();;


function AppWrapper() {
  const connected = useSelector(state => state.connected)
  const logged = useSelector(state => state.logged)

  /*
    trova un modo per gestire la riconnessione
  */

  if(!connected){
    return(
      <Text> Connessione in corso...</Text>
    )
  }

  if(logged){
    return(
      <MainPage conn = {conn} />
    )
  } else {
    return(
      <LoginPage conn = {conn} />
    )
  }
}

export default function App() {
  return (
    <Provider store={state}>
      <AppWrapper />
    </Provider>
  );
}