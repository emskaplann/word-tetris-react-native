import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Word from './Word.js'
import { playScreenStyles } from './Play.js'

export default class MultipleWords extends React.Component {
  constructor(){
    super();

    this.state = {
      activeWords: ["test"],
      id: 1,
      input: "",
    }
  }

  componentDidMount(){
    this.interval = setInterval(this.addToActWords, 3000)
  }

  addToActWords = () => {
    let randNum = Math.floor(Math.random() * this.props.words.length)
    this.setState({
      activeWords: [...this.state.activeWords, this.props.words[randNum]]
    }, function(){
    })
  }

  handleInput = (text) => {
    this.setState({input: text})
    if(this.state.activeWords.includes(text.toLowerCase())){
      let fakeArr = this.state.activeWords
      let idx = fakeArr.indexOf(text.toLowerCase())
      if( idx !== -1){
        fakeArr.splice(idx, 1)
      }
      this.setState({activeWords: fakeArr})
      this.setState({input: ""})
    } else{
      console.log('bilemedin aq cocu')
    }
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  renderTextInput = () => {
      return(<TextInput
        style={playScreenStyles.input}
        onChangeText={(text) => this.handleInput(text)}
        value={this.state.input}
      />)
  }

  renderWords = () => {
    const transformedArray = this.state.activeWords.map((word, idx) =>
    <Word text={word} key={idx} handleEndGame={this.props.handleEndGame} positionTop={0}/>)
    return transformedArray;
  }

  render(){
    return(<View>
            { this.renderWords() }
            { this.renderTextInput() }
          </View>)
  }
}
