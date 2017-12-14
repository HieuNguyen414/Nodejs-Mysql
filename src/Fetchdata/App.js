import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, 
  ActivityIndicator, Image, Dimensions,TextInput, Alert, RefreshControl} from 'react-native';
import {Container, Header,Title, Content, Body, Left, Right,
  List, ListItem, Thumbnail} from 'native-base';
import styles from './styles';
import ModalApp from './ModalApp';
import ModalUpdate from './ModalUpdate';
import Modal from 'react-native-modalbox';
import Icon     from 'react-native-vector-icons/Entypo';
const {height, width} = Dimensions.get('window');
const GetData = 'http://192.168.1.35:3111/todo';
// import hàm fetch dữ liệu
import {FetchData} from './Fetchdata';

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

  render() {
  return (
    <Container>
      <Content >
        <View>
          {/* <Modal ref={"modalcreate"} position={"top"}  style={styles.modal4}>
            <ModalApp/>
          </Modal>
          <Modal ref={"modalupdate"} position={"top"}  style={styles.modal4} >
            <ModalUpdate/>
          </Modal> */}

          <FlatList
            data={ this.state.data }
            keyExtractor={(item, id) => id}
            refreshControl = {
              <RefreshControl
                refreshing = {this.state.refreshing}
                onRefresh  = {this.onRefresh}
              />
            }
            renderItem={({item}) => 
              <View style = {{borderColor:'black', borderWidth:1, padding:10, flexDirection:'row', backgroundColor:'#fff'}}>
                <Right>
                  <Thumbnail small source = {{uri:item.image}}/>
                </Right>
                <Body>
                  <Text>{item.name}</Text>
                </Body>
                <Left>
                 <Image source = {require('../img/xicon.png')}/>
                </Left>
              </View>
              }>
          </FlatList>
        </View>
      </Content>
    </Container>
    );
  }
}

// <Header>
// <Left>
//   <TouchableOpacity style = {styles.left_header_home}>
//     <Icon name = "home" color = {'#fff'} size = {20} />
//   </TouchableOpacity>
// </Left>
// <Body>
//   <Title>CRUD with Mysql</Title>
// </Body>
// <Right>
//   <TouchableOpacity style = {styles.right_header_plus} onPress={() => this.refs.modalcreate.open()}>
//       <Image  source = {require('../img/plus.png')}/>
//   </TouchableOpacity>
// </Right>
// </Header>

// open modal
// this.refs.modalupdate.open()
// this.refs.modalupdate.close()