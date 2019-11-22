import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Word from './Word.js'

export default class MultipleWords extends React.Component {
  constructor(){
    super();

    this.state = {
      activeWords: ["test"]
    }
  }

  componentDidMount(){
    this.interval = setInterval(this.addToActWords, 2500)
  }

  addToActWords = () => {
    let randNum = Math.floor(Math.random() * this.props.words.length)
    this.setState({
      activeWords: [...this.state.activeWords, this.props.words[randNum]]
    })
  }

  renderWords = () => {
    // console.log(this.state)
    const transformedArray = this.state.activeWords.map((word) =>
    <Word text={word} />)

    return transformedArray;
  }

  render(){
    // console.log(this.state.activeWords)
    return(this.renderWords())
  }
}
