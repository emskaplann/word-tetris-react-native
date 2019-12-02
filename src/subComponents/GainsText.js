import React from 'react';
import * as Animatable from 'react-native-animatable';

export default class GainsText extends React.Component {
  constructor(){
    super();
    this.state = {
      timer: 2,
      textColor: "#000000"
    }
  }

  componentDidMount(){
    this.interval = setInterval(this.decreaseTimer, 1000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  decreaseTimer = () => {
    this.setState({timer: this.state.timer - 1}, function(){
      if(this.state.timer === 0){
        this.setState({textColor: "#fff"})
      }
    })
  }

  render(){
    return(<Animatable.Text style={{
      color: this.state.textColor,
      fontWeight: 'bold',
      fontSize: 20,
      position: 'absolute',
      top: this.props.wordObj.positionTop,
      left: this.props.wordObj.positionLeft,
    }} animation="bounceInLeft" iterationCount={1} useNativeDriver={true} direction="alternate">+{this.props.wordObj.length}</Animatable.Text>)
  }
}
