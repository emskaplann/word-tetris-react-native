import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, Platform, TextInput, TouchableHighlight } from 'react-native';
import Word from './Word.js'
import WordInput from './WordInput.js'

export default class MultipleWords extends React.Component {
  constructor(){
    super();

    this.state = {
      activeWords: ["test"],
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
    // console.log(this.props.words)
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
    clearInterval(this.interval)
    clearInterval(this.interval2)
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

  handleSubmit = (text) => {
    if(this.state.activeWords.includes(text)){
        let fakeArr = this.state.activeWords.filter(word => word !== text)
        this.setState({activeWords: fakeArr, score: this.state.score + text.length})
    } else {
      // do reject animation!
      // console.log('add animation')
    }
  }

  renderTextInput = () => {
      return(<WordInput handleSubmit={this.handleSubmit}/>)
  }

  renderWords = () => {
    const transformedArray = this.state.activeWords.map((word) => <Word text={word} key={word} handleEndGame={this.beforeHandleGame} />)
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
    console.log('mpwords updated')
    return(<View style={styles2.gameBox}>
            { this.renderWords() }
            { this.renderTextInput() }
          </View>)
  }
}
