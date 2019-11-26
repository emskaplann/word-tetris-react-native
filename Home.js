import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from './App.js';
import TextForUsername from './TextForUsername.js'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Home',
    };
    constructor(){
      super();

      this.state = {
        alert: false,
        textValue: ""
      }
    }

    handleSubmit = () => {
      const {navigate} = this.props.navigation

      if(this.state.textValue !== ""){
        navigate('Play', {userName: this.state.textValue})
        this.setState({alert: false})
        this.changeAlert(false)
      } else {
        this.changeAlert(true)
      }
    }

    getValue = (text) => {
      this.setState({
        textValue: text
      })
    }
// changing alert state based on user movements
    changeAlert = (bool) => {
      this.setState({ alert: bool })
    }

// rendering alert message for blank username field...
    showAlertMsg = () => {
      if(this.state.alert === false){

      } else if(this.state.alert === true){
        return( <Text style={styles.text}>put username.</Text> )
      }
    }

    shouldComponentUpdate(nextProps, nextState){
      if(nextState !== this.state){
        return true
      } else {
        return false
      }
    }

    render(){
      // background image => not looks good!
      // const imgBg = "./images/background-tetris.jpg"
      return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.subContainer}>
            {this.showAlertMsg()}
          </View>
        </View>
        <View style={styles.subContainer}>
          <TextForUsername handleChange={this.getValue}/>
        </View>
        <View style={styles.subContainer}>
            <TouchableOpacity
              style={styles.button}
              title="Play!"
              onPress={this.handleSubmit}
            >
              <Text style={styles.text2}>Play!</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.container}>
        </View>
      </View>
      );
    }
  }

  // <Text style={styles.text2}>{this.state.textValue}</Text>
