import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Word from './Word.js'
import { playScreenStyles } from './Play.js'

export default class MultipleWords extends React.Component {
  constructor(){
    super();

    this.state = {
      activeWords: ["test"],
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
    })
  }

  handleInput = (text) => {
    this.setState({input: text})
    if(this.state.activeWords.includes(text.toLowerCase())){
      let fakeArr = this.state.activeWords.filter(word => word !== text.toLowerCase())
      // console.log(fakeArr)
      this.setState({activeWords: fakeArr, input: ""})
    } else{
      // console.log('bilemedin aq cocu')
    }
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  componentWillUpdate(nextProps, nextState){

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
    <Word text={word} key={word} handleEndGame={this.props.handleEndGame} />)
    // console.log(transformedArray[0])
    return transformedArray;
  }

  render(){
    return(<View>
            { this.renderWords() }
            { this.renderTextInput() }
          </View>)
  }
}
