import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from './App.js';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Home',
    };
    render(){
      const {navigate} = this.props.navigation
      // background image => not looks good!
      // const imgBg = "./images/background-tetris.jpg"
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Word Tetris</Text>
            <TouchableOpacity
              style={styles.button}
              title="Play!"
              onPress={() => navigate('Play', {name: 'Jane'})}
            >
              <Text style={styles.text2}>Play!</Text>
            </TouchableOpacity>
        </View>
      );
    }
  }
