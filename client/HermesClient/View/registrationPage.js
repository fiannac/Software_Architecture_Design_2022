import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView } from 'react-native';


export default class RegistrationPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      errore: false
    }
    this.usrname = ''
    this.psw = ''
    this.psw2= ''
    this.mail = ''
    this.controller = props.controller
    this.registratiButton = this.registratiButton.bind(this);
  }

  async registratiButton(){
    /*
    //faccio il controllo di validità della psw
    //controlla se la password è di almeno 8 caratteri e ha una lettera maiuscola e un numero
    if(this.psw.length < 8 || !this.psw.match(/[A-Z]/i) || !this.psw.match(/[0-9]/i)){
      this.setState({errore: true})
      alert('Password non valida')
      return
    }
    //controlla se la mail è valida
    if(!this.mail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
      this.setState({errore: true})
      alert('Mail non valida')
      return
    }
    //controlla se l'username è valido
    if(!this.usrname.match(/^[a-zA-Z0-9]+$/)){
      this.setState({errore: true})
      alert('Username non valido')
      return
    }
    //controlla se la password e la password di conferma sono uguali
    if(this.psw != this.psw2){
      this.setState({errore: true})
      alert('Password non uguali')
      return
    }
    */
    //controlla se l'username è già stato usato

    //se non ci sono errori, registro l'utente    
    const res = await this.controller.registerUser(this.usrname, this.mail, this.psw)
    
    if(res == true){
      this.props.setRegisterPage(false)
    } else {
      this.setState({errore:true})
    }
  }

  render(){
    return (
        <SafeAreaView>
          
          <Text>Registrati con username e password</Text>
          <TextInput onChangeText = {(value) => {this.mail = value}} style={styles.inserimentoTestoMail} placeholder="Inserisci mail"/>
          <TextInput onChangeText = {(value) => {this.usrname = value}} style={styles.inserimentoTestoUser} placeholder='Inserisci nome utente'/>
          <TextInput onChangeText = {(value) => {this.psw = value}} secureTextEntry = {true} style={styles.inserimentoTestoPsw} placeholder='Inserisci password'/>
          <TextInput onChangeText = {(value) => {this.psw2 = value}} secureTextEntry = {true} style={styles.inserimentoTestoPsw} placeholder='Conferma password'/>

          <View style={styles.bottone}>
            <Button title="Registrati!" onPress={this.registratiButton}/>
          </View>
          <Text>{this.state.errore ? 'ERRORE' : '' }</Text>
          <Button title='Torna indietro' onPress={()=>{this.props.setRegisterPage(false)}}/>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  inserimentoTestoUser: {
    borderWidth: 1,
    marginVertical: 5,
    width: 200,
    marginLeft: 5,
  },
  inserimentoTestoPsw: {
    borderWidth: 1,
    marginVertical: 5,
    width: 200, 
    marginLeft: 5,
  },
  inserimentoTestoMail: {
    borderWidth: 1,
    marginVertical: 5,
    width: 200,
    marginLeft: 5,
  },
  bottone: {
    marginVertical: 5,
    marginLeft: 5,
    width: 150,
  }
});