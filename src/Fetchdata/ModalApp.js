import React, { Component } from 'react';
import { View, Button, Image, Alert } from 'react-native'
import { StyleSheet, TextInput, Dimensions, TouchableOpacity, Text} from 'react-native';
// const { width, height } = Dimensions.get('window');

export default class ModalApp  extends Component {
  constructor(props){
    super(props);
    this.state = {
      isModalVisible: false,
      tipname:'',
      tipage:'',
      tipaddress:'',
      tipthumbnail:'',
      tipdescription:'',
      data: [],
    }
  }
  InsertData= () =>{
   return fetch('http://192.168.1.35:3110/todo/create', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       name: this.state.tipname,
       age: this.state.tipage,
       address: this.state.tipaddress,
       thumbnail: this.state.tipthumbnail,
       description: this.state.tipdescription
     })
   })
   .then((response) => response.json())
   .then((responseJson) => {
     this.setState({data: responseJson}); 
     this.setState({isModalVisible:true});
     
   })
   .catch((error) => {
     console.error(error);
   });
}

  render() {
    return (
      <View>
        <TextInput style = {styles.textip_modal} placeholder = "Name"
          onChangeText={(tipname) => this.setState({tipname})}
        />
        <TextInput style = {styles.textip_modal} placeholder = "Age"
          onChangeText={(tipage) => this.setState({tipage})}
        />
        <TextInput style = {styles.textip_modal} placeholder = "Address"
          onChangeText={(tipaddress) => this.setState({tipaddress})}
        />
         <TextInput style = {styles.textip_modal} placeholder = "Image"
          onChangeText={(tipthumbnail) => this.setState({tipthumbnail})}
        />
        <TextInput style = {styles.textip_modal} placeholder = "Description"
          onChangeText={(tipdescription) => this.setState({tipdescription})}
        />
        <TouchableOpacity style={styles.touch_add} onPress={this.InsertData}>
          <Image style = {{width:30, height:30}} source={require('../img/add.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  textip_modal:{
    backgroundColor:'#fff',
  },
  touch_add:{
    marginTop:5,
    padding: 5,
    justifyContent: 'center', 
    alignItems:'center',
  }
});
