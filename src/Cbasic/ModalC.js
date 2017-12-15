import React, { Component } from 'react';
import {TextInput, TouchableOpacity, Text, View, Image, Alert, Dimensions} from 'react-native';
import Modal from 'react-native-modalbox';
const {height, width} = Dimensions.get('window');
// import {InsertData} from './Fetchdata';
import FlatListData from '../../config/data/FlatListData';

export default class ModalC extends Component {
  constructor(props){
    super(props);
    this.state = {
      // tipkey:'',
      tipname:'',
      tipage:'',
      tipaddress:'',
      tipdescription:'',
    }
  }
  // show modal
  showAddModal = ()=>{
    this.refs.modal1.open()
  }
  // random 1 key ngẫu nhiên và gán vào state, đầu vào là số ký tự => string
  // package: yarn add random-string
  generateKey = (numberOfCharacter)=>{
    return require('random-string')({length: numberOfCharacter})
  }
  render() {
    return (
      <Modal 
        ref = {"modal1"}
        position = "center"
        backdrop = {true}
        style = {{
          justifyContent:'center',
          borderRadius:10,
          width:width -80,
          height:300}}>

        <Text style = {{textAlign:'center'}}>Thêm dữ liệu</Text>  
        {/* <TextInput
          style = {{height:35, marginTop:5}}
          placeholder = "Key"
          value = {this.state.tipkey}
          onChangeText={(tipkey) => this.setState({tipkey})}
        /> */}
        <TextInput
          style = {{height:35, marginTop:5}}
          placeholder = "Name"
          value = {this.state.tipname}
          onChangeText={(tipname) => this.setState({tipname})}
        />
        <TextInput
          style = {{height:35, marginTop:5}}
          placeholder = "Age"
          value = {this.state.tipage}
          onChangeText={(tipage) => this.setState({tipage})}
        />
        <TextInput
          style = {{height:35, marginTop:5}}
          placeholder = "Address"
          value = {this.state.tipaddress}
          onChangeText={(tipaddress) => this.setState({tipaddress})}
        />
        <TextInput
          style = {{height:35, marginTop:5}}
          placeholder = "Description"
          value = {this.state.tipdescription}
          onChangeText={(tipdescription) => this.setState({tipdescription})}
        />
        <TouchableOpacity 
          style = {{ alignItems:'center',justifyContent:'center'}}
          onPress = {() =>{
            // kiểm tra thông tin 
            if(this.state.tipname.length == 0 || this.state.tipage.length == 0){
              alert('Bạn phải nhập tên, tuổi và địa chỉ')
              return;
            }
            const newKey = this.generateKey(24)
            const newData = {
              key:newKey, 
              name:this.state.tipname,
              age:this.state.tipage,
              address:this.state.tipaddress,
              description:this.state.tipdescription,
            };
            // đẩy đối tượng data vào trong flatlist 
            FlatListData.push(newData);
            // refresh lại Flatlist (hàm refreshFlatList ở BasicFlatList)
            this.props.parentFlatList.refreshDoc(newKey);
            // khi thêm xong thì sẽ tự động đóng modal lại
            this.refs.modal1.close()
            }}
        >
          <Text style = {{textAlign:'center', backgroundColor:'green', padding:8, width:50}}>Save</Text>
        </TouchableOpacity>

        {/* button hide modal */}
        <TouchableOpacity onPress = {()=>this.refs.modal1.close()}>
          <Text>Close</Text>
        </TouchableOpacity>
      </Modal>
    )
  }
}
