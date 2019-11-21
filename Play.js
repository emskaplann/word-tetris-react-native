import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { styles } from './App.js';


export default class PlayScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      timer: 3
    }
  }
  componentDidMount(){
    this.interval = setInterval(this.decreaseTimer, 1000)
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.state !== nextState){
      return true
    }
    return false
  }

  decreaseTimer = () => {
    if(this.state.timer !== 1){
      this.setState({timer: this.state.timer - 1})
    } else {
      this.setState({timer: 'Go!'})
    }
  }

  timer = () => {
    if(this.state.timer !== 0){
        if(this.state.timer !== 'Go!' && this.state.timer !== 1 && this.state.timer !== 2 && this.state.timer !== 3){
          return clearInterval(this.interval)
        }
      return(<Text style={styles.timerText}>{this.state.timer}</Text>)
    } else {
      clearInterval(this.interval)
    }
  }

  render(){
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Word Tetris!!!!</Text>
            { this.timer() }
        </View>
      );
    }
  }
