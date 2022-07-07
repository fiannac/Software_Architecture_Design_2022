import React from 'react';
import { StyleSheet, View, Button, TextInput, TouchableOpacity, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { Avatar, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Conversation from "../components/Conversation";

import ChatPage from './chatPage.js'

const PLACEHOLDER_AVATAR = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'

export default class MainPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      chats : [],
      chatOpen : false,
    }

    this.chatOpenNumber = -1
    this.newUser = ''
    this.controller = props.controller

    this.handleCreateChat = this.handleCreateChat.bind(this)
    this.handleNavigation = this.handleNavigation.bind(this)
    this.signOutUser = this.signOutUser.bind(this)
  }
  
  componentDidMount(){
    this.controller.subscribeChatObserver(this.notify.bind(this))
  }

  componentWillUnmount(){
    this.controller.unsubscribeChatObserver()
  }
  
  notify(chats){
    var newChats = []
    chats.forEach((chat, id) => {
      var toAdd = {
        user:chat.getUserName(),
        id:id,
        chat:[]
      }
      
      chat.getMessages().forEach((msg) => {
        toAdd.chat.push({
          text:msg.getText(),
          timestamp:msg.getTimestamp(),
          sender:msg.getSender()
        })
      })
      newChats = newChats.concat(toAdd)
    });
    this.setState({chats:newChats})
  }

  async handleCreateChat(){
    if(this.newUser != ''){
      const res = await this.controller.createChatFromUsername(this.newUser)
      if(res == true){
        this.chatOpenNumber = this.state.chats.length-1;
        this.setState({chatOpen:true})
      } else if(res == -1) {
        alert('Non puoi creare una chat con te stesso!')
      } else if(res == -2){
        alert('Non esiste un utente con questo username!')
      } else if(res == -3){
        alert('Hai già una chat con questo utente!')
      }
    }
  }

  handleNavigation = () => {
    this.setState({chatOpen:false})
  }

  signOutUser = () => {
    this.controller.logout()
  }

  render(){
    if(this.state.chatOpen == false){
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#122643'}}>
          <View style={{paddingVertical: 50, paddingHorizontal: 30,}}>
            <View style={styles.container}>
              <TouchableOpacity activeOpacity={0.5} onPress={this.signOutUser}>
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
              <Icon name="search" size={18} color="white" />
              </TouchableOpacity>
              </View>
          </View>

          <Text h4 style={{ color: 'white', marginTop: 15 }}>
            Conversazioni
          </Text>
          </View>
          <View style={styles.chatContainer}>
            <ScrollView
              style={{
              minHeight: Dimensions.get('window').height - 180,
              marginTop: 5,
              paddingTop: 5,
              }}
              showsVerticalScrollIndicator={false}
            >

            {this.state.chats.map((id,i) => (
              <Conversation
                key={i}
                id={id.user}
                handleNavigation={()=>{this.chatOpenNumber = i; this.setState({chatOpen:true})}}
                text={this.state.chats[i].chat.length == 0 ? ' ' : this.state.chats[i].chat[this.state.chats[i].chat.length-1].text}
                timestamp={this.state.chats[i].chat.length == 0 ? ' ' : this.state.chats[i].chat[this.state.chats[i].chat.length-1].timestamp}
              />
            ))}
            </ScrollView>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={this.handleCreateChat}
            style={styles.button}
            activeOpacity={0.5}
          >
            <Icon name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <TextInput style = {{position: 'absolute',
            bottom: 100,
            right: 30,}} placeholder="Inserisci username contatto" onChangeText = {(value) => {this.newUser = value}} ref={input => { this.textInput = input }}/>
        </SafeAreaView>
      );
    } else {
      return(
        <View>
          <ChatPage controller = {this.controller} chat = {this.state.chats[this.chatOpenNumber].chat.sort(function(a,b){return new Date(a.timestamp) - new Date(b.timestamp)})} userName = {this.state.chats[this.chatOpenNumber].user} id = {this.state.chats[this.chatOpenNumber].id} handleNavigation={this.handleNavigation}/>
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
  chatContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 5,
    overflow: 'hidden',
    paddingHorizontal: 15,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    right: 30,
  },
  button: {
    shadowColor: '#171717',
    shadowOffsetWidth: 0,
    shadowOffsetHeight: 2,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: 50,
    backgroundColor: '#122643',
  },
})