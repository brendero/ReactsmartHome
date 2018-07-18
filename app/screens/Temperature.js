import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Slider
} from 'react-native';
import Title from '../components/Title';
import firebase from 'react-native-firebase';

let newArray = [];
export default class Temperature extends React.Component {
    constructor(props) {
        super(props);
        this.tempRef = firebase.database().ref('climateControl');
        this.state = {
            homeTemperature: '0',
            thermostat: '0'
        }
    }
    componentDidMount() {
        // firebase things?
        let database = this.tempRef.once('value');
        database.then(items => {
            temperatureData = items._value;
            newArray = temperatureData;
            this.setState({
                homeTemperature: newArray['homeTemp'],
                thermostat: newArray['thermostat']
            });
        })
    }
    _firebaseThermostatChange(temp) {
        this.tempRef.child('/thermostat').set(temp);
    }
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.temperatureWrapper}>
                    <Text style={styles.homeTemperature}>{this.state.homeTemperature}°C</Text>
                </View>
                
                <Title Title="Thermostat" />

                <View>
                    <Slider
                    //TODO: make slider dis play Firebase thermostat value + make circular
                        minimumValue={0}
                        maximumValue={90}
                        value={2}
                        onValueChange={val => this._firebaseThermostatChange(val)}/>
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