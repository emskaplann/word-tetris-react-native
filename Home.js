import React from 'react';
import { Platform, Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import TextForUsername from './TextForUsername.js';
import { ButtonGroup } from 'react-native-elements';
import { styles } from './CustomStyles.js';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Home',
    };
    constructor(){
      super();

      this.state = {
        intro: true,
        alert: false,
        textValue: "",
        selectedDiff: 1,
        deviceHeight: Math.round(Dimensions.get('window').height),
      }
    }

    changeSelectedDiff = (newDif) => {
      this.setState({
        selectedDiff: newDif
      })
    }

    handleSubmit = () => {
      const {navigate} = this.props.navigation

      if(this.state.textValue !== ""){
        navigate('Play', {userName: this.state.textValue, difficulty: this.state.selectedDiff, deviceHeight: this.state.deviceHeight})
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
        return( <Text style={styles.text}>username</Text> )
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

      // assigning buttons for difficulty choose
      const buttons = ['easy', 'medium', 'hard']
      const { newDiff } = this.state.selectedDiff
      // checking device height for layout style purposes
      console.log(this.state.deviceHeight)
      return (
      <View style={styles.container}>
          <View style={styles.smSubContainer}>
            {this.showAlertMsg()}
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
            <Animatable.Text animation="pulse" duration={600} iterationCount="infinite" direction="alternate" style={styles.text2}><Text>play {buttons[this.state.selectedDiff]}</Text></Animatable.Text>
            </TouchableOpacity>
        </View>
        <View style={styles.subContainer}>
          <ButtonGroup
              onPress={this.changeSelectedDiff}
              selectedIndex={newDiff}
              buttons={buttons}
              containerStyle={{height: 25, width: '55%', backgroundColor: "#000000"}}
              textStyle={{color: "#fff", fontWeight: 'bold'}}
              containerBorderRadius={2}
              innerBorderStyle={{width: 1, color: "#fff"}}
            />
        </View>
        <View style={styles.container}>
        </View>
      </View>
      );
    }
  }

  // <Text style={styles.text2}>{this.state.textValue}</Text>
