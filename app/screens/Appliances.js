import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import StereoToggle from '../components/StereoToggle';


export default class Appliances extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <StereoToggle Title="Stereo" Ref="Stereo"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})