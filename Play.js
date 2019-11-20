import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { styles } from './App.js';


export default class PlayScreen extends React.Component {
  render(){
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Word Tetris!!!!</Text>
        </View>
      );
    }
  }
