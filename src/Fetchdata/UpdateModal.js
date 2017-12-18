import React, { Component } from 'react';
import {TextInput, TouchableOpacity, Text, View, Image, Alert, Dimensions} from 'react-native';
import Modal from 'react-native-modalbox';
const {height, width} = Dimensions.get('window');
import {UpdateData} from './Fetchdata';

export default class UpdateModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      tipname:'',
      tipage:'',
      tipaddress:'',
      tipimage:'',
      tipdescription:'',
    }
  }

  showEditModal = (chinhsua, danhsach) => {
    this.setState({
      // lấy từ state truyền vào textinput
      id: chinhsua._id,
      tipname:chinhsua.name,
      tipage:chinhsua.age,
      tipaddress:chinhsua.address,
      tipdescription:chinhsua.description,
    });
    this.refs.modalupdate.open();
  }
  render() {
    return (
      <Modal 
        ref = {"modalupdate"}
        position = "center"
        backdrop = {true}
        // onClosed = {()=>{alert('Modal closed')}}
        style = {{
          justifyContent:'center',
          borderRadius:10,
          width:width -80,
          height:300}}>

        <Text style = {{textAlign:'center'}}>Chỉnh sửa dữ liệu</Text>
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
          style = {{
            alignItems:'center', 
            justifyContent:'center'}}
          onPress = {() =>{
            if(this.state.tipname.length == 0 || this.state.tipage.length == 0 || this.state.tipaddress.length == 0){
              alert('Bạn phải nhập tên, tuổi và địa chỉ')
              return;
            }
            // tìm phần tử muốn update
            let params = {
              id_id: this.state.id,
              name:this.state.tipname,
              age:this.state.tipage,
              address:this.state.tipaddress,
              description:this.state.tipdescription
              
            }
            UpdateData(params).then(()=>{
              this.state.FlatListItem.refreshFlatListItem({
                _id: this.state.id,
                name:this.state.tipname,
                age:this.state.tipage,
                address:this.state.tipaddress,
                description:this.state.tipdescription
              });
              this.refs.modalupdate.close();
            }).catch((error)=>{
              console.log('Eror');
              this.refs.modalupdate.close();
            });
            // refresh lại dữ liệu từ flatlis
            // this.state.FlatListItem.refreshFlatListItem();
            // this.refs.modalupdate.close();
            }}
        >
          <Text 
            style = {{
              textAlign:'center', 
              backgroundColor:'green', 
              padding:8, 
              width:50}}>
            Save
          </Text>
        </TouchableOpacity>

        {/* button hide modal */}
        <TouchableOpacity onPress = {()=>this.refs.modalupdate.close()}>
          <Text>Close</Text>
        </TouchableOpacity>
      </Modal>
    )
  }
}



// onPress = {() =>{
//   //bắt lỗi
//   if(this.state.tipname.length == 0 || this.state.tipage.length == 0 || this.state.tipaddress.length == 0){
//     alert('Bạn phải nhập tên, tuổi và địa chỉ')
//     return;
//   }
//   // làm gì đó
//   this.refs.modalupdate.close()
// }}


// InsertData= () =>{
//   return fetch('http://192.168.1.35:3111/todo/create', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       name: this.state.tipname,
//       age: this.state.tipage,
//       address: this.state.tipaddress,
//       image: this.state.tipimage,
//       description: this.state.tipdescription
//     })
//   })
//   .then((response) => response.json())
//   .then((responseJson) => {
//     this.setState({data: responseJson});
//     this.refs.modalupdate.close();
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// }