import React from 'react';
import {Modal, View, Text, Platform, Dimensions, TouchableHighlight} from 'react-native';

export default class HSModal extends React.Component {
  constructor(){
    super();
    this.state = {
      visible: true
    }
  }

  render(){
    const modalLocationNum = Platform.OS == 'ios' ? 40 : 40
    const modalLocation = Math.floor((Math.round(Dimensions.get('window').height) / 100) * modalLocationNum )
    return(
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.visible}
          onRequestClose={() => {this.setState({visible: false})}}
          >
          <View style={{width: "90%", padding: 10, borderWidth: 1, borderRadius: 10, borderColor: "#fff", top: modalLocation, backgroundColor: "#000000", alignSelf: "center"}}>
            <TouchableHighlight
                onPress={() => {
                  this.setState({visible: false});
                }}>
                <Text style={{color: "#fff", fontWeight: 'bold', fontSize: 30, alignSelf: 'flex-end',}}>x</Text>
              </TouchableHighlight>
              <Text style={{color: "#fff", fontWeight: 'bold', fontSize: 50, position: 'absolute', top: 10, paddingLeft: 5}}>your stats</Text>
              <Text style={{color: "#fff", fontWeight: '700', fontSize: 40, paddingLeft: 10, paddingTop: 30}}>{this.props.userName}</Text>
              <Text style={{color: "#fff", fontWeight: '700', fontSize: 30, paddingLeft: 15}}>time: {this.props.time}</Text>
              <Text style={{color: "#fff", fontWeight: '700', fontSize: 30, paddingLeft: 15}}>score: {this.props.score}</Text>
          </View>
        </Modal>
      </View>
    )
  }
}
