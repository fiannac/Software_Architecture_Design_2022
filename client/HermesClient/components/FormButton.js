import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';


import * as Font from 'expo-font';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
//let customFonts = {
    //'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
  //};
export default class FormButton extends React.Component {
    constructor(props) {
        super(props);
    } 
/*
    state = {
        fontsLoaded: false,
    };
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
      }
  */  
    render() { 
            return(
                <TouchableOpacity style={styles.buttonContainer} onPress={this.props.handleLogin}>
                    <Text style={styles.buttonText}>{this.props.buttonTitle}</Text>
                </TouchableOpacity>
            );      
    }
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: "#122643",
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    //fontFamily: 'Lato-Regular',
  },
});