import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Switch,
    Dimensions
} from 'react-native';
import firebase from 'react-native-firebase';
import { ColorWheel } from 'react-native-color-wheel';

let newArray = [];
export default class MoodLightToggle extends React.Component {
    constructor(props) {
        super(props);
        this.lightRef = firebase.database().ref('/Lights');
    }
    state = {
        Light: true,
        color: "#FFFFF"
    }

    componentDidMount() {
        let database = this.lightRef.once('value');
        database.then(items => {
            lightData = items._value;
            newArray = lightData;
            if(newArray[this.props.Ref+'/on'] == "True") {
                this.setState({
                    Light: true
                });
            }
            else {
                this.setState({
                    Light: false
                });
            }
        })
    }
    toggleVisibilityColorWheel() {
        if(this.state.Light == true) {

        }   
        if(this.state.Light == false) {

        }
    }
    _firebaseLightToggle = () => {
        let lightDate = this.state.Light;
        if(lightDate == true) {
            this.lightRef.child(this.props.Ref+'/on').set("False");
        }
        else {
            this.lightRef.child(this.props.Ref+'/on').set("True");
        }
        this.setState(state => ({
            Light: !state.Light
        }));
    }
    _firebaseColorPicker = (colorValue) => {
        this.lightRef.child(this.props.Ref+'/color').set(colorValue)
    }
    render() {
        return(
            <View style={{flex:1}}>

                <View style={styles.titleWrapper}>
                    <Text style={{color: 'black'}}>{this.props.Title}</Text>
                    <Switch
                        onValueChange={this._firebaseLightToggle}
                        value={this.state.Light}
                        style={{transform: [{scale: 1.5}]}}
                        tintColor= "#A9A9A9"
                        onTintColor= "#00AAD2"
                        thumbTintColor= "#FFFFFF"
                        />
                </View>
                {
                    this.state.Light &&
                    <ColorWheel
                    //TODO: initialColor to current firebase color
                    initialColor="#FFFFFF"
                    onColorChange={(color) => {this._firebaseColorPicker(color)}}
                    style={{width: Dimensions.get('window').width}}
                    thumbStyle={{ height: 5, width: 5, borderRadius: 30}} />
                }
            </View>

        );
    }
}

const styles = StyleSheet.create({
    titleWrapper: {
        borderBottomColor: "#FFD230",
        borderBottomWidth: 1, 
        paddingBottom: 10,
        paddingTop: 10,
        paddingRight: 5,
        marginTop: 26.5,
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});