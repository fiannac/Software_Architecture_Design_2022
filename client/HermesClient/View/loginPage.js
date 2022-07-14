import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

import * as Font from 'expo-font';

import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import RegistrationPage from './registrationPage.js'

//let customFonts = {
  //'Kufam-SemiBoldItalic': require('../assets/fonts/Kufam-SemiBoldItalic.ttf'),
  //'JosefinSans-Regular': require('../assets/fonts/JosefinSans-Regular.ttf')
//};
export default class LoginPage extends React.Component {
  constructor(props){
    super(props)
    //stato della login page
    this.state = {
      registerPage: false,
      loading: false,
      rememberMeLogin: true,
      //fontsLoaded: false
    }
    //il riferimento al controller viene passato tramite i props
    this.controller = props.controller
    this.usrname = '';
    this.psw = '';

    this.setRegisterPage = this.setRegisterPage.bind(this)
    this.loginPress = this.loginPress.bind(this)
  }
/*
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }
*/
  setRegisterPage(value){
    this.setState({registerPage:value})
  }

  //funzione richiamata alla pressione del tasto di login
  async loginPress(){
    this.setState({loading: true})
    if(await this.controller.login(this.usrname, this.psw, this.state.rememberMeLogin) == false){
      alert("Login fallito")
    }
    this.setState({loading: false})
  }

  render(){

    if(this.state.registerPage){
      // renderizza la pagina di registrazione qualora registerPage sia stata posta a true
      return(<RegistrationPage  controller={this.controller} setRegisterPage = {this.setRegisterPage}/>);
    }else{
      //returniamo la pagina di login
      return (
        <>

        {this.state.loading ?
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
         <ActivityIndicator size = 'large'/>
        </View> 
        :
        <ScrollView contentContainerStyle={styles.container}>

            

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    source={require('../assets/MicrosoftTeams-image.png')}
                    style={styles.logo}
                  />
            <Text style={styles.text}>Hermes Messenger</Text>
              </View>
            <FormInput
              onChangeText={(value) => {this.usrname = value}}
              placeholderText="Nome utente"
              iconType="user"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect={false}
              isPsw={false}
            />
            <FormInput
              onChangeText={(value) => {this.psw = value}}
              placeholderText="Password"
              iconType="lock"
              autoComplete="password" 
              isPsw={true}
            />

            <View style = {{flexDirection: "row"}}>

            <BouncyCheckbox
            size={15}
            style={{marginLeft: 5}}
            fillColor="#122643"
            unfillColor="#FFFFFF"
            text="Remember me"
            isChecked={this.state.rememberMeLogin}
            textStyle={{
              textDecorationLine: "none",
              paddingHorizontal: 5,
              //fontFamily: "JosefinSans-Regular",
            }}
            iconStyle={{ borderColor: "#122643", borderRadius: 0, }}
            onPress={() => this.setState({rememberMeLogin: !this.state.rememberMeLogin})}
            />
            </View>
            

              <FormButton
                buttonTitle="Login"
                handleLogin={this.loginPress}
              />

            <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={()=>this.setRegisterPage(true)}>
                    <Text style={styles.navButtonText}>
                      Don't have an account? Create here
                    </Text>
                  </TouchableOpacity>
        </ScrollView>
        }</>
    );
    }
}
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    //fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    //fontFamily: 'Lato-Regular',
  },
  checkbox: {
    alignSelf: "center",
  },
});