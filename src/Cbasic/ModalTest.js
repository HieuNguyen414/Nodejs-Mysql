import React from 'react';
import Button from 'react-native-button'; //???
import Modal from 'react-native-modalbox';

import {
  AppRegistry,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TextInput
} from 'react-native';
var screen = Dimensions.get('window');

export default class ModalTest extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    };
  }
  renderList() {
    var list = [];
    for (var i=1;i<=50;i++) {
      list.push(<Text style={styles.text} key={i}>Elem {i}</Text>);
    }
    return list;
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <Button onPress={() => this.refs.modal6.open()} ><Text style={styles.btn}>Position bottom + ScrollView</Text></Button>
        <Button onPress={() => this.refs.modal7.open()}><Text  style={styles.btn}>Modal with keyboard support</Text></Button>
        
        <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal6"} swipeArea={20}>
          <ScrollView>
            <View style={{width: screen.width, paddingLeft: 10}}>
              {this.renderList()}
            </View>
          </ScrollView>
        </Modal>

        <Modal ref={"modal7"} style={[styles.modal, styles.modal4]} position={"center"}>
          <View>
            <TextInput style={{height: 50, width: 200, backgroundColor: '#DDDDDD'}}/>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal4: {
    height: 300
  }
});