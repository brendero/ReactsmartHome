import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import NavigationApp from '../components/Navigation';
import { createStackNavigator } from 'react-navigation'; 
import Temperature from './Temperature';
import Lights from './Lights';
import Appliances from './Appliances';
import Security from './Security';
//bugfix isMounted
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const Navigation = createStackNavigator(
    {
        Home: {
            screen: NavigationApp,
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
                    title: 'Lights',
                }
            }
        },
    },
    {
        initialRouteName: 'Home',
        navigationOptions({ navigation }) {
            return {
                title: 'Menu',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#00AAD2',
                    borderBottomWidth: 10,
                    borderBottomColor: '#FFD230',
                    height: 80,
                    elevation: 0,
                },
                headerTitleStyle: {
                    flex: 1,
                    fontWeight: 'normal',
                    alignSelf: 'center',
                    textAlign: 'center',
                    fontSize: 18,
                    width: '35%'
                }
            }
        }
    }
);

export default class Menu extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Navigation />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})