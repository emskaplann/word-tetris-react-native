import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { styles } from './App.js';

const style = {
  slidingWords: {
    color: '#000000',
    fontWeight: 'bold',
    position: 'absolute',
  }
}

export default class Word extends React.Component {
  constructor(){
    super();

    this.state = {
      positionTop: 0,
      positionLeft: Math.floor(Math.random() * 325)
    }
  }

  componentDidMount(){
    this.interval = setInterval(this.slideWord, 10)
  }

  slideWord = () => {
    this.props.changeState()
    this.setState({
      positionTop: this.state.positionTop + 0.5
    })
  }

    renderWord = () => {
      const style2 = {
        color: '#000000',
        fontSize: 30,
        fontWeight: 'bold',
        position: 'absolute',
        top: this.state.positionTop,
        left: this.state.positionLeft
      }
      return(<Text style={style2}>{this.props.word}</Text>)
    }

    render(){
      return(this.renderWord())
    }
}
