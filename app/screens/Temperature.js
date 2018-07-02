import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Title from '../components/Title';

export default class Temperature extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.temperatureWrapper}>
                    <Text style={styles.homeTemperature}>27°C</Text>
                </View>
                
                <Title Title="Thermostat" />

                <View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 0,
        left: 0,
        backgroundColor: 'white'
    },
    temperatureWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 50
    },
    homeTemperature: {
        fontSize: 100,
        fontFamily: 'roboto',
        color: 'black',
    },
})