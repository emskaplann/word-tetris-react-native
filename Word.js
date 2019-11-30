import React from 'react';
import { StyleSheet, Dimensions, Text, View, Button, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';

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
    // ideal number for android => 55-60
    const repeatRate = Platform.OS == 'ios' ? 15 : 55
    this.interval = setInterval(this.slideWord, repeatRate)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  slideWord = () => {
    const increaseRate = Platform.OS == 'ios' ? 0.52 : 0.8
    this.setState({
      positionTop: this.state.positionTop + increaseRate
    }, function(){
      const limitNum = Platform.OS == 'ios' ? 40 : 40
      const limit = Math.floor((Math.round(Dimensions.get('window').height) / 100) * limitNum )
      if(this.state.positionTop >= limit){
        this.props.handleEndGame()
      };
    })
  }

  // Animation --- Still incomplete
  handleTextRef = ref => this.text = ref;
  bounce = () => this.text.pulse(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

    renderWord = () => {
      const style2 = {
        color: '#000000',
        fontSize: 30,
        fontWeight: 'bold',
        position: 'absolute',
        top: this.state.positionTop,
        left: this.state.positionLeft
      }
      return(<Animatable.Text style={style2} ref={this.handleTextRef}>{this.props.text}</Animatable.Text>)
    }

    render(){
      return(this.renderWord())
    }
}
