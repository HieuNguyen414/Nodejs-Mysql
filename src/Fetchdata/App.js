import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, 
  ActivityIndicator, Image, Dimensions,TextInput, Alert, RefreshControl, ScrollView} from 'react-native';
import {Container, Header,Title, Content, Body, Left, Right,
  List, ListItem, Thumbnail, Footer} from 'native-base';
import styles from './styles';
import AddModal from './AddModal.js';
import ModalUpdate from './ModalUpdate';
import Modal from 'react-native-modalbox';
import Icon     from 'react-native-vector-icons/Entypo';
const {height, width} = Dimensions.get('window');

// import hàm fetch dữ liệu
import {FetchData} from './Fetchdata';
import {InsertData} from './Fetchdata';

export default class App extends Component {
  constructor(props){ 
    super(props);
    this.state = { 
      refreshing:false,
      data: [],
    } 
  }
  componentDidMount() {
    this.GetDatfromServer();
  }
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
  onRefresh = ()=>{
    this.GetDatfromServer();
  }
  _onPressAdd = ()=>{
    this.refs.modalcreate.showAddModal()
  }

  render() {
  return (
    <View>
      <View style = {{backgroundColor:'grey', height:64, flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
        <TouchableOpacity onPress = {this._onPressAdd}>
          <Image style = {{ marginRight:10}} source = {require('../img/plus.png')}/>
        </TouchableOpacity>
      </View>
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
        renderItem={({item}) => 
          <View style = {{flexGrow:50}}>
            <TouchableOpacity onPress = {()=>{this.refs.FlatlistData.scrollToEnd()}}>
              <Text style = {{borderWidth:0.3, padding:10, borderColor:'grey'}}>{item.name}</Text>
            </TouchableOpacity>
          </View>
          }>
      </FlatList>
      {/*  */}
      <AddModal ref={"modalcreate"} parentFlatlist = {this}> 
      </AddModal>
    </View>
    );
  }
}



      // <Header>
      //   <Left>
      //     <TouchableOpacity style = {styles.left_header_home}>
      //       <Icon name = "home" color = {'#fff'} size = {20} />
      //     </TouchableOpacity>
      //   </Left>
      //   <Body>
      //     <Title>CRUD with Mysql</Title>
      //   </Body>
      //   <Right>
      //     <TouchableOpacity style = {styles.right_header_plus} onPress={() => this.refs.modalcreate.open()}>
      //         <Image  source = {require('../img/plus.png')}/>
      //     </TouchableOpacity>
      //   </Right>
      // </Header>

// open modal
// this.refs.modalupdate.open()
// this.refs.modalupdate.close()



// render() {
//   return (
//     <Container>
//       <Content >
//         <View>
//           <Modal ref={"modalcreate"} position={"top"}  style={{height:350}}>
//             <ModalApp/>
//           </Modal>
//           <Modal ref={"modalupdate"} position={"top"}  style={{height:350}} >
//             <ModalUpdate/>
//           </Modal>

//           <FlatList
//             data={ this.state.data }
//             keyExtractor={(item, id) => id}
//             refreshControl = {
//               <RefreshControl
//                 refreshing = {this.state.refreshing}
//                 onRefresh  = {this.onRefresh}
//               />
//             }
//             renderItem={({item}) => 
//               <View>
//                   <Text style = {{borderWidth:0.3, padding:10, borderColor:'grey'}}>{item.name}</Text>
//               </View>
//               }>
//           </FlatList>
//         </View>
//       </Content>
//     </Container>
//     );
//   }
// }