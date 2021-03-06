import React from 'react';
import { StyleSheet, Platform, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MultipleWords from './MultipleWords.js';
  export const playScreenStyles = {
    text: {
      color: '#fff'
    }, gameBox: {
      position: 'absolute',
      top: 0,
      backgroundColor: '#fff',
      height: Platform.OS == 'ios' ? '45%' : '40%',
      width: '100%',
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
      timer: 1,
      gameBoxRendered: false,
      words: [],
      userTime: 0,
      userScore: 0,
      userId: 0,
      diff: 1,
      gamesTime: [],
      gamesScore: [],
    }
  }

  componentDidMount(){
    this.fetchGames()
    this.fetchWords()
    this.postFetchUser()
    this.setState({diff: this.props.navigation.getParam('difficulty', '1')})
    this.interval = setInterval(this.decreaseTimer, 1000)
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.state.timer !== nextState.timer){
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
      return(<Animatable.Text animation="pulse" duration={1100} iterationCount={3} style={playScreenStyles.timerText}>{this.state.timer}</Animatable.Text>)
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
            article.description.split(" ").forEach((word) => {
                word = word.replace(/[^a-zA-Z0-9 -]/g,"")
                if( word == "" || word == " " || word == "--" || this.state.words.includes(word) || word.includes('-')){

                } else {
                  this.setState({words: [...this.state.words, word.toLowerCase()]})
                }
                // fetch works properly
             })
            }
          })
        })
      }

  fetchGames(){
    fetch("https://calm-ocean-20734.herokuapp.com/games?time=longest")
    .then(r => r.json())
    .then(r => {
      this.setState({gamesTime: r.map(game => game.time)})
    })
    fetch("https://calm-ocean-20734.herokuapp.com/games?score=highest")
    .then(r => r.json())
    .then(r => {
      this.setState({gamesScore: r.map(game => game.score)})
    })
  }

  postFetchUser = () => {
    if(this.props.navigation.getParam('userName', 'uName') == 'uName'){
      this.setState({
        userId: this.props.navigation.getParam('userId', 'uId')
      })
    } else {
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
      this.setState({gamesScore: [...this.state.gamesScore, r.score]})
      let scores = this.state.gamesScore.sort((a, b) => b - a)
      this.setState({gamesTime: [...this.state.gamesTime, r.time]})
      let times = this.state.gamesTime.sort((a, b) => b - a)

      this.props.navigation.replace(({routeName: 'HighScores', params: {
        time: r.time,
        rankInTime: 1 + times.indexOf(r.time),
        score: r.score,
        rankInScore: 1 + scores.indexOf(r.score),
        userName: r.user.username,
        userId: r.user.id,
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
      return (<MultipleWords words={this.state.words} username={this.props.navigation.getParam('userName', 'uName')} difficulty={this.state.diff} sendGameInfo={this.takeGameInfo}/>)
    } else {
      // return(<Text style={playScreenStyles.text}>Something went wrong :/</Text>)
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
