import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { styles } from './App.js'

export default class TextForUsername extends React.Component {
  constructor(){
    super();

    this.state = {
      text: ""
    }
  }

  randomUsernameGenerator = () => {
    randomDoubles = ['ll', 'xx', 'oo', 'kk', 'tt', 'ww', 'nn']
    let initialUsername = 'ba' + randomDoubles[Math.floor(Math.random() * 6)] + 'r' + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
    this.setState({
      text: initialUsername
    })
    this.handleInput(initialUsername)
  }
// handling input in every keystroke
  handleInput = (text) => {
    text = text.toLowerCase()
    if(text.length < 8){
      this.setState({text: text})
// sending info to the parent component which is home
      this.props.handleChange(text)
    } else {
      // no need to do anything
    }
  }

  componentDidMount(){
    this.randomUsernameGenerator()
  }

  render(){
    return (
      <TextInput
        placeholder="username..."
        style={styles.inputUsername}
        onChangeText={(text) => this.handleInput(text)}
        value={this.state.text}
      />
    );
  }
}
