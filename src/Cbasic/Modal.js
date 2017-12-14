import React, { Component } from 'react';
import { View, Button, Image, Alert } from 'react-native'
import { StyleSheet, TextInput, Dimensions, TouchableOpacity, Text} from 'react-native';
import Modal from 'react-native-modalbox'
const { width, height } = Dimensions.get('window');

export default class AddModal  extends Component {
  constructor(props){
    super(props);
    this.state = {
      isModalVisible: false,
      tipname:'',
      tipage:'',
      tipaddress:'',
      tipimage:'',
      tipdescription:'',
      data: [],
    }
  }
  showAddModal = ()=>{
    this.refs.modalcreate.open()
  }
  render() {
    return (
      <Modal 
        ref = {"modalcreate"}
        style = {{
          justifyContent:'center',
          borderRadius:10,
          width:width -80,
          height:288}}
        position = "center"
        backdrop = {true}
        onClosed = {()=>{alert('Modal closed')}}>
        <Text>Thêm dữ liệu</Text>
      </Modal>
    )
  }
}
// b2 -component muốn dùng chỉ cần inport
// <AddModal ref={"modalcreate"} parentFlatlist = {this}> 
// </AddModal>
// b3 - gọi modal: 
// this.refs.modalcreate.showAddModal()