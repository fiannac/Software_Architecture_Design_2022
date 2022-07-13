import React from 'react';
import { StyleSheet, View, Button, TextInput, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, Alert } from 'react-native';
import { Avatar, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Conversation from "../components/Conversation";
import { SearchBar } from "@rneui/themed";
import * as ImagePicker from 'expo-image-picker';

import ChatPage from './chatPage.js'

export default class MainPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      chats : new Map(),
      chatOpen : false,
      search: '',
      searchBar: false,
      newChat: false,
      newUser: ''
    }
    this.chatOpenNumber = -1
    this.controller = props.controller

    this.handleCreateChat = this.handleCreateChat.bind(this)
    this.handleNavigation = this.handleNavigation.bind(this)
    this.updateSearch = this.updateSearch.bind(this)
    this.userPressed = this.userPressed.bind(this)
    this.picker = this.picker.bind(this)
  }
    
  componentDidMount(){
    this.controller.subscribeChatObserver(this.notify.bind(this))
    this.id = this.controller.getId()
  }

  componentWillUnmount(){
    this.controller.unsubscribeChatObserver()
  }
  
  // Funzione richiamata all'aggiornamento delle chat nel model 
  notify(chats){
    var newChats = new Map()
    chats.forEach((chat, id) => {
      var toAdd = {
        user:chat.getUserName(),
        id:id,
        chat:[],
        timestampLastMsg:chat.getTimestamp()
      }
      
      chat.getMessages().forEach((msg) => {
        toAdd.chat.push({
          text:msg.getText(),
          timestamp:msg.getTimestamp(),
          sender:msg.getSender()
        })
      })
      newChats.set(id, toAdd)
    });
    this.setState({chats:newChats})
  }

  handleNavigation = () => {
    this.setState({chatOpen:false})
  }

  sortChats = (a, b) => {
    if(b.timestampLastMsg==null) return -1
    if(a.timestampLastMsg==null) return 1
    return b.timestampLastMsg.getTime() - a.timestampLastMsg.getTime()
  }
  updateSearch  = (search) => {
    this.setState({search:search})
  }

  picker = async () => { 
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
      quality: 1,
    })
    if (!result.cancelled) {
      this.controller.setAvatar(result.uri)
    } 
  }

  userPressed = async () => {
    //allert with tree choices, one for logout, one for upload image, one to close the allert
    Alert.alert(
      "Impostazioni profilo",
      "Seleziona una delle seguenti opzioni",
      [
        {
           text: "Annulla"
        },{
          text: "Logout",
          onPress: () => {this.controller.logout()}, 
          style: 'destructive'
        },{
          text: "Carica foto profilo",
          onPress: () => {this.picker()},
          style: "cancel"
        }
      ]
    );
  }  

  async handleCreateChat(){
    if(this.state.newUser != ''){
      const res = await this.controller.createChatFromUsername(this.state.newUser)
      if(res.ok == true){
        this.chatOpenNumber = res.id;
        this.setState({chatOpen:true})
      } else if(res == -1) {
        alert('Non puoi creare una chat con te stesso!')
      } else if(res == -2){
        alert('Non esiste un utente con questo username!')
      } else if(res == -3){
        alert('Hai già una chat con questo utente!')
      }
    }
    this.setState({newChat:false, newUser:''})
  }

  render(){
    if(this.state.chatOpen == false){ // a chat chiusa returno la main page
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#122643'}}>
          <View style={{paddingVertical: 50, paddingHorizontal: 30}}>
              {(this.state.searchBar && this.state.newChat) &&
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <TouchableOpacity onPress={() => this.setState({searchBar: false, search:'', newChat: false})}>
                  <Icon2 name="arrow-left" size={22} color="white" />   
                </TouchableOpacity>
                <View style={{flex: 1, paddingLeft: 15}}>
                  <SearchBar
                    inputStyle={{backgroundColor: 'white', borderColor: '#122643'}}
                    containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 20, borderColor: '#122643', height: 60}}
                    inputContainerStyle={{backgroundColor: 'white', borderColor: '#122643', height: 45}}
                    placeholder="Cerca conversazione..."
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    searchIcon={{size: 22}}
                  />
                </View>
              </View>
                  }
              {(!this.state.searchBar && !this.state.newChat) && 
              <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.5} onPress={this.userPressed}>
                  <Avatar
                    rounded
                    source={{
                      uri: 'http://109.116.253.181:8888/avatar/' + this.id +'/'+ (new Date()).getMinutes()
                    }}
                    size= {60}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                <TouchableOpacity style={{ marginRight: 15 }} activeOpacity={0.5} onPress={()=>this.setState({searchBar:true, search: '', newChat: true})}>
                <Icon name="search" size={22} color="white" />
                </TouchableOpacity>
                </View>
            </View>}

            {(this.state.newChat && !this.state.searchBar) &&
            <View style={{flexDirection: "row", alignItems: "center"}}>
            <TouchableOpacity onPress={() => this.setState({newChat: false})}>
              <Icon2 name="arrow-left" size={22} color="white" />   
            </TouchableOpacity>
            <View style={{flex: 1, paddingLeft: 15}}>
              <SearchBar
                inputStyle={{backgroundColor: 'white', borderColor: '#122643'}}
                containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 20, borderColor: '#122643', height: 60}}
                inputContainerStyle={{backgroundColor: 'white', borderColor: '#122643', height: 45}}
                placeholder="Crea nuova conversazione..."
                onChangeText={(text) => this.setState({newUser: text})}
                value={this.state.newUser}
                onSubmitEditing={this.handleCreateChat}
              />
            </View>
          </View>
            }

          <Text h4 style={{ color: 'white', marginTop: 15 }}>
            Conversazioni
          </Text>
          </View>

          <View style={styles.chatContainer}>
            <ScrollView
              style={{
              height: Dimensions.get('window').height - 205,
             
              }}
              showsVerticalScrollIndicator={false}
            >
            
            {Array.from(this.state.chats.values()).filter((chat)=>chat.user.startsWith(this.state.search)).sort(this.sortChats).map((chat,i) => (
              <Conversation
                key={i}
                username={chat.user}
                id = {chat.id}
                handleNavigation={()=>{this.chatOpenNumber = chat.id; this.setState({chatOpen:true})}}
                text={this.state.chats.get(chat.id).chat.length == 0 ? ' ' : this.state.chats.get(chat.id).chat[this.state.chats.get(chat.id).chat.length-1].text}
                timestamp={this.state.chats.get(chat.id).chat.length == 0 ? ' ' : this.state.chats.get(chat.id).chat[this.state.chats.get(chat.id).chat.length-1].timestamp}
              />
            ))}
            </ScrollView>
          </View>
                
          {!this.state.newChat && <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={()=>this.setState({newChat: true})}
            style={styles.button}
            activeOpacity={0.5}
          >
            <Icon name="plus" size={27} color="white" />
            </TouchableOpacity>
          </View>}
          
        </SafeAreaView>
      );
    } else { //altrimenti renderizzo la chatpage
      return(
        <View>
          <ChatPage controller = {this.controller} chat = {this.state.chats.get(this.chatOpenNumber).chat.sort(function(a,b){return new Date(a.timestamp) - new Date(b.timestamp)})} userName = {this.state.chats.get(this.chatOpenNumber).user} id = {this.state.chats.get(this.chatOpenNumber).id} handleNavigation={this.handleNavigation}/>
        </View>
      )      
    }
  }
}

//
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
  },
  chatContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
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

//<TouchableOpacity style={{ marginRight: 15 }} activeOpacity={0.5} onPress={}>
//<Icon name="search" size={18} color="white" />
//</TouchableOpacity>