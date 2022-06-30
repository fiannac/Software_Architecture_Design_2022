import React from 'react';
import { Text } from 'react-native';
import LoginPage from './View/loginPage.js'
import MainPage from './View/mainPage.js';
import Controller from './Controller/Controller.js';

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

  componentDidMount(){
    this.controller.subscribeStateObserver(this.notify.bind(this))
  }

  componentWillUnmount(){
    this.controller.unsubscribeStateObserver()
  }

  notify(connected, logged){
    const newState = {
      connected: connected,
      logged: logged
    }

    this.setState(newState)
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

