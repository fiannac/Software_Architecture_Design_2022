import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, BackHandler } from 'react-native';


export default class RegistrationPage extends React.Component {
  constructor(props){
    super(props)
    this.usrname = ''
    this.psw = ''
    this.psw2= ''
    this.mail = ''
    this.controller = props.controller
    this.registratiButton = this.registratiButton.bind(this);


    this.listnerBack = BackHandler.addEventListener('hardwareBackPress', function () {
      this.props.setRegisterPage(false);
      return true;
    }.bind(this))

    
  }

  componentWillUnmount(){
    this.listnerBack.remove()
  }  

  async registratiButton(){
    if(this.psw.length < 8 || !this.psw.match(/[A-Z]/i) || !this.psw.match(/[0-9]/i)){
      this.setState({errore: true})
      alert('Password non valida')
      return
    }
    if(!this.mail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
      this.setState({errore: true})
      alert('Mail non valida')
      return
    }
    if(!this.usrname.match(/^[a-zA-Z0-9]+$/)){
      this.setState({errore: true})
      alert('Username non valido')
      return
    }
    if(this.psw != this.psw2){
      this.setState({errore: true})
      alert('Password non uguali')
      return
    }
    const res = await this.controller.registerUser(this.usrname, this.mail, this.psw)
    
    if(res == true){
      this.props.setRegisterPage(false)
    } else {
      alert('Username o email già utilizzata!')
    }
  }

  render(){
    return (
      <View style = {{flex: 1,justifyContent: "center",paddingHorizontal: 10}}>
        <View style = {{alignItems: "center",padding: 10}}>
          <Text>Registrati con username e password</Text>
          <TextInput onChangeText = {(value) => {this.mail = value}} style={styles.inserimentoTestoMail} placeholder="Inserisci mail"/>
          <TextInput onChangeText = {(value) => {this.usrname = value}} style={styles.inserimentoTestoUser} placeholder='Inserisci nome utente'/>
          <TextInput onChangeText = {(value) => {this.psw = value}} secureTextEntry = {true} style={styles.inserimentoTestoPsw} placeholder='Inserisci password'/>
          <TextInput onChangeText = {(value) => {this.psw2 = value}} secureTextEntry = {true} style={styles.inserimentoTestoPsw} placeholder='Conferma password'/>
          <Button title="Registrati!" style = {styles.inserimentoTestoPsw} onPress={this.registratiButton}/>
        </View>
      </View>
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
    flexDirection: "row",
    marginVertical: 5,
  }
});