import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import AlertButton from '../components/AlertButton';

export default class Security extends React.Component {
    render() {
        return(
            <View style={styles.container}>
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