import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RegistrationPage from './registrationPage.js'

export default class LoginPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hidePass: true,
      registerPage: false
    }

    this.controller = props.controller
    this.usrname = '';
    this.psw = '';

    this.setRegisterPage = this.setRegisterPage.bind(this)
    this.loginPress = this.loginPress.bind(this)
  }

  setRegisterPage(value){
    this.setState({registerPage:value})
  }

  async loginPress(){
    if(await this.controller.login(this.usrname, this.psw) == false){
      alert("Login fallito")
      console.log("fallito allert")
    }
  }

  render(){
    if(this.state.registerPage){
      return(<RegistrationPage  controller={this.controller} setRegisterPage = {this.setRegisterPage}/>);
    }else{
      return (
        <View style = {{flex: 1,justifyContent: "center",paddingHorizontal: 10}}>
          <View style = {{alignItems: "center",padding: 10}}>
            <Text>Effettua il login o registrati!</Text>
            <TextInput onChangeText = {(value) => {this.usrname = value}} style={styles.inserimentoTestoUser} placeholder="Inserisci nome utente"/>
            <View style={styles.stilePassword}>
              <TextInput onChangeText = {(value) => {this.psw = value}} style={styles.inserimentoTestoPsw} placeholder="Inserisci password" autoCompleteType="password" secureTextEntry={this.state.hidePass ? true : false}/>
            </View>
            <Icon
                name={this.state.hidePass ? 'eye-slash' : 'eye'}
                size={15}
                style={{marginLeft: 5}}
                color="grey"
                onPress={() => this.setState({hidePass: !this.state.hidePass})}
              />
            <View style={styles.bottone}>
              <View style={styles.bottoneLogin}>
                <Button title="Log in" onPress = {this.loginPress}  />
              </View>
              <Button title="Crea Nuovo account" onPress={()=>this.setRegisterPage(true)} />
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  stilePassword: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  inserimentoTestoUser: {
    borderWidth: 1,
    backgroundColor: 'white',
    marginVertical: 5,
    marginLeft: 5,
    width: 200
  },
  inserimentoTestoPsw: {
    borderWidth: 1,
    backgroundColor: 'white',
    marginVertical: 5,
    marginLeft: 5,
    width: 200
  },
  bottoneLogin: {
    marginRight: 5,
    marginLeft: 5,
  },
  bottone: {
    flexDirection: "row",
    marginVertical: 5,
  }
});