import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import LightToggle from '../components/LightToggle';
import MoodLightToggle from '../components/MoodLightToggle';

export default class Lights extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <LightToggle Title="Bedroom Light" Ref="BedroomLight"/>
                <LightToggle Title="Kitchen Light" Ref="KitchenLight"/>
                <MoodLightToggle Title="Moodlight" Ref="Moodlight"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})