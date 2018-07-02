import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import Menu from './app/screens/Menu';

import firebase from 'react-native-firebase';

export default class App extends React.Component {
  constructor() {
    super();
    this.climate = this.getRef('climateControl');
    this.componentDidMount(this.climate);
    this.state = {
      // firebase things?
    };
  }

  getRef(reference) {
     return firebase.database().ref(reference);
  }

  componentDidMount(db) {
     // firebase things?
     let database = db.once('thermostat');
     console.log(database);
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
