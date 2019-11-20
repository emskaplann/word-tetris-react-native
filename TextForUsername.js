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

  handleInput = (text) => {
    this.setState({text: text})
    this.props.handleChange(text)
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
