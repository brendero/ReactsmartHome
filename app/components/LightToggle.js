import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Switch
} from 'react-native';

export default class LightToggle extends React.Component {
    state = {
        switchValue: true
    }

    _handleLightToggle = () => this.setState(state =>({
        switchValue: !state.switchValue
    }));
    render() {
        return(
                <View style={styles.titleWrapper}>
                    <Text style={{color: 'black'}}>{this.props.Title}</Text>
                    <Switch
                        onValueChange={this._handleLightToggle}
                        value={this.state.switchValue}
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