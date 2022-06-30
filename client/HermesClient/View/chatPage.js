import { StatusBar } from 'expo-status-bar';
import React, {useRef} from 'react';
import { Text } from 'react-native-elements'
import { StyleSheet, View, Button, TextInput, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { touchProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Message from "../components/Message";


export default class ChatPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      msg : "",
    }
    this.handleMsgSend = this.handleMsgSend.bind(this)
    this.controller = props.controller
    this.userName = props.userName
    this.id = props.id
    this.ref = React.createRef()
  }

  handleMsgSend = ()=>{
    if(this.state.msg != ''){
      this.controller.inviaMessaggio(this.id,this.state.msg)
      this.setState({msg:''})
      this.textInput.clear()
    }
  }

  
  render(){
    
    return (
      
      <View style={styles.container}>
        <View
            style={[styles.flexify, { paddingHorizontal: 15, paddingVertical: 25, marginVertical: 28}]}
          >
            <TouchableOpacity onPress={() => { this.props.handleNavigation(); } } activeOpacity={0.5}>
              <Icon name="arrow-left" size={18} color="white" />
            </TouchableOpacity>
            <View style={[styles.flexify, { flex: 1, marginLeft: 15 }]}>
              <View style={styles.flexify}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: "600",
                    marginLeft: 10,
                    textTransform: 'capitalize',
                  }}
                >
                  {this.userName}
                </Text>
              </View>
            </View>
          </View>
      <ScrollView
      
        ref={this.ref}
        onContentSizeChange={(width, height) =>
          this.ref.current.scrollTo({ y: height })
        }
        style={{
          backgroundColor: 'white',
          maxHeight: Dimensions.get('window').height - 162,
          padding: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 5,
          }}
        ></View>
        {this.props.chat.map((msg, i) => (
          <Message
            key={i}
            type={msg.type}
            message={msg.text}
          />
        ))}
      </ScrollView>

      <View style={[styles.flexify, styles.positAtBottom, styles.shadow, {marginTop: 615}]}>
          <TextInput
            placeholder="Invia messaggio"
            inputContainerStyle={{ borderBottomWidth: 0 }}
            ref={input => { this.textInput = input; }}
            onChangeText={(value) => { this.setState({msg:value}) }}
            inputStyle={{ fontSize: 12 }}
            autoFocus={true}
            //style={{flex:1}}
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
    //flex: 1,
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
  },
  positAtBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});