import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { touchProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

import {setConnState} from '../App.js'
import ChatPage from './chatPage.js'

export let notifyChat
export let notifyMessage

export default class MainPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      chats : [],
      chatOpen : false,
      chatOpenNumber : 0
    }

    this.newUser = ''
    this.controller = props.controller

    notifyChat = this.notifyChat
    notifyMessage = this.notifyMessage

    this.handleCreateChat = this.handleCreateChat.bind(this)
  }

  notifyChat = (id, userName)=>{
    this.setState({chats:[...this.state.chats, {user:userName, id:id, chat:[]}]})
  }

  notifyMessage = (id,msg)=>{
    for(let i=0; i<this.state.chats.length; i++){
      if(this.state.chats[i].id == id){
        this.state.chats[i].chat = [...this.state.chats[i].chat,msg]
      }
    }

    this.setState({chats:[...this.state.chats]})
  }

  handleCreateChat = () =>{
    if(this.newUser != ''){
      this.controller.createChatFromUsername(this.newUser)
      this.textInput.clear()
    }
  }

  render(){
    if(this.state.chatOpen == false){
      return (
        <View>
          <Text>Mainpage!</Text>
          
          <TextInput onChangeText = {(value) => {this.newUser = value}} ref={input => { this.textInput = input }}/>
          <Button onPress={this.handleCreateChat}></Button>

          {this.state.chats.map(( (id,i) => (
            <Button key = {i} title = {id.user} onPress={()=>this.setState({chatOpen:true, chatOpenNumber:i})}/>
          )))}
        </View>
      );
    } else {
      return(
      <View>
        <Button onPress = {()=>this.setState({chatOpen:false})}/>
        <ChatPage controller = {this.controller} chat = {this.state.chats[this.state.chatOpenNumber].chat} userName = {this.state.chats[this.state.chatOpenNumber].user} id = {this.state.chats[this.state.chatOpenNumber].id}/>
      </View>
      )      
    }
  }
}


//<Button title = "Aggiungi chat" onPress={()=>this.createChat('Mimmo' + this.state.chats.length)}></Button>
//<Button title = "Aggiungi msg" onPress={()=>this.createMessage('Mimmo0','we puppy')}></Button>
