import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { styles } from './App.js';
import Word from './Word.js';

  const playScreenStyles = {
    text: {
      color: '#fff'
    }, gameBox: {
      position: 'absolute',
      top: 15,
      backgroundColor: '#fff',
      height: '50%',
      width: '100%',
    },
  }

export default class PlayScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      timer: 3,
      gameBoxRendered: false,
      words: []
    }
  }


  componentDidMount(){
    this.fetchWords()
    this.interval = setInterval(this.decreaseTimer, 1000)
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.state !== nextState || this.state.timer === 'finished'){
      return true
    }
    return false
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  decreaseTimer = () => {
    if(this.state.timer !== 1 && this.state.timer !== 'Go!'){
      this.setState({timer: this.state.timer - 1})
    } else if(this.state.timer === 'Go!'){
      clearInterval(this.interval)
      this.setState({timer: 'finished'})
      this.setState({gameBoxRendered: true})
    } else {
      this.setState({timer: 'Go!'})
    }
  }

  timer = () => {
    if(this.state.timer !== 0){
        if(this.state.timer !== 'Go!' && this.state.timer !== 1 && this.state.timer !== 2 && this.state.timer !== 3){
          return clearInterval(this.interval)
        }
      return(<Text style={styles.timerText}>{this.state.timer}</Text>)
    } else {
      clearInterval(this.interval)
    }
  }

  // fetching words from NEWS API...
    fetchWords = () => {
      let url = 'https://newsapi.org/v2/top-headlines?' +
            'country=us&' +
            'apiKey=277ca875809f4f6484e5d830b2158bef'
      fetch(url)
      .then(r => r.json())
      .then(response => {
        response.articles.forEach(article => {
        if (article.description != null) {
            article.description.split(" ").forEach(word => {
                word = word.replace(/[^a-zA-Z0-9 -]/g,"")
                if( word == "" || word == " " || word == "--" ){

                } else {
                  this.setState({words: [...this.state.words, word]})
                }
                // fetch works properly
           })
          }
        })
      })
    }

  renderGameBox = () => {
    if(this.state.timer === 'finished'){
      console.log('true')
      return (
                <View style={playScreenStyles.gameBox}>
                  <Word words={this.state.words}/>
                </View>
                )
    } else {
      return(<Text style={playScreenStyles.text}>Something went wrong :/</Text>)
    }
  }

  render(){
      return (
        <View style={styles.container}>
            { this.timer() }
            { this.renderGameBox() }
        </View>
      );
    }
  }
