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
            thermostat: '0',
            sliderValue:''
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
                sliderValue: newArray['thermostat']
            });
        })
    }
    _firebaseThermostatChange(temp) {
        this.tempRef.child('/thermostat').set(temp);
        this.setState({
            sliderValue: temp
        })
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
                        style={styles.thermostatSlider}
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                        value={parseFloat(this.state.sliderValue)}
                        minimumTrackTintColor="#00AAD2"
                        maximumTrackTintColor="#00AAD2"
                        thumbTintColor="#00AAD2"
                        onValueChange={val => this._firebaseThermostatChange(val)}/>
                        <Text style={styles.thermostatText}>
                            {this.state.sliderValue}°
                        </Text>
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
    thermostatSlider: {
        
    },
    thermostatText: {
        fontFamily: 'roboto',
        fontStyle: 'italic',
        color: '#00AAD2',
        fontSize: 70,
        alignSelf: 'center'
    }
})