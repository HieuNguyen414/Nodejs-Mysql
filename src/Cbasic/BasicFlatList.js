import React, { Component } from 'react'
import { AppRegistry, View, FlatList,Text, StyleSheet, Image, Alert, TouchableOpacity, Modal } from 'react-native';
import FlatListData from '../../config/data/FlatListData';
import Swipeout from 'react-native-swipeout'
import ModalC from './ModalC';

class FlatListItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      xoakey:null
    }
  }
  render(){
    const swipeSettings  = {
      autoClose:true,
      onClose:(secId, rowId, direction) =>{
        if (this.state.xoakey != null){
          this.setState({xoakey:null});
        }
      },
      onOpen:(secId, rowId, direction) =>{
        this.setState({xoakey:this.props.item.key});
      },
      right:[
        {
          onPress:() =>{
            const deletingRow = this.state.xoakey;
            Alert.alert(
              'Thông Báo',
              'Are you sure you want to delete?',
              [
                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => {
                  FlatListData.splice(this.props.index,1);
                  this.props.parentFlatList.refreshFlatList(deletingRow)
                }},
              ],
              { cancelable: false }
            )
          },
          text:"Delete", type:'delete'
        }
      ],
      left:[
        {
          onPress:() =>{
            alert('abc')
          },
          text:"Edit", type:'primary'
        }
      ],
      rowId: this.props.index,
      sectionId:1
    };
    return(
      // khi mà prop quá nhiều thì khai báo nó bằng thuộc tính khác
      <Swipeout {...swipeSettings}> 
        <View>
          <View style = {{flex:1,flexDirection:'row', backgroundColor:'grey'}}> 
            <Image 
              source = {{uri:this.props.item.image}}
              style = {{width:100, height:100, margin:5}}
              />
            <View style = {{flex:1, height:100}}>
              <Text style = {{color:'white',fontSize:16, padding:10}} >{this.props.item.name}</Text>
              <Text style = {{color:'white',fontSize:16, padding:10}}>{this.props.item.description}</Text>
            </View>
          </View>
          <View style = {{
            height:1,
            backgroundColor:'white'
          }}>
          </View>
        </View>
      </Swipeout>
    )
  }
  }

export default class BasicFlatList extends Component {
  constructor(props){
    super(props);
    this.state = {
      deleteRowKey:null
    };
  }
  // tự động refresh khi xóa dữ liệu
  refreshFlatList = (deleteRowKey)=>{
    this.setState((prevState) => {
      return{
        deleteRowKey:deleteRowKey
      };
    });
    // this.refs.flat.scrollToEnd();
  }
  refreshDoc = (activeKey)=>{
    this.setState((prevState) => {
      return{
        deleteRowKey:activeKey
      };
    });
    this.refs.flat.scrollToEnd();
  }
  // show modal c
  _onPressAdd = ()=>{
    this.refs.modalc.showAddModal()
  }
    render() {
      return (
        <View>
            {/* header */}
          <View style = {{height:60, backgroundColor:'tomato', justifyContent:'flex-end', alignItems:'center', flexDirection:'row'}}>
             <TouchableOpacity onPress = {this._onPressAdd}>
               <Image style = {{marginRight:30}} source = {require('../img/plus.png')}/>
             </TouchableOpacity>
          </View>

            {/* data from FlatListData */}
          <View>
            <FlatList
              ref = {"flat"}
              data ={FlatListData}
              renderItem = {({item, index}) =>{
                return(
                <FlatListItem item = {item} index = {index} parentFlatList = {this}>
                </FlatListItem>)
              }}
              >
            </FlatList>
          </View>

          {/* ModalC */}
          <ModalC ref={"modalc"} parentFlatList = {this}/> 
        </View>
      );
    }
}
