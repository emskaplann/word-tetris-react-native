import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from './App.js';
import TextForUsername from './TextForUsername.js'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Home',
    };
    constructor(){
      super();

      this.state = {
        textValue: ""
      }
    }

    handleSubmit = () => {
      const {navigate} = this.props.navigation

      if(this.state.textValue !== ""){
        navigate('Play', {name: 'Jane'})
      } else {

      }
    }

    getValue = (text) => {
      this.setState({
        textValue: text
      })
    }

    render(){
      // background image => not looks good!
      // const imgBg = "./images/background-tetris.jpg"
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Word Tetris</Text>
          <TextForUsername handleChange={this.getValue}/>
            <TouchableOpacity
              style={styles.button}
              title="Play!"
              onPress={this.handleSubmit}
            >
              <Text style={styles.text2}>Play!</Text>
            </TouchableOpacity>
            <Text style={styles.text2}>{this.state.textValue}</Text>
        </View>
      );
    }
  }
