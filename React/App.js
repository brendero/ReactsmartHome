import React from 'react';
import firebase from 'react-native-firebase';
import LogInScreen from './app/screens/user/LogInScreen';
import RegistrationScreen from './app/screens/user/RegistrationScreen';
import { createStackNavigator } from 'react-navigation'; 
import Temperature from './app/screens/Temperature';
import Lights from './app/screens/Lights';
import Appliances from './app/screens/Appliances';
import Security from './app/screens/Security';//bugfix isMounted
import { YellowBox } from 'react-native';
import Menu from './app/screens/Menu';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const Navigation = createStackNavigator(
    {
        Home: {
            screen: Menu,
            navigationOptions({ navigation }) {
                return {
                    title: 'Menu',
                }
            }
        }, 
        Temperature: {
            screen: Temperature,
            navigationOptions({ navigation }) {
                return {
                    title: 'Temperature',
                }
            }
        },
        LogInScreen: {
            screen: LogInScreen,
            navigationOptions({ navigation }) {
                return {
                    title: 'Login',
                }
            }
        },
        RegistrationScreen: {
            screen: RegistrationScreen,
            navigationOptions({ navigation }) {
                return {
                    title: 'Registration',
                }
            }
        },
        Lights: {
            screen: Lights,
            navigationOptions({ navigation }) {
                return {
                    title: 'Lights',
                }
            }
        },
        Appliances: {
            screen: Appliances,
            navigationOptions({ navigation }) {
                return {
                    title: 'Appliances',
                }
            }
        },
        Video: {
            screen: Security,
            navigationOptions({ navigation }) {
                return {
                    title: 'Video',
                }
            }
        },
    },
    {
        initialRouteName: 'LogInScreen',
        navigationOptions({ navigation }) {
            return {
                header: null
            }
        }
    }
);

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
      <Navigation />
    );
  }
}
