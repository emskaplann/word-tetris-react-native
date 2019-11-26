import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { styles } from './App.js';
// bottom for gameBox is top: 390
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

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  slideWord = () => {
    this.setState({
      positionTop: this.state.positionTop + 0.5
    }, function(){
      if(this.state.positionTop === 390){
        this.props.handleEndGame()
      };
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
      return(<Text style={style2}>{this.props.text}</Text>)
    }

    render(){
      // console.log(this.props)
      return(this.renderWord())
    }
}
