import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, Platform, TextInput, TouchableHighlight, Dimensions } from 'react-native';

const limitNum = Platform.OS == 'ios' ? 40 : 40
const inputLocation = (Math.round(Dimensions.get('window').height) / 100) * limitNum
const styles = {inputContainer: {
  backgroundColor: '#000000',
  width: '100%',
  height: '100%',
  top: inputLocation,
}, input: {
  width: '92%',
  height: 30,
  fontSize: 25,
  fontWeight: 'bold',
  color: '#000000',
  borderWidth: 1,
  borderColor: '#000000',
  borderRadius: 0,
  backgroundColor: '#fff',
}, sendButton: {
  position: 'absolute',
  right: 0,
  width: '8%',
  backgroundColor: '#000000',
}}

export default class WordInput extends React.Component {
  constructor(){
    super();
    this.state = {
      input: ""
    }
  }

  handleTextChange = (text) => {
    this.setState({input: text.toLowerCase()})
  }

  handleSubmit = () => {
    this.props.handleSubmit(this.state.input)
    this.setState({input: ""})
  }


  renderWordInput = () => {
    return(<View style={styles.inputContainer}>
             <TextInput
              style={styles.input}
              onChangeText={(text) => this.handleTextChange(text)}
              value={this.state.input}
              />
             <TouchableHighlight style={styles.sendButton} onPress={this.handleSubmit}>
                <Icon name="send" color="#fff" size={30}/>
             </TouchableHighlight>
           </View>)
  }

  render(){
    return(this.renderWordInput())
  }
}
