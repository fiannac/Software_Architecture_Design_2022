import React from 'react';
import { Text, View, ActivityIndicator, AppState } from 'react-native';
import LoginPage from './View/loginPage.js'
import MainPage from './View/mainPage.js';
import Controller from './Controller/Controller.js';
import { SafeAreaView } from 'react-native-safe-area-context';


export default class App extends React.Component {
  constructor(){
    super()
    //stato dell'app, utente connesso/loggato
    this.state = {      
      connected: false,
      logged: false
    }
    setConnState = this.setConnState
    setLoggedState = this.setLoggedState

    //istanziazione di un controller (classe facade del package controller)
    this.controller = new Controller() 
    const app = this
    
    
    //funzione che setta un intervallo per nuovo tentativo di connessione
    this.timer = setInterval(function(){  
      if(this.state.connected == false){
        this.controller.reconnect()
      }
    }.bind(this), 1000
    )
  }

  //funzione per la riconnessione
  connect(){
    if(!this.state.connected){
      this.controller = new Controller()
    }
  }
  

  //funzione chiamata quando il componente App viene costruito
  componentDidMount(){
    //Sottoscrizione per il rerendering qualora cambino i dati del model
    this.controller.subscribeStateObserver(this.notify.bind(this))
    // Funzione per effettuare il login automatico
    this.controller.rememberMeLogin() 
    // Aggiunta di un listener per implementare la logica di riconnessione
    const subscription = AppState.addEventListener("change", nextAppState => {
      if(nextAppState == "background"){
        this.controller.disconnect()
      } 
    });
  
  }

  componentWillUnmount(){
  //Alla distruzione del componente viene effettuata la revoca di sottoscrizione
    this.controller.unsubscribeStateObserver()
  }

  //Funzione richiamata dal logged-user per settare lo stato
  notify(connected, logged){
    const newState = {
      connected: connected,
      logged: logged
    }
    this.setState(newState)
  }

  render(){
    
    if(!this.state.connected){
      //return se lo stato non è connesso
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
        //return se l'utente non è loggato
        <SafeAreaView style = {{flex:1}}>
          <LoginPage controller={this.controller}/>
        </SafeAreaView>
      );
      } else {
      return(
        // return se l'utente è loggato
        <SafeAreaView style = {{flex:1}}>
          <MainPage controller = {this.controller}/>
        </SafeAreaView>
      );
    }
    
  }
}

