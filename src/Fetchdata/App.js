import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, 
  ActivityIndicator, Image, Dimensions,TextInput, Alert} from 'react-native';
import {Container, Header,Title, Content, Body, Left, Right,
  List, ListItem, Thumbnail} from 'native-base';
import styles from './styles';
import ModalApp from './ModalApp';
import ModalUpdate from './ModalUpdate';
import Modal from 'react-native-modalbox';
import Icon     from 'react-native-vector-icons/Entypo';
const {height, width} = Dimensions.get('window');


export default class App extends Component {
  constructor(props){ 
    super(props);
    this.state = { 
      data: [],
      isLoading:true,
      // refresh:false, 
      pages:1,
    } 
  }
  componentDidMount() {
    return fetch('http://192.168.1.35:3111/todo')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading:false, // loading 
          data: responseJson // fetch về và gán vào biến data (là 1 mảng dữ liệu)
        });
      })
      .catch((error) => {
        console.error(error);
    });
  }

// refresh data
  _refresData(){
    return fetch('http://192.168.1.35:3111/todo')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading:false, 
        data: responseJson
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
    // show, hide modal
      _showModal = () => this.setState({ isModalVisible: true })
      _hideModal = () => this.setState({ isModalVisible: false })

    // kéo chạm đáy thì load thêm
  // _onEndReached(){
  //   fetch('http://192.168.1.35:3111/todo/'+(this.state.pages + 1))
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     if (responseJson.length !=0){
  //       this.setState({
  //         isLoading:false, 
  //         pages : this.state.pages+1
  //       });
  //     }
  //     else{
  //       Alert.alert('Hết dữ liệu')
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  //   }

  // hiển thị loading trước khi hiển thị dữ liệu
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadingData}>
          <ActivityIndicator /> 
        </View>
      );
    }
  return (
    <Container>
      <Header>
          {/* but home */}
        <Left>
          <TouchableOpacity style = {styles.left_header_home}>
            <Icon name = "home" color = {'#fff'} size = {20} />
          </TouchableOpacity>
        </Left>
        <Body>
          <Title>CRUD with Mysql</Title>
        </Body>
        <Right>
            {/* button refresh */}
          <TouchableOpacity onPress = {()=>this._refresData()}>
              <Image  source = {require('../img/icons8-synchronize-24.png')}/>
          </TouchableOpacity>
            {/* button show modal */}
          <TouchableOpacity style = {styles.right_header_plus} onPress={() => this.refs.modalcreate.open()}>
              <Image  source = {require('../img/plus.png')}/>
          </TouchableOpacity>
        </Right>
      </Header>
 
      <Content >
        <View>
          <TouchableOpacity 
            onPress = {()=>{this.refs.danhsach.scrollToEnd()
          }}>
            <Text>Đến cuối trang</Text>
          </TouchableOpacity>
        </View>

        <View style = {{flex:1}}>
             {/* modal create items */}
          <Modal ref={"modalcreate"} position={"top"}  style={styles.modal4}>
            <ModalApp/>
          </Modal>
             {/* modal update items */}
          <Modal ref={"modalupdate"} position={"top"}  style={styles.modal4} >
            <ModalUpdate/>
          </Modal>

          <FlatList
             // kéo chạm đáy thì load thêm dữ liệu
            // onEndReached = {this._onEndReached.bind(this)}
            // onEndReachedThreshold = {5} //(âm tới 0 tới 1)
         
            // kéo từ trên xuống thì load thêm dữ liệu  
            // refreshing={this.state.refresh}
            // onRefresh = {()=>{this._onRefresh()}}
           
            // ref = "danhsach"
            data={ this.state.data }
            keyExtractor={(item, index) => index}
            initialNumToRender={2}
            renderItem={  ({item}) => 
              <View>
                <List>
                  <ListItem style = {{borderColor:'black', borderWidth:0.5, margin:5}}>
                    <Left style = {{marginRight:20, flex:0.125, marginLeft:10}}>
                      <TouchableOpacity >
                        <Thumbnail small source = {{uri:item.thumbnail}}/>
                      </TouchableOpacity>
                    </Left>
                    <Body>
                      <TouchableOpacity onLongPress={() => this.refs.modalupdate.open()}>
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.refs.modalupdate.close()}>
                        <Text>{item.description}</Text>
                      </TouchableOpacity>
                    </Body>
                    <Right>
                      <TouchableOpacity onPress = {()=>function(){
                        return fetch('http://localhost:3111/todo/delete/83')
                        .then((response) => response.json())
                        .then((responseJson) => {
                          this.setState({
                            data: responseJson,
                            
                          });
                          alert('Đã xóa');
                        })
                        .catch((error) => {
                          console.error(error);
                      });
                      }}>
                        <Image source = {require('../img/xicon.png')}/>
                      </TouchableOpacity>
                    </Right>
                  </ListItem>
                </List>
              </View>
              }>
          </FlatList>
        </View>
      </Content>
    </Container>
    );
  }
}
