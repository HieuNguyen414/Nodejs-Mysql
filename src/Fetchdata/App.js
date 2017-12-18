import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, 
   Image, Dimensions,TextInput, Alert, RefreshControl, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modalbox';
import Swipeout from 'react-native-swipeout'
import AddModal from './AddModal.js';
import UpdateModal from './UpdateModal';
import styles from './styles';
import {FetchData} from './Fetchdata';

class FlatListItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      item: {} // khi có sự thay đổi thì state thay đổi -> hàm render được chạy lại -> view thay đổi
    }
  }
  refreshFlatListItem = (changedItem) =>{
    this.setState({item:changedItem})
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
          let selectedItem = this.state.item.name ? this.state.item: this.props.item;
          this.props.parentFlatList.refs.modalupdate.showEditModal(selectedItem, this);
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
        <View style = {styles.viewSwipe}> 
          <Image 
            source = {{uri:this.props.item.image}}
            style = {styles.imgSwipe}
            />
          <View style = {styles.viewData}>
            <Text>{this.state.item.name ? this.state.item.name :this.props.item.name}</Text>
            <Text>{this.state.item.description ? this.state.item.description: this.props.item.description}</Text>
          </View>
        </View>
          {/* dùng cái này để dữ liệu không bị tràn trong 1 phần tử hiển thị */}
        <View style = {styles.bottomView}>
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
      lammoitucthi:null,
      isLoading:true, // use for ActivityIndicator
      text: '',
    } 
  }
    // this function run after render function finish
  componentDidMount() {
    this.GetDatfromServer();
  }
    // get data from mysql via nodejs
  GetDatfromServer = () =>{

    this.setState({refreshing:true});
    FetchData().then((responseJson) =>{
      
      this.setState({data:responseJson, isLoading:false});
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
    this.refs.FlatL.scrollToEnd();
  }
  onEndReached(){
    alert('hết dữ liệu, đang chờ phân trang rồi làm tiếp')
  }
    //search data
    
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size="large" color="green"/>
        </View>
      );
    }
    return (
      <View>
          {/* header */}
        <View style = {styles.viewHeader}>
              {/* tip Search */}
          <TextInput style = {styles.inputSearch}
            // onChangeText={(text) => this.SearchFilterFunction(text)}
            value={this.state.text}
            placeholder = {'Search'}
            placeholderTextColor = {'white'}
            underlineColorAndroid = {'transparent'}
          />
            {/* icon search */}
          <TouchableOpacity>
            <Image style = {styles.touchSearch} source = {require('../img/searchIcon.png')}/>
          </TouchableOpacity>
            {/* icon plus */}
          <TouchableOpacity onPress = {this._onPressAdd}>
            <Image style = {styles.touchPlus} source = {require('../img/plus.png')}/>
          </TouchableOpacity>
        </View>
          {/* data */}
        <View>
          <FlatList 
            ref = "FlatL"
            data={ this.state.data }
            keyExtractor={(item, id) => id}
              // pull to refresh
            refreshControl = {
              <RefreshControl
                refreshing = {this.state.refreshing}
                onRefresh  = {this.onRefresh}
              />
              }
              // load more data
            onEndReachedThreshold ={1}
            onEndReached = {this.onEndReached.bind(this)}
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