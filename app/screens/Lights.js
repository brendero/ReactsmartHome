import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import LightToggle from '../components/LightToggle';

export default class Lights extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <LightToggle Title="Bedroom Light"/>
                <LightToggle Title="Kitchen Light"/>
                <LightToggle Title="Garage Light"/>
                <LightToggle Title="Moodlsight"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})