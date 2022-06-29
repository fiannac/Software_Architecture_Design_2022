import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { touchProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from './View/loginPage.js'
import RegistrationPage from './View/registrationPage.js';
import MainPage from './View/mainPage.js';
import ChatPage from './View/chatPage.js';

import Controller from './Controller/Controller.js';

import LocalStorage from './Services/LocalStorage.js';
import Crypto from './Services/crypto.js';
import networkAccess from './Services/networkAccess.js';
import * as SQLite from 'expo-sqlite';


export let setLoggedState
export let setConnState

const LoginStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      connected: false,
      logged: false,
    }
    setConnState = this.setConnState
    setLoggedState = this.setLoggedState

    this.controller = new Controller()
  }

  setLoggedState = (state) =>{
    this.setState({logged: state})
  }
  setConnState = (state) =>{
    this.setState({connected:state})
  }

  render(){
    if(!this.state.connected){
      return(
        <Text>
          Impossibile connettersi al server, controlla la connessione...
        </Text>
      )
    }

    if(!this.state.logged){
      return (
      <NavigationContainer>
        <LoginStack.Navigator initialRouteName="LoginPage">
          <LoginStack.Screen name="LoginPage" component={LoginPage} initialParams={{controller : this.controller}}/>
          <LoginStack.Screen name="RegisterPage" component = {RegistrationPage} initialParams={{controller : this.controller}}/>
        </LoginStack.Navigator>
      </NavigationContainer>
      );
    } else {
      return(
        <MainPage controller = {this.controller}/>
      );
    }
    
  }
}

