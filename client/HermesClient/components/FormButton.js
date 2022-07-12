import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 

export default class FormButton extends React.Component {
    constructor(props) {
        super(props);
    } 

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
    marginTop: 10,
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