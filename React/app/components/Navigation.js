import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
//TODO: get fontAwesome to work
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class NavigationApp extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <View style={styles.navContainer}>
                    <TouchableOpacity style={styles.navButton} onPress={()=> navigate('Temperature') }>
                        <Text>
                            <FontAwesome>{Icons.thermometerQuarter}</FontAwesome>
                            Temperature
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={()=> navigate('Lights') }>
                        <Text>
                            <FontAwesome>{Icons.chevronLeft}</FontAwesome>
                            Lights
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.navContainer}>
                    <TouchableOpacity style={styles.navButton} onPress={()=> navigate('Appliances') }>
                        <Text>
                            <FontAwesome>{Icons.chevronLeft}</FontAwesome>
                            Appliances
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={()=> navigate('Video') }>
                        <Text>
                            <FontAwesome>{Icons.chevronLeft}</FontAwesome>
                            Video
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    navContainer: {
        flexDirection: 'row',
    },
    navButton: {
        backgroundColor: 'transparent',
        borderColor: '#00AAD2',
        borderWidth: 1,
        elevation: 0,
        width: "50%",
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
});