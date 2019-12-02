import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, Platform, TextInput, TouchableHighlight } from 'react-native';
import Word from './Word.js'
import WordInput from './WordInput.js'
import GainsText from './GainsText.js'
import * as Animatable from 'react-native-animatable';


export default class MultipleWords extends React.Component {
  constructor(){
    super();

    this.state = {
      activeWords: [],
      score: 0,
      time: 0,
      wordLoc: {positionTop: 0, positionLeft: 0, length: 0}
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
    if(this.state.activeWords !== nextState.activeWords || this.state.wordLoc !== nextState.wordLoc){
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

  handleSubmit = (text) => {
    let fakeArr = this.state.activeWords.filter(word => word !== text)
    if(this.state.activeWords.includes(text)){
      this.setState({activeWords: fakeArr, score: this.state.score + text.length})
    } else {
      this.shake()
    }
  }

  // Animation for gameBox
  handleViewRef = ref => this.view = ref;
  shake = () => this.view.shake(300)


  renderTextInput = () => {
      return(<WordInput handleSubmit={this.handleSubmit}/>)
  }

  sendWordLoc = (wordLoc) => {
    this.setState({wordLoc: wordLoc})
  }

  renderGains = () => {
    if(this.state.wordLoc.length !== 0){
      return(<GainsText key={this.state.wordLoc.positionTop} wordObj={this.state.wordLoc}/>)
    }
  }

  renderWords = () => {
    const transformedArray = this.state.activeWords.map((word) => <Word text={word} key={word} sendWordLoc={this.sendWordLoc} handleEndGame={this.beforeHandleGame}/>)
    if(transformedArray.length === 0){
      return;
    }
    return transformedArray;
  }

  render(){
    const styles2 = {gameBox: {
      position: 'absolute',
      top: 0,
      backgroundColor: '#fff',
      height: Platform.OS == 'ios' ? '55%' : '55%',
      width: '100%',
    }}
    return(<Animatable.View ref={this.handleViewRef} style={styles2.gameBox}>
            <View style={{positon: 'absolute', top: 0, backgroundColor: "#000000"}}><Text style={{color: "#fff", alignSelf: 'flex-start', fontSize: 10, fontWeight: 'bold'}}>score: {this.state.score}</Text><Text style={{color: "#fff", alignSelf: 'flex-end', position: 'absolute', top: 0,fontSize: 10, fontWeight: 'bold'}}>time: {this.state.time}</Text><Text style={{color: "#fff", alignSelf: 'center', position: 'absolute', top: 0,fontSize: 10, fontWeight: 'bold'}}>{this.props.username}</Text></View>
            { this.renderGains() }
            { this.renderWords() }
            { this.renderTextInput() }
          </Animatable.View>)
  }
}
