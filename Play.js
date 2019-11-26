import React from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { styles } from './App.js';
import MultipleWords from './MultipleWords.js';

  export const playScreenStyles = {
    text: {
      color: '#fff'
    }, gameBox: {
      position: 'absolute',
      top: 15,
      backgroundColor: '#fff',
      height: '50%',
      width: '100%',
    }, input: {
      position: 'absolute',
      top: 400,
      width: '92%',
      height: 30,
      fontSize: 25,
      fontWeight: 'bold',
      color: '#000000',
      borderWidth: 1,
      borderColor: '#000000',
      borderRadius: 4,
      backgroundColor: '#fff',
      textAlign: 'left',
    }, sendButton: {
      position: 'absolute',
      top: 399,
      right: 0,
      width: '8%',
      backgroundColor: '#000000',
    }
  }

export default class PlayScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      timer: 3,
      gameBoxRendered: false,
      words: [],
      userTime: 0,
      userScore: 0,
      userId: 0,
    }
  }

  componentDidMount(){
    this.fetchWords()
    this.postFetchUser()
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
                  this.setState({words: [...this.state.words, word.toLowerCase()]})
                }
                // fetch works properly
             })
            }
          })
          this.setState({words: [...new Set(this.state.words)]})
        })
      }

// what happens when the game ends
// does it work? yes
  handleEndGame = () => {
    console.log('game has been ended')
    // when game ends renders highscores
  }

  postFetchUser = () => {
    console.log(this.props.navigation.getParam('userName', 'uName'))
    fetch("https://calm-ocean-20734.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }, body: JSON.stringify({
          username: this.props.navigation.getParam('userName', 'uName')
      })
    })
    .then(r => r.json())
    .then(r => {
      this.setState({
        userId: r.id
      })
    })
  }

  postFetchGame = () => {
    console.log(this.state)
    fetch("https://calm-ocean-20734.herokuapp.com/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }, body: JSON.stringify({
          time: this.state.userTime,
          score: this.state.userScore,
          user_id: this.state.userId
      })
    })
    .then(r => r.json())
    .then(r => {
      // console.log(r)
      this.props.navigation.replace(('HighScores': {game: {
        asd: "asd"
        // time: r.time,
        // score: r.score,
        // userName: r.user.username
      }}));
    })
  }

  takeGameInfo = (time, score) => {
    console.log(time, score)
    this.setState({
      userTime: time,
      userScore: score,
    }, this.postFetchGame)
  }

  renderGameBox = () => {
    if(this.state.timer === 'finished'){
      return (
                <View style={playScreenStyles.gameBox}>
                  <MultipleWords words={this.state.words} handleEndGame={this.handleEndGame} sendGameInfo={this.takeGameInfo}/>
                </View>
                )
    } else {
      return(<Text style={playScreenStyles.text}>Something went wrong :/</Text>)
    }
  }

  render(){
      // console.log('rendered')
      return (
        <View style={styles.container}>

            { this.timer() }
            { this.renderGameBox() }
        </View>
      );
    }
  }
