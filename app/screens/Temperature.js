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
import firebase from 'react-native-firebase';

let newArray = [];
export default class Temperature extends React.Component {
    constructor() {
        super();
        this.tempRef = firebase.database().ref('climateControl');
    }
    componentDidMount() {
        // firebase things?
        let database = this.tempRef.once('value');
        database.then(items => {
            temperatureData = items._value;

            newArray = temperatureData;

            this.setState({
                homeTemperature: newArray['homeTemp']
            });
        })
    }
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.temperatureWrapper}>
                    <Text style={styles.homeTemperature}>{this.state.homeTemperature}</Text>
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