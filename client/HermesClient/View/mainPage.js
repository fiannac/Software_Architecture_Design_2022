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
      chatOpenId : 0
    }

    notifyChat = this.notifyChat
    notifyMessage = this.notifyMessage
  }

  notifyChat = (user)=>{
    this.setState({chats:[...this.state.chats, {user:user, chat:[]}]})
  }

  notifyMessage = (user,msg)=>{
    for(let i=0; i<this.state.chats.length; i++){
      if(this.state.chats[i].user == user){
        this.state.chats[i].chat = [...this.state.chats[i].chat,msg]
      }
    }

    this.setState({chats:[...this.state.chats]})
  }

  render(){
    if(this.state.chatOpen == false){
      return (
        <View>
          <Text>Mainpage!</Text>
          
          {this.state.chats.map(( (id,i) => (
            <Button key = {i} title = {id.user} onPress={()=>this.setState({chatOpen:true, chatOpenId:i})}/>
          )))}
        </View>
      );
    } else {
      return(
      <View>
        <Button onPress = {()=>this.setState({chatOpen:false})}/>
        <ChatPage chat = {this.state.chats[this.state.chatOpenId].chat}/>
      </View>
      )      
    }
  }
}


//<Button title = "Aggiungi chat" onPress={()=>this.createChat('Mimmo' + this.state.chats.length)}></Button>
//<Button title = "Aggiungi msg" onPress={()=>this.createMessage('Mimmo0','we puppy')}></Button>
