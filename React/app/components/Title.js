import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class Title extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return(
                <View style={styles.titleWrapper}>
                    <Text style={{color: 'black'}}>{this.props.Title}</Text>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    titleWrapper: {
        borderBottomColor: "#FFD230",
        borderBottomWidth: 1, 
        paddingBottom: 10,
        width: '90%',
        alignSelf: 'center'
    }
});