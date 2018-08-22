import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return(
                <View style={styles.header}>
                <Text style={styles.headerText}>{this.props.Title}</Text>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#00AAD2',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#FFD230',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26,
    }
});