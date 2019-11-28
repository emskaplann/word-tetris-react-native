import React from 'react';
import { StyleSheet, Dimensions, Text, View, Button, Platform } from 'react-native';

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
      const limitNum = Platform.OS == 'ios' ? 40 : 34
      const limit = Math.floor((Math.round(Dimensions.get('window').height) / 100) * limitNum )
      if(this.state.positionTop >= limit){
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
