import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, 
  ActivityIndicator, Image, Dimensions,TextInput, Alert, RefreshControl, ScrollView} from 'react-native';
import {Container, Header,Title, Content, Body, Left, Right,
  List, ListItem, Thumbnail, Footer} from 'native-base';
import styles from './styles';
import AddModal from './AddModal.js';
import UpdateModal from './UpdateModal';
import Modal from 'react-native-modalbox';
import Icon     from 'react-native-vector-icons/Entypo';
const {height, width} = Dimensions.get('window');
import Swipeout from 'react-native-swipeout'


// import hàm fetch dữ liệu
import {FetchData} from './Fetchdata';
// import {InsertData} from './Fetchdata';


class FlatListItem extends Component{
  constructor(props){
    super(props);

  }
render(){
  const swipeSettings  = {
    autoClose:true, // tự động đóng khi nhấn
    onClose:(secId, rowId, direction) =>{
    },
    onOpen:(secId, rowId, direction) =>{
    },
    // kéo từ phải
    right:[
      {
        onPress:() =>{
          Alert.alert(
            'Thông Báo',
            'Are you sure you want to delete?',
            [
              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Yes', onPress: () => {
                alert('chưa làm')
              }},
            ],
            { cancelable: false }
          )
        },
        text:"Delete", type:'delete'
      }
    ],
    // kéo từ trái
    left:[
      {
        onPress:() =>{
          alert('left')
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
        <View style = {{flex:1,flexDirection:'row', backgroundColor:'white'}}> 
          <Image 
            source = {{uri:this.props.item.image}}
            style = {{width:80, height:80, margin:5}}
            />
          <View style = {{flex:1, height:80}}>
            <Text style = {styles.text} >{this.props.item.name}</Text>
            <Text style = {styles.text}>{this.props.item.description}</Text>
          </View>
        </View>
        <View style = {{
          height:1,
          backgroundColor:'black'
        }}>
        </View>
      </View>
    </Swipeout>
  )
}
}

export default class App extends Component {
  constructor(props){ 
    super(props);
    this.state = { 
      refreshing:false,
      data: [],
      lammoitucthi:null
    } 
  }
    // this function run after render function finish
  componentDidMount() {
    this.GetDatfromServer();
  }
    // get data from mysql via nodejs
  GetDatfromServer = () =>{
    // PROMISE, khi nào có kết quả thì chui vào then
    //
    this.setState({refreshing:true});
    FetchData().then((items) =>{
      this.setState({data:items});
      this.setState({refreshing:false})
    })
    .catch((error)=>{
      this.setState({data:[] // nếu có lỗi thì trả ra mảng rỗng
      });
      this.setState({refreshing:false})
    });
  }
    // refresh data (pull to refresh)
  onRefresh = ()=>{
    this.GetDatfromServer();
  }
    // show modal add 
  _onPressAdd = ()=>{
    this.refs.modalcreate.showAddModal()
  }
    // show modal update
  _onPressUpdate = ()=>{
    this.refs.modalupdate.showUpdateModal()
  }
    // refresh imendiately after add, delete or update data
  refreshFlatList = (lammoitucthi)=>{
    this.setState((prevState)=>{
      return{
        lammoitucthi:lammoitucthi
      };
    });
    this.refs.FlatlistData.scrollToEnd();
  }

  render() {
  return (
    <View>
        {/* header */}
      <View style = {{
          backgroundColor:'grey', 
          height:64, 
          flexDirection:'row', 
          justifyContent:'flex-end', 
          alignItems:'center'}}>
        <TouchableOpacity onPress = {this._onPressAdd}>
          <Image style = {{ marginRight:10}} source = {require('../img/plus.png')}/>
        </TouchableOpacity>
      </View>
        {/* data */}
      <View>
        <FlatList 
          ref = "FlatlistData"
          data={ this.state.data }
          keyExtractor={(item, id) => id}
          refreshControl = {
            <RefreshControl
              refreshing = {this.state.refreshing}
              onRefresh  = {this.onRefresh}
            />
            }
          renderItem = {({item, index}) =>{
            return(
              // defined component FlatListItem above (class FlatListItem )
            <FlatListItem item = {item} index = {index} parentFlatList = {this}>
            </FlatListItem>)
          }}>
          
        </FlatList>
      </View>

       {/* Modal here  */}
      <AddModal ref={"modalcreate"} parentFlatList = {this}/> 
      <UpdateModal ref={"modalupdate"} parentFlatList = {this}/> 
    </View>
    );
  }
}
