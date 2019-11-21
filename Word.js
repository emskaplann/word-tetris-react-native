import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { styles } from './App.js';

const style = {
  slidingWords: {
    color: '#000000',
    fontWeight: 'bold',
    position: 'absolute',
    positionLeft: 100,
  }
}

export default class Word extends React.Component {
  constructor(){
    super();

    this.state = {
    }
  }

  componentDidMount(){
  }



    renderWord = () => {
      return(<Text style={style.slidingWords}>-- {this.props.words[1]} --</Text>)
    }

    render(){
      return(this.renderWord())
    }
}
