import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class Message extends React.Component {
    constructor(props) {
        super(props);
    } 

    render() { 
        if(this.props.type == 'snd'){
            return(
                <View style={[styles.flexify, styles.spaceMsg]}>
                  <View style={[styles.msgBg, { marginLeft: 10 }]}>
                    <Text style={{ fontWeight: "600", marginVertical: 5 }}>
                      {this.props.message}
                    </Text>
                  </View>
                </View>
            )}else{
                return(
                    <View style={[styles.flexify, styles.spaceMsg]}>
                        <View
                        style={[styles.msgBg, { backgroundColor: '#c5c5c5', marginRight: 10 }]}
                        >
                            <Text styles={{ fontWeight: "600", marginVertical: 5 }}>
                                {this.props.message}
                        </Text>
                        </View>
                    </View>
                );
            }           
    }
}

  const styles = StyleSheet.create({
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
      marginVertical: -500,
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 15,
      paddingVertical: 15,
    },
  });