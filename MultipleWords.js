import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import Word from './Word.js'
import { playScreenStyles } from './Play.js'

export default class MultipleWords extends React.Component {
  constructor(){
    super();

    this.state = {
      activeWords: ["test"],
      input: "",
      score: 0,
      time: 0,
    }
  }

  componentDidMount(){
    this.interval = setInterval(this.addToActWords, 3000)
    this.interval2 = setInterval(this.increaseTime, 1000)
  }

  addToActWords = () => {
    let randNum = Math.floor(Math.random() * this.props.words.length)
    this.setState({
      activeWords: [...this.state.activeWords, this.props.words[randNum]]
    })
  }

  increaseTime = () => {
    this.setState({
      time: this.state.time + 1
    })
  }

  handleInput = (text2) => {
    text = text2.toLowerCase()
    this.setState({input: text})
  }

  componentWillUnmount(){
    console.log('unmount')
    clearInterval(this.interval)
    clearInterval(this.interval2)
  }

  beforeHandleGame = () => {
    this.props.sendGameInfo(this.state.time, this.state.score)
  }

  handleSubmit(){
    // console.log("in handleSubmit")
    let text = this.state.input
    // console.log(text)
    if(this.state.activeWords.includes(text)){
        let fakeArr = this.state.activeWords.filter(word => word !== text)
        this.setState({activeWords: fakeArr, input: "", score: this.state.score + text.length})
    } else {
      // do reject react!
      console.log('nope')
    }
  }

  renderTextInput = () => {
      return(<View style={playScreenStyles.inputContainer}>
        <TextInput
        style={playScreenStyles.input}
        onChangeText={(text) => this.handleInput(text)}
        value={this.state.input}
      />
    <TouchableHighlight style={playScreenStyles.sendButton} onPress={()=> this.handleSubmit()}>
      <View>
        <Icon name="send" color="#fff" size={30}/>
      </View>
      </TouchableHighlight>
    </View>)
  }

  renderWords = () => {
    const transformedArray = this.state.activeWords.map((word) =>
    <Word text={word} key={word} handleEndGame={this.beforeHandleGame} />)
    return transformedArray;
  }

  render(){
    return(<View>
            { this.renderWords() }
            { this.renderTextInput() }
          </View>)
  }
}
