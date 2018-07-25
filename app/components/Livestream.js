import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import RTCView from 'react-native-webrtc';

export default class Livestream extends React.Component {
    constructor(props){
        super(props);
        let container;
        state= {
            videoURL: null
        }
    }
    getInitialState() {
        this.setState({
            videoURL: null
        });
    }
    componentDidMount() {
    container = this;
    }
    render() {
        return (
            <View>
              <RTCView streamURL={this.state.videoURL}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
})