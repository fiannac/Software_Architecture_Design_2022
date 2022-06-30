import React from 'react';
import { Text } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from './View/loginPage.js'
import MainPage from './View/mainPage.js';

import Controller from './Controller/Controller.js';


export let setLoggedState
export let setConnState

const LoginStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();




export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      connected: false,
      logged: false
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
      return(
        <LoginPage controller={this.controller}/>
      );
      } else {
      return(
        <MainPage controller = {this.controller}/>
      );
    }
    
  }
}

