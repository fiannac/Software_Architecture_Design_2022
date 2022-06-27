import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { touchProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {setConnState} from '../App.js'

export default class LoginPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hidePass: true,
    }
    this.navigation = props.navigation;

    this.controller = props.route.params.controller
    this.usrname = '';
    this.psw = '';
  }

  render(){

    return (
      <View>
        <Text>Effettua il login o registrati!</Text>
        <TextInput onChangeText = {(value) => {this.usrname = value}} style={styles.inserimentoTestoPsw} placeholder="Inserisci nome utente"/>
        <TextInput onChangeText = {(value) => {this.psw = value}} style={styles.inserimentoTestoPsw} placeholder="Inserisci password" autoCompleteType="password" secureTextEntry={this.state.hidePass ? true : false}/>
        <Icon
          name={this.state.hidePass ? 'eye-slash' : 'eye'}
          size={15}
          color="grey"
          onPress={() => this.setState({hidePass: !this.state.hidePass})}
        />
        <TextInput/>
        <Button title="Log in" onPress = {()=>this.controller.login(this.usrname, this.psw)} style={styles.bottone} />
        <Button title="Crea Nuovo account" onPress={() => this.navigation.push('RegisterPage')} style={styles.bottone}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inserimentoTestoUser: {
    borderWidth: 1,
    marginVertical: 5,
    width: 200,
    marginHorizontal: 50,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    paddingLeft: 5,
    paddingRight: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  inserimentoTestoPsw: {
    borderWidth: 1,
    marginVertical: 5,
    width: 200
  },
  bottone: {
    flexDirection: "row",//allineo sull'asse x
    marginVertical: 5,
  }
});