import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import AlertButton from '../components/AlertButton';
import RTCWebRTC from '../components/RTCLivestream';

export default class Security extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <View style={styles.container}>
                <RTCWebRTC/>
                <AlertButton/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
})