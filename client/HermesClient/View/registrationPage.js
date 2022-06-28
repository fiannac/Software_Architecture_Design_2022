import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';


export default class RegistrationPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      errore: false
    }
    this.usrname = ''
    this.psw = ''
    this.mail = ''
    this.controller = props.route.params.controller

    this.registratiButton = this.registratiButton.bind(this);
  }

  async registratiButton(){
    //faccio il controllo di validità della psw
    
    const res = await this.controller.registerUser(this.usrname, this.mail, this.psw)
    
    if(res == true){
      this.props.navigation.goBack()
    } else {
      this.setState({errore:true})
    }
  }

  render(){
    return (
        <View>
        <Text>Registrati con username e password</Text>
        <TextInput onChangeText = {(value) => {this.mail = value}} style={styles.inserimentoTestoMail} placeholder="Inserisci mail"/>
        <TextInput onChangeText = {(value) => {this.usrname = value}} style={styles.inserimentoTestoUser} placeholder='Inserisci nome utente'/>
        <TextInput onChangeText = {(value) => {this.psw = value}} secureTextEntry = {true} style={styles.inserimentoTestoPsw} placeholder='Inserisci password'/>
        
        <Button title="Registrati!" onPress={this.registratiButton} style={styles.bottone}/>

        <Text>{this.state.errore ? 'ERRORE' : '' }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inserimentoTestoUser: {
    borderWidth: 1,
    marginVertical: 5,
    width: 200
  },
  inserimentoTestoPsw: {
    borderWidth: 1,
    marginVertical: 5,
    width: 200
  },
  inserimentoTestoMail: {
    borderWidth: 1,
    marginVertical: 5,
    width: 200
  },
  bottone: {
    flexDirection: "row",//allineo sull'asse x
    marginVertical: 5,
  }
});