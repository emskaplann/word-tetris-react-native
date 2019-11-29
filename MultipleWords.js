import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, Platform, TextInput, TouchableHighlight } from 'react-native';
import Word from './Word.js'

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

  handleSubmit(){
    let text = this.state.input
    if(this.state.activeWords.includes(text)){
        let fakeArr = this.state.activeWords.filter(word => word !== text)
        this.setState({activeWords: fakeArr, input: "", score: this.state.score + text.length})
    } else {
      // do reject animation!
      // console.log('add animation')
    }
  }

  renderTextInput = () => {
      // nov 28, 2019 => limitNum 33 is working
      const limitNum = Platform.OS == 'ios' ? 40 : 40
      const inputLocation = (this.props.deviceHeight / 100) * limitNum
      const styles = {inputContainer: {
        backgroundColor: '#000000',
        width: '100%',
        height: '100%',
        top: inputLocation,
      }, input: {
        width: '92%',
        height: 30,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000000',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 0,
        backgroundColor: '#fff',
      }, sendButton: {
        position: 'absolute',
        right: 0,
        width: '8%',
        backgroundColor: '#000000',
      }}
      return(
      <View style={styles.inputContainer}>
        <TextInput
        style={styles.input}
        onChangeText={(text) => this.setState({input: text.toLowerCase()})}
        value={this.state.input}
        />
        <TouchableHighlight style={styles.sendButton} onPress={()=> this.handleSubmit()}>
            <Icon name="send" color="#fff" size={30}/>
        </TouchableHighlight>
      </View>)
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
    return(<View style={styles2.gameBox}>
            { this.renderWords() }
            { this.renderTextInput() }
          </View>)
  }
}
