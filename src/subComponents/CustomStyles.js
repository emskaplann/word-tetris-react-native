import React from 'react';
import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 6,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  }, subContainer: {
    flex:1,
    flexDirection:"row",
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  }, smSubContainer: {
    flex:0.7,
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
    fontSize: 45,
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
    fontSize: Platform.OS === 'ios' ? 50 : 30,
    fontWeight: 'bold',
    color: '#fff',
    width: '80%',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#000000',
    textAlign: 'center',
  }
});
