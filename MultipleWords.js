import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, Platform, TextInput, TouchableHighlight } from 'react-native';
import Word from './Word.js'
import WordInput from './WordInput.js'
import * as Animatable from 'react-native-animatable';


export default class MultipleWords extends React.Component {
  constructor(){
    super();

    this.state = {
      activeWords: [{word: {self: "test", shouldAnimate: false}}],
      score: 0,
      time: 0,
    }
  }

  componentDidMount(){
    let wordsRainRate = 2000
    if(this.props.difficulty === 0){
      wordsRainRate = 3000
    } else if(this.props.difficulty === 2){
      wordsRainRate = 1000
    }
    this.interval = setInterval(this.addToActWords, wordsRainRate)
    this.interval2 = setInterval(this.increaseTime, 1000)
  }

  addToActWords = () => {
    let randNum = Math.floor(Math.random() * this.props.words.length)
    while(this.state.activeWords.includes(this.props.words[randNum])){
      randNum = Math.floor(Math.random() * this.props.words.length)
    }
    this.setState({
      activeWords: [...this.state.activeWords, this.props.words[randNum]]
    })
  }

  increaseTime = () => {
    this.setState({
      time: this.state.time + 1
    })
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.state.activeWords !== nextState.activeWords){
      return true
    }
    return false
  }

  componentWillUnmount(){
    this.clearIntervals()
  }

  clearIntervals = () => {
    clearInterval(this.interval)
    clearInterval(this.interval2)
  }

  beforeHandleGame = () => {
    this.props.sendGameInfo(this.state.time, this.state.score)
    this.clearIntervals()
    this.setState({ activeWords: [] })
  }

  checkForWord = (text) => {
    let word = this.state.activeWords.find(el => {
      return el.word.self == text
    })
    if(word !== undefined){
      return true
    }
  }

  handleSubmit = (text) => {
    let fakeArr = this.state.activeWords.filter(word => word.word.self !== text)
    if(this.checkForWord(text)){
      this.setState({activeWords: fakeArr, score: this.state.score + text.length})
    } else {
      this.shake()
    }
  }

  // Animation for gameBox
  handleViewRef = ref => this.view = ref;
  shake = () => this.view.shake(300).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));


  renderTextInput = () => {
      return(<WordInput handleSubmit={this.handleSubmit}/>)
  }

  renderWords = () => {
    const transformedArray = this.state.activeWords.map((word) => <Word text={word.word.self} key={word.word.self} shouldAnimate={word.word.shouldAnimate} handleEndGame={this.beforeHandleGame} />)
    return transformedArray;
  }

  render(){
    const styles2 = {gameBox: {
      position: 'absolute',
      top: 0,
      backgroundColor: '#fff',
      height: Platform.OS == 'ios' ? '45%' : '55%',
      width: '100%',
    }}
    return(<Animatable.View ref={this.handleViewRef} style={styles2.gameBox}>
            { this.renderWords() }
            { this.renderTextInput() }
          </Animatable.View>)
  }
}
