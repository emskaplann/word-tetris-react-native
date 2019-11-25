import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Button} from 'react-native';
import { styles } from './App.js';


// everything is working fine just need to style everything
// hadi eyvallah
export default class HighScoreScreen extends React.Component {
  constructor(){
    super();

    this.state = {
      // when renders time it's true
      timeScores: false,
      scoreGames: [],
      buttonTitle: "see highest scores",
    }
  }
  componentDidMount(){
   this.setState({timeScores: true})
   this.interval = setInterval(this.fetchGamesScore, 2000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  fetchGamesScore = () => {
    if(this.state.timeScores){
      var ext = "time=longest"
    } else {
      var ext = "score=highest"
    }
    fetch(`https://calm-ocean-20734.herokuapp.com/games?${ext}`)
    .then(r => r.json())
    .then(r => {
      if(this.state.scoreGames.length < 5){
        const uniqArr = [...new Set(r)]
        this.setState({scoreGames: uniqArr})
      }
    })
  }

  renderTimeScores = () => {
    if(this.state.timeScores){
      const transformedArray = this.state.scoreGames.map((el, idx) =>
        <Text key={idx} style={{color: "#fff", fontSize: 30, fontWeight: 'bold'}}>{(idx + 1) + "." + el.user.username + ": " + el.time}<Text style={{fontWeight: "600", fontSize: 23, color: "#fff"}}> seconds</Text></Text>)
      return transformedArray;
    } else {
      const transformedArray = this.state.scoreGames.map((el, idx) =>
        <Text key={idx} style={{color: "#fff", fontSize: 30, fontWeight: 'bold'}}>{(idx + 1) + "." + el.user.username + ": " + el.score}<Text style={{fontWeight: "500", fontSize: 25, color: "#fff"}}> scores</Text></Text>)
      return transformedArray;
    }
  }

  renderHSLabel = () => {
    if(this.state.timeScores){
      return "Longest Times"
    } else {
      return "Highest Scores"
    }
  }

  handleBtn = () => {
    if(this.state.timeScores){
      this.setState({
        timeScores: false,
        buttonTitle: "see longest times",
        scoreGames: []
      })
    } else {
      this.setState({
        timeScores: true,
        buttonTitle: "see highest scores",
        scoreGames: []
      })
    }
  }

  render(){
    return(<View style={styles.container}>
            <Text style={{
                position: "absolute",
                top: 0,
                fontWeight: "bold",
                fontSize: 50,
                color: "#fff"
              }}>{this.renderHSLabel()}</Text>
            <View style={{height: "85%"}}>
              <ScrollView style={{marginHorizontal: 20, top: 0}}>
                {this.renderTimeScores()}
              </ScrollView>
              <Button
                title={this.state.buttonTitle}
                onPress={this.handleBtn}
                color="#fff"
                />
           </View>
          </View>)
  }
}
