import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Word from './Word.js'

export default class MultipleWords extends React.Component {
  constructor(){
    super();

    this.state = {
      activeWords: ["test"],
      id: 1
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
      this.handleLatestComp()
    })
  }

  handleLatestComp = () => {
    // let positions = React.Children.map(this.children, x => {
    //   return (x)
    // })
    // console.log(this.props)
  }

  renderWords = () => {
    // console.log(this.state)
    const transformedArray = this.state.activeWords.map((word) =>
    <Word text={word} handleEndGame={this.props.handleEndGame} positionTop={0}/>)
    // this.props.children = transformedArray
    console.log(transformedArray[1])
    return transformedArray;
  }

  render(){
    // console.log(this.state.activeWords)
    return(this.renderWords())
  }
}
