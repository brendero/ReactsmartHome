import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class NavigationApp extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <Button title="Temperature" style={styles.navButton} onPress={()=> navigate('Temperature') }>
                </Button>
                <Button title="Lights" style={styles.navButton} onPress={()=> navigate('Lights') }>
                </Button>
                <Button title="Appliances" style={styles.navButton} onPress={()=> navigate('Appliances') }>
                </Button>
                <Button title="Video" style={styles.navButton} onPress={()=> navigate('Video') }>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navButton: {
        backgroundColor: 'black',
        elevation: 0
    },
});