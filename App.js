import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import Menu from './app/screens/Menu';
import firebase from 'react-native-firebase';

export default class App extends React.Component {
  constructor() {
    super();
    this.climateRef = firebase.database().ref('climateControl');
    this.state = {
      // firebase things?
    };
  }
  
  componentDidMount() {
     // firebase things?
     let database = this.climateRef.once('thermostat');
     database.then(items => {
       climateData = items._value;
     })
  }

  render() {
    return (
      <Menu />
    );
  }
}
