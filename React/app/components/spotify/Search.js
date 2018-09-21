import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class Search extends Component {
    constructor({ text }) {
        super();

        this.state = {
            text: text || '',
        };
    }

    handleChangeText(newText) {
        const { onChange } = this.props;

        this.setState({
            text: newText,
        }, () => {
            onChange && onChange(newText);
        });
    }

   render() {
    const { text } = this.state;

    return (
      <View style={styles.container}>
        <FontAwesome style={styles.inputIcon}>{Icons.search}</FontAwesome>
        <TextInput
          style={styles.input}
          value={text}
          underlineColorAndroid={"transparent"}
          placeholder="Search here..."
          onChangeText={newText => this.handleChangeText(newText)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      marginTop: 40,
      marginBottom: 20,
      borderWidth: 1,
      borderRadius: 30,
      width:'80%',
      alignSelf: 'center',
      borderColor: 'black',
      flexDirection:'row',
      justifyContent: 'space-between'
    },
    input: {
      flex:3,
      padding: 2,
      color: 'black',
      fontSize: 15,
    },
    inputIcon: {
      alignSelf:'center', 
      marginLeft: 7, 
      marginRight: 7, 
      color: 'black'
    }
  });
  
  
