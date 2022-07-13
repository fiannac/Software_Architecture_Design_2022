import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from 'react-native-elements'

const PLACEHOLDER_AVATAR = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'


export default class Conversation extends React.Component {
    constructor(props) {
        super(props);
    } 

    pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    render() { 
        return(
            <TouchableOpacity
            style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 15,
            marginBottom: 5,
            }}
            onPress={this.props.handleNavigation}
            >
            <View
                style={{
                    flex: 1,
                    marginLeft: 10,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <Avatar
                  rounded
                  source={{
                    uri: 'http://109.116.253.181:8888/avatar/' + this.props.id +'/'+ new Date()
                  }}
                />
                <View style={{flexDirection: 'column', paddingLeft:15, width:'75%'}}>
                    
                    <Text h5 style={{ fontWeight: '700' }}>
                        {this.props.username}
                    </Text>
                 

                    <Text style={{ color: 'gray'}}>
                        {this.props.text.length >30 ? this.props.text.slice(0, 30) + '...' : this.props.text.slice(0, 30) }
                    </Text>
                </View>
                {(this.props.timestamp != ' ') && <Text style={{ fontWeight: '200' }}>{this.pad((new Date(this.props.timestamp)).getHours())}:{this.pad((new Date(this.props.timestamp)).getMinutes())}</Text>}
            </View>

            </TouchableOpacity>
        )
    }
  }