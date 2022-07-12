import { StatusBar } from 'expo-status-bar';
import React from 'react';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

import { StyleSheet, Text, View, Button, TextInput, BackHandler, TouchableOpacity, ScrollView } from 'react-native';


export default class RegistrationPage extends React.Component {
  constructor(props){
    super(props)
    //campi per la registrazione
    this.usrname = ''
    this.psw = ''
    this.psw2= ''
    this.mail = ''
    //controller passato dalla login page come prop
    this.controller = props.controller
    this.registratiButton = this.registratiButton.bind(this);

    //Aggiunta di un listener per consentire il ritorno alla pagina precedente
    this.listnerBack = BackHandler.addEventListener('hardwareBackPress', function () {
      this.props.setRegisterPage(false); // richiama la funzione di set del campo register page dello stato della login page
      return true;
    }.bind(this))    
  }

  componentWillUnmount(){
    this.listnerBack.remove()
  }  

  // funzione richiamata alla pressione del tasto di registrazione
  async registratiButton(){

    //Controlli di validità dell'input

    if(this.psw.length < 8 || !this.psw.match(/[A-Z]/i) || !this.psw.match(/[0-9]/i)){
      alert('Password non valida')
      return
    }
    if(!this.mail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
      alert('Mail non valida')
      return
    }
    if(!this.usrname.match(/^[a-zA-Z0-9]+$/)){
      alert('Username non valido')
      return
    }
    if(this.psw != this.psw2){
      alert('Password non uguali')
      return
    }
    //invio richiesta di registrazione utente tramite il controller
    const res = await this.controller.registerUser(this.usrname, this.mail, this.psw)
    
    if(res == true){
      //a registrazione avvenuta con successo
      this.props.setRegisterPage(false)
    } else {
      alert('Username o email già utilizzata!')
    }
  }

  render(){
    return (
      <ScrollView style={styles.container}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.text}>Create an account</Text>
        <FormInput
        isPsw={false}
        onChangeText={(value) => {this.mail = value}}
        placeholderText="Email"
        iconType="mail"
        keyboardType="email-address"
        autoComplete="email"
        autoCapitalize="none"
        autoCorrect={false}
        />

        <FormInput
        isPsw={false}
        onChangeText={(value) => {this.usrname = value}}
        placeholderText="Nome utente"
        iconType="user"
        autoComplete="username"
        autoCapitalize="none"
        autoCorrect={false}
        />

        <FormInput
        onChangeText={(value) => {this.psw = value}}
        placeholderText="Password"
        iconType="lock"
        isPsw={true}
        autoComplete="password-new" 
        />

        <FormInput
        onChangeText={(value) => {this.psw2 = value}}
        placeholderText="Conferma Password"
        iconType="lock"
        isPsw={true}
        autoComplete="off"
        />

        <FormButton
        buttonTitle="Sign Up"
        handleLogin={this.registratiButton}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#122643'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <TouchableOpacity onPress={() => alert('Privacy Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#122643'}]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.navButton}
        onPress={()=>this.props.setRegisterPage(false)}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    padding: 20,
    paddingTop: 40 
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});