import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import LoginPage from './View/loginPage.js'
import MainPage from './View/mainPage.js';
import Controller from './Controller/Controller.js';
import { SafeAreaView } from 'react-native-safe-area-context';


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
    const app = this
    
    this.timer = setInterval(function(){
      if(this.state.connected == false){
        this.controller.reconnect()
      }
    }.bind(this), 1000
    )
    
  }

  connect(){
    if(!this.state.connected){
      this.controller = new Controller()
    }
  }
  
  componentDidMount(){
    this.controller.subscribeStateObserver(this.notify.bind(this))
    this.controller.rememberMeLogin()
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
        
        <View style = {{flex: 1,justifyContent: "center", paddingHorizontal:10}}>
          <Text style = {{textAlign: 'center', paddingBottom: 50}}>
            Connessione in corso...
          </Text>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    if(!this.state.logged){
      return(
        <SafeAreaView style = {{flex:1}}>
          <LoginPage controller={this.controller}/>
        </SafeAreaView>
      );
      } else {
      return(
        <SafeAreaView style = {{flex:1}}>
          <MainPage controller = {this.controller}/>
        </SafeAreaView>
      );
    }
    
  }
}

