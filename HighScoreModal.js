import React from 'react';
import {Modal, View, Text, TouchableHighlight} from 'react-native';

export default class HSModal extends React.Component {
  constructor(){
    super();
    this.state = {
      visible: true
    }
  }

  render(){
    return(
      <View>
        <Modal
          animationType="slide"
          transparent="false"
          visible={this.state.visible}
          onRequestClose={() => {}}
          >
          <View style={{height: "36%", width: "90%", padding: 10, borderWidth: 1, borderRadius: 10, borderColor: "#fff", position: 'absolute', top: 300, backgroundColor: "#000000", alignSelf: "center"}}>
            <TouchableHighlight
                onPress={() => {
                  this.setState({visible: false});
                }}>
                <Text style={{color: "#fff", fontWeight: 'bold', fontSize: 20, position: 'absolute', top: 0, right: 10}}>X</Text>
              </TouchableHighlight>
              <Text style={{color: "#fff", fontWeight: 'bold', fontSize: 50}}>your stats</Text>
          </View>
        </Modal>
      </View>
    )
  }
}
