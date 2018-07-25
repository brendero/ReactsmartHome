import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import AlertButton from '../components/AlertButton';
import Livestream from '../components/Livestream';

export default class Security extends React.Component {
    constructor(props){
        super(props);
        let container;
        let RCTWebRTCDemo
    }
    render() {
        return(
            <View style={styles.container}>
                {/* <Livestream/> */}

                <AlertButton/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})