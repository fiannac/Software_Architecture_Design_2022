import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { touchProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

import {setConnState} from '../App.js'

export default class ChatPage extends React.Component {
  constructor(props){
    super(props)
    this.msg = ''
    this.handleMsgSend = this.handleMsgSend.bind(this)
    this.controller = props.controller
    this.userName = props.userName
    this.id = props.id
  }

  handleMsgSend = ()=>{
    if(this.msg != ''){
      this.controller.inviaMessaggio(this.id,this.msg)
      this.textInput.clear()
    }
  }

  
  render(){
    
    return (
      <View>
        <Text>Chat con {this.userName}</Text>
        {this.props.chat.map(( (msg,i) => (
            <Text key = {i}>{msg}</Text>
        )))}

      <TextInput onChangeText = {(value) => {this.msg = value}} ref={input => { this.textInput = input }}/>
      <Button onPress={this.handleMsgSend} title = "Invia messaggio"/>
      <Button onPress={()=>{this.props.handleNavigation()}} title = "Torna alla chat"/>
      </View>
    );
  }
}
