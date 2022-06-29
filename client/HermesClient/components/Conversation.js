import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default class Conversation extends React.Component {
    constructor(props) {
        super(props);
    } 
    render() { 
        return(
            <TouchableOpacity
            style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            }}
            onPress={this.props.handleNavigation}
            >
    
            <View
                style={{
                    flex: 1,
                    marginLeft: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <View style={{flexDirection: 'row'}}>
                    <Text h5 style={{ fontWeight: '700' }}>
                        {this.props.id}
                    </Text>
                    <Text style={{ color: 'gray', marginLeft: 5}}>
                        {this.props.text.length >30 ? this.props.text.slice(0, 30) + '...' : this.props.text.slice(0, 30) }
                    </Text>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
  }