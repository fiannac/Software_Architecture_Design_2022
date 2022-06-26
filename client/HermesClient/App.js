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

import networkAccess from './Services/networkAccess.js'

export let setLoggedState
export let setConnState

const LoginStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const networkService = new networkAccess();



export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      connected: false,
      logged: false,
      chats: [1,2,3,4,5]
    }
    setConnState = this.setConnState
    setLoggedState = this.setLoggedState


    console.log(networkService.loginRequest('zio', 'pera'))


    const f = () => {
      console.log("wewe")
      this.setState({chats: [0,0,0,0,0,0,0,0]})
    }

    let myTimeout = setTimeout(f, 1000);
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
          <LoginStack.Screen name="LoginPage" component={LoginPage} initialParams={{val : 1}}/>
          <LoginStack.Screen name="RegisterPage" component = {RegistrationPage} />
        </LoginStack.Navigator>
      </NavigationContainer>
      );
    } else {
      return(
        <NavigationContainer>
        <MainStack.Navigator initialRouteName="MainPage">
          <MainStack.Screen name="MainPage" component={MainPage} initialParams={{chats:this.state.chats}}/>
          <MainStack.Screen name='ChatPage' component={ChatPage} initialParams={{chats:this.state.chats}}/>
        </MainStack.Navigator>
      </NavigationContainer>
      );
    }
    
  }
}

