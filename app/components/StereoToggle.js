import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Switch
} from 'react-native';
import firebase from 'react-native-firebase';

let newArray = [];
export default class StereoToggle extends React.Component {
    constructor(props) {
        super(props);
        this.ApplianceRef = firebase.database().ref('/Appliances');
    }
    state = {
        Appliance: true
    }

    componentDidMount() {
        let database = this.ApplianceRef.once('value');
        database.then(items => {
            lightData = items._value;
            newArray = lightData;
            if(newArray[this.props.Ref] == "True") {
                this.setState({
                    Appliance: true
                });
            }
            else {
                this.setState({
                    Appliance: false
                });
            }
        })
    }
    _firebaseApplianceToggle = () => {
        let lightDate = this.state.Appliance;
        if(lightDate == true) {
            this.ApplianceRef.child(this.props.Ref).set("False");
        }
        else {
            this.ApplianceRef.child(this.props.Ref).set("True");
        }
        this.setState(state => ({
            Appliance: !state.Appliance
        }));
    }
    render() {
        return(
                <View style={styles.titleWrapper}>
                    <Text style={{color: 'black'}}>{this.props.Title}</Text>
                    <Switch
                        onValueChange={this._firebaseApplianceToggle}
                        value={this.state.Appliance}
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