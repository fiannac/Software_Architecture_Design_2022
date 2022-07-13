import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.date = new Date(this.props.timestamp);
    } 

    pad(d) {
      return (d < 10) ? '0' + d.toString() : d.toString();
    }

    render() { 
        if(this.props.type == 'snd'){
            return(
                  <TouchableOpacity activeOpacity={0.7} style={[styles.flexify, styles.spaceMsg]}>
                  <View style={[styles.msgBg, { marginLeft: 20 }]}>
                
                    <Text style={{ fontWeight: "600", marginVertical: 5}}>
                      {this.props.message}
                    </Text>
                      
                    <Text styles = {{fontWeight:"300", fontSize: 6}}>
                      {`${this.pad(this.date.getHours())}:${this.pad(this.date.getMinutes())}`}
                    </Text>
                  </View>
                  </TouchableOpacity>
       
            )}else{
                return(
                  <TouchableOpacity activeOpacity={0.7} style={[styles.flexify, styles.spaceMsg]}>
                        <View style={[styles.msgBg, { backgroundColor: '#efefef', marginRight: 20 }]}>     
                          <Text styles={{ fontWeight: "600", marginVertical: 5 }}>
                            {this.props.message}
                          </Text>
                          <Text styles = {{fontWeight:"300", fontSize: 6}}>
                            {`${this.pad(this.date.getHours())}:${this.pad(this.date.getMinutes())}`}
                          </Text>
                        </View>
              
                    </TouchableOpacity>
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
      backgroundColor: '#add8e6',
      borderRadius: 20,
      padding: 10,
    },
    spaceMsg: {
      alignItems: 'flex-end',
      marginVertical: 5
    }
  });