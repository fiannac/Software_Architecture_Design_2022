import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { touchProps } from 'react-native-web/dist/cjs/modules/forwardedProps';


export default class RegistrationPage extends React.Component {
  constructor(prop){
    super()
    this.usrname = ''
    this.psw = ''
    this.mail = ''
  }

  render(){
    return (
        <View>
        <Text>Registrati con username e password</Text>
        <TextInput onChangeText = {(value) => {this.mail = value}} style={styles.inserimentoTestoMail} placeholder="Inserisci mail"/>
        <TextInput onChangeText = {(value) => {this.usrname = value}} style={styles.inserimentoTestoUser} placeholder='Inserisci nome utente'/>
        <TextInput onChangeText = {(value) => {this.psw = value}} secureTextEntry = {true} style={styles.inserimentoTestoPsw} placeholder='Inserisci password'/>
        
        <Button title="Registrati!" onPress={() => console.log("zio pera")} style={styles.bottone}/>
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