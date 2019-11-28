import React from 'react';
import { StyleSheet, Platform, Text, View, Button, TextInput} from 'react-native';
import MultipleWords from './MultipleWords.js';

  export const playScreenStyles = {
    text: {
      color: '#fff'
    }, gameBox: {
      position: 'absolute',
      top: 0,
      backgroundColor: '#fff',
      height: '50%',
      width: '100%',
    }, input: {
      position: Platform.OS === 'ios' ? 'absolute' : 'relative',
      top: 400,
      width: '92%',
      height: 30,
      fontSize: 25,
      fontWeight: 'bold',
      color: '#000000',
      borderWidth: 1,
      borderColor: '#000000',
      borderRadius: 0,
      backgroundColor: '#fff',
      textAlign: 'left',
    }, sendButton: {
      position: 'absolute',
      top: 400,
      borderRadius: 0,
      right: 0,
      width: '8%',
      backgroundColor: '#000000',
    }, container: {
      flexDirection: 'column',
      flex: 6,
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
    }, timerText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 250,
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
      diff: 1,
    }
  }

  componentDidMount(){
    this.fetchWords()
    this.postFetchUser()
    this.setState({diff: this.props.navigation.getParam('difficulty', '1')})
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
      return(<Text style={playScreenStyles.timerText}>{this.state.timer}</Text>)
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

  postFetchUser = () => {
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
      this.props.navigation.replace(({routeName: 'HighScores', params: {
        time: r.time,
        score: r.score,
        userName: r.user.username
      }}));
    })
  }

// game ends in this function => called back in child
  takeGameInfo = (time, score) => {
    this.setState({
      userTime: time,
      userScore: score,
    }, this.postFetchGame)
  }

  renderGameBox = () => {
    if(this.state.timer === 'finished'){
      return (
                <View style={playScreenStyles.gameBox}>

                  <MultipleWords words={this.state.words} difficulty={this.state.diff} handleEndGame={this.handleEndGame} sendGameInfo={this.takeGameInfo}/>
                </View>
                )
    } else {
      return(<Text style={playScreenStyles.text}>Something went wrong :/</Text>)
    }
  }

  render(){
      return (
        <View style={playScreenStyles.container}>
            { this.timer() }
            { this.renderGameBox() }
        </View>
      );
    }
  }
