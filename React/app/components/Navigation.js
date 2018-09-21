import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
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
                        <FontAwesome style={styles.buttonIcon}>{Icons.thermometerQuarter}</FontAwesome>
                        <Text style={styles.buttonText}>
                            Temperature
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={()=> navigate('Lights') }>
                        <FontAwesome style={styles.buttonIcon}>{Icons.lightbulbO}</FontAwesome>
                        <Text style={styles.buttonText}>
                            Lights
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.navContainer}>
                    <TouchableOpacity style={styles.navButton} onPress={()=> navigate('Appliances') }>
                        <FontAwesome style={styles.buttonIcon}>{Icons.wrench}</FontAwesome>
                        <Text style={styles.buttonText}>
                            Appliances
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={()=> navigate('Video') }>
                        <FontAwesome style={styles.buttonIcon}>{Icons.camera}</FontAwesome>
                        <Text style={styles.buttonText}>
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
        backgroundColor: 'white'
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
    buttonText: {
        color: '#00AAD2',
        fontSize: 25,
        fontFamily: 'roboto',
        fontWeight: "normal",
        fontStyle: 'italic' 
    },
    buttonIcon: {
        color: '#00AAD2',
        fontSize: 35
    }
});