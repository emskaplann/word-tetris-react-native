import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { styles } from './App.js';
import Word from './Word.js';

  const playScreenStyles = {
    text: {
      color: '#fff'
    }, gameBox: {
      position: 'absolute',
      top: 15,
      backgroundColor: '#fff',
      height: '50%',
      width: '100%',
    },
  }

export default class PlayScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      timer: 3,
      gameBoxRendered: false
    }
  }


  componentDidMount(){
    this.interval = setInterval(this.decreaseTimer, 1000)
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.state !== nextState || this.state.timer === 'finished'){
      return true
    }
    return false
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  decreaseTimer = () => {
    if(this.state.timer !== 1 && this.state.timer !== 'Go!'){
      this.setState({timer: this.state.timer - 1})
    } else if(this.state.timer === 'Go!'){
      clearInterval(this.interval)
      this.setState({timer: 'finished'})
      this.setState({gameBoxRendered: true})
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

  renderGameBox = () => {
    if(this.state.timer === 'finished'){
      console.log('true')
      return (
                <View style={playScreenStyles.gameBox}>
                  <Word />
                </View>
                )
    } else {
      // just for test purposes :)
      console.log('true2')
      return(<Text style={playScreenStyles.text}>Something went wrong :/</Text>)
    }
  }

  render(){
      return (
        <View style={styles.container}>
            { this.timer() }
            { this.renderGameBox() }
        </View>
      );
    }
  }
