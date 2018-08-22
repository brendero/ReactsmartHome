import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Switch
} from 'react-native';
import firebase from 'react-native-firebase';

let newArray = [];
export default class LightToggle extends React.Component {
    constructor(props) {
        super(props);
        this.lightRef = firebase.database().ref('/Lights');
    }
    state = {
        Light: true
    }

    componentDidMount() {
        let database = this.lightRef.once('value');
        database.then(items => {
            lightData = items._value;
            newArray = lightData;
            if(newArray[this.props.Ref] == "True") {
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
    _firebaseLightToggle = () => {
        let lightDate = this.state.Light;
        if(lightDate == true) {
            this.lightRef.child(this.props.Ref).set("False");
        }
        else {
            this.lightRef.child(this.props.Ref).set("True");
        }
        this.setState(state => ({
            Light: !state.Light
        }));
    }
    render() {
        return(
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