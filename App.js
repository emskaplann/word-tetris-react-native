import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './Home.js'
import PlayScreen from './Play.js'
import HighScoreScreen from './HighScoreScreen.js'
// styling
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 6,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  }, subContainer: {
    flex:2,
    flexDirection:"row",
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  }, text: {
    color: '#fff',
    // changing positi
    top: 10,
    position: 'absolute',
    // end of changing position
    fontWeight: 'bold',
    fontSize: 30,
  }, text2: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 75,
  }, timerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 250,
  }, button: {
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#000000',
    fontWeight: 'bold',
    fontSize: 50,
  }, backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }, inputUsername: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
    width: '80%',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#000000',
    textAlign: 'center',
  }
});

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Play: {screen: PlayScreen},
  HighScores: {screen: HighScoreScreen}
});


const App = createAppContainer(MainNavigator);

export default App;
