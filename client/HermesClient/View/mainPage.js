import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { Avatar, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { touchProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

import {setConnState} from '../App.js'
import ChatPage from './chatPage.js'

export let notifyChat
export let notifyMessage
const PLACEHOLDER_AVATAR = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
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
        <View style={{ paddingVertical: 15, paddingHorizontal: 30 }}>
          <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.5}>
              <Avatar
                rounded
                source={{
                  uri: PLACEHOLDER_AVATAR,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
            <TouchableOpacity style={{ marginRight: 15 }} activeOpacity={0.5}>
            <Icon name="search" size={18} color="black" />
            </TouchableOpacity>
            </View>
          </View>

          <Text h4 style={{ color: 'white', marginTop: 15 }}>
            Messages
          </Text>

          <Text>Mainpage!</Text>
          
          <TextInput placeholder="Inserisci username contatto" onChangeText = {(value) => {this.newUser = value}} ref={input => { this.textInput = input }}/>
          <Button onPress={this.handleCreateChat} title="Seleziona nuovo contatto"></Button>

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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
})
//<Button title = "Aggiungi chat" onPress={()=>this.createChat('Mimmo' + this.state.chats.length)}></Button>
//<Button title = "Aggiungi msg" onPress={()=>this.createMessage('Mimmo0','we puppy')}></Button>
