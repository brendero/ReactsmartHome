import React, { Component } from 'react';
import { 
  View, 
  Image,
  Text,
  StyleSheet } from 'react-native';
import PlayButton from './PlayButton';

 export default ({
  item: {
    imageUri,
    title,
    soundUri
  }
}) => (
  <View style={styles.container}>
    <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }}/>
    <Text>{title}</Text>
    <PlayButton soundUri={soundUri}/>
  </View>
);

const styles= StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingRight: 20
  }
});