import React from 'react';
import { Text } from 'react-native-elements'
import { StyleSheet, View, TextInput, TouchableOpacity, Dimensions, ScrollView, Keyboard , BackHandler, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo'
import Message from "../components/Message";

export default class ChatPage extends React.Component {
  constructor(props){
    super(props)
    this.state = { // stato delle chat
      msg : "",
      height: Dimensions.get('window').height,
    }
    this.handleMsgSend = this.handleMsgSend.bind(this)
    this.controller = props.controller
    this.userName = props.userName
    this.id = props.id
    this.ref = React.createRef()

    //Aggiunte di un listener per settaggio della dimensione dello screen all'apertura della tastiera
    this.listnerShow = Keyboard.addListener("keyboardDidShow", function(e){
      this.setState({height : Dimensions.get('window').height-e.endCoordinates.height})
      this.ref.current.scrollToEnd()
    }.bind(this))

    this.listnerHide = Keyboard.addListener("keyboardDidHide", function(e){
      this.setState({height : Dimensions.get('window').height})
    }.bind(this))

    //Funzione per returnare indietro alla mainpage
    this.listnerBack = BackHandler.addEventListener('hardwareBackPress', function () {
      this.props.handleNavigation()
      return true;
    }.bind(this))
  }

  //Funzione per gestire l'invio di un messaggio
  async handleMsgSend(){
    if(this.state.msg != ''){
      const res = await this.controller.inviaMessaggio(this.id,this.state.msg)
      this.setState({msg:''})
      this.textInput.clear()
      if(res == false){
        alert("Il messaggio non è stato consegnato, potresti essere stato bloccato!")
      }
    }
  }
  //rimozione listener
  componentWillUnmount(){
    this.listnerShow.remove()
    this.listnerHide.remove()
    this.listnerBack.remove()
  }

  //Funzione richiamata alla pressione del tasto di opzioni all'interno della chat page 
  settingPressed(){
    Alert.alert(
      "Impostazioni chat",
      "Seleziona una delle seguenti opzioni",
      [
        {
           text: "Annulla"
        },{
          text: "Elimina Chat",
          onPress: () => {this.props.handleNavigation();this.controller.deleteChat(this.id)}, 
          style: 'destructive'
        },{
          text: "Blocca utente",
          onPress: () => this.controller.bloccaUtente(this.id),
          style: "cancel"
        }
      ]
    );
  }

  render(){
    
    return (
    <View style={styles.container}>

      <View style={[styles.flexify,{height:55 }]}>
        <TouchableOpacity onPress={() => {this.props.handleNavigation(); } } activeOpacity={0.5} style={{paddingHorizontal:'5%'}}>
          <Icon name="arrow-left" size={20} color='white'/>
        </TouchableOpacity>

        <Text style={{color: 'white',fontWeight: "600"}}>
          {this.userName}
        </Text>

        <TouchableOpacity onPress={()=>{this.settingPressed()}} activeOpacity={0.5} style={{paddingHorizontal:'5%'}}>
          <Icon2 name="dots-three-vertical" size={20} color='white' />
        </TouchableOpacity>

      </View>
      
      <View style = {{backgroundColor: 'white', height: this.state.height - 115,
          paddingLeft: 20,
          paddingRight: 20}}>
          <ScrollView ref={this.ref} onContentSizeChange={(width, height) => this.ref.current.scrollTo({ y: height, animated: false }) }
          showsVerticalScrollIndicator={false}>
            {this.props.chat.map((msg, i) => (
            <Message
              key={i}
              type={msg.sender}
              message={msg.text}
              timestamp={msg.timestamp}
            />
          ))}
        </ScrollView>
      </View>
      
      <View style={[styles.flexify, styles.shadow, {height: 50, paddingLeft:20, paddingRight:20}]}>
          <TextInput
            placeholder="Invia messaggio"
            inputContainerStyle={{ borderBottomWidth: 0 }}
            ref={input => { this.textInput = input; }}
            onChangeText={(value) => { this.setState({msg:value}) }}
            inputStyle={{ fontSize: 12 }}
            style = {{width : '90%'}}
          />

        <TouchableOpacity
          style={{
            paddingVertical: 5,
            paddingHorizontal: 7,
            borderRadius: 50,
            backgroundColor: '#c5c5c5',
          }}
          activeOpacity={0.2}
          disabled={this.state.msg.length < 1}
          onPress={this.handleMsgSend}
        >
          <Icon name="arrow-right" size={12} color="black" />
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#122643',
  },
  flexify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  msgBg: {
    flex: 1,
    backgroundColor: '#efefef',
    borderRadius: 20,
    padding: 10,
  },
  spaceMsg: {
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffsetWidth: 0,
    shadowOffsetHeight: 2,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: 'white',
  }
});