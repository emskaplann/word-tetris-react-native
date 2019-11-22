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

  handleInput = (text2) => {
    text = text2.toLowerCase()
    this.setState({input: text})
    // if(this.state.activeWords.includes(text.toLowerCase())){
    //   let fakeArr = this.state.activeWords.filter(word => word !== text)
    //   // console.log(fakeArr)
    //   this.setState({activeWords: fakeArr, input: ""})
    // } else{
    //   // console.log('bilemedin aq cocu')
    // }
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  handleSubmit(){
    console.log("in handleSubmit")
    let text = this.state.input
    console.log(text)
    if(this.state.activeWords.includes(text)){
        let fakeArr = this.state.activeWords.filter(word => word !== text)
        this.setState({activeWords: fakeArr, input: ""})
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
