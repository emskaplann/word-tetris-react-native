import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './Home.js'
import PlayScreen from './Play.js'
// styling
export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFF',
  }
});

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Play: {screen: PlayScreen},
});


const App = createAppContainer(MainNavigator);

export default App;
