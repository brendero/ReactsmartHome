import React, { Component } from 'react';
import { 
    Text,
    StyleSheet,
    TouchableOpacity,
    View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import firebase from 'react-native-firebase';


export default class PlayButton extends React.Component {
    constructor(props){
        super(props);
        this.spotifyRef = firebase.database().ref('Appliances/MusicPlayer')
    }
    state = {
        error: null
    }
    _sendUri= () => {
        if(this.props.soundUri !== null) {
            this.setState({
                error: null
            })
            this.spotifyRef.child('/URL').set(this.props.soundUri);
        }
        else {
            this.setState({
                error: 'Sorry, this song cannot be played'
            })
        }

        console.log(this.props.soundUri);
    }
    render() {
        return(
            <View>
                <TouchableOpacity 
                style={styles.playButton} 
                onPress={this._sendUri}
                >
                <Text style={styles.playButtonText}>
                <FontAwesome>{Icons.play}</FontAwesome>
                </Text>
                </TouchableOpacity>
                {
                   (this.state.error !== null) ?
                   <Text style={styles.error}>{this.state.error}</Text> :
                    null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
  playButton: {
    borderWidth: 1,
    borderColor: "#00AAD2",
    padding: 10,
    borderRadius: 50,
  },
  playButtonText: {
    color: '#00AAD2'
  },
  error: {
    position: 'absolute',
    width: 150,
    top: 40,
    right: -5,
    color: 'red',
    textAlign: 'right'
  }
});