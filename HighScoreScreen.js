import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './App.js';


// everything is working fine just need to style everything
// hadi eyvallah
export default class HighScoreScreen extends React.Component {
  constructor(){
    super();

    this.state = {
      // when renders time it's true
      timeScores: true,
      scoreGames: []
    }
  }
  componentDidMount(){
   this.fetchGamesScore()
  }

  fetchGamesScore = () => {
    fetch("https://calm-ocean-20734.herokuapp.com/games?time=longest")
    .then(r => r.json())
    .then(r => {
      const uniqArr = [...new Set(r)]
      this.setState({scoreGames: uniqArr})
    })
  }

  renderTimeScores = () => {
    const transformedArray = this.state.scoreGames.map((el, idx) =>
      <Text style={{color: "#fff", fontSize: 30, fontWeight: 'bold'}}>{(idx + 1) + "." + el.user.username + ": " + el.time}</Text>)
    return transformedArray;
  }

  render(){
    return(<View style={styles.container}>
            <ScrollView style={{marginHorizontal: 20}}>
              {this.renderTimeScores()}
            </ScrollView>
          </View>)
  }
}
