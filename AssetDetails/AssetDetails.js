
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import {Header, Left, Right, Title, Container, Body, Content} from 'native-base';
import styles from './styles';
const {width, height} = Dimensions.get('window');

export default class  extends Component {
  constructor(props){
    super(props)
  }
  render() {
    console.log(height, width)
    return (
      <Container>
        <Header>
          <Left>
            <TouchableOpacity>
              <Image style = {styles.backIconHeader} source = {require('./img/backIcon.png')}/>
            </TouchableOpacity>
          </Left>
          <Body>
            <Title>Asset Details</Title>
          </Body>
          <Right>
            <TouchableOpacity>
              <Image source = {require('./img/penIcon.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.delIcon}>
              <Image source = {require('./img/deleteIcon.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.moreIcon}>
              <Image source = {require('./img/moreIcon.png')}/>
            </TouchableOpacity>
          </Right>
        </Header>
        <Content>
          <View style = {styles.viewMain}>
            
            <View style = {styles.viewImageLarge}>
              {/* image upload background */}
              <Image
                style = {{width, height:width*720/1280-44}}
                source = {require('./img/thumbnail.jpg')}/>
                
                {/* Image + Number */}
              <View style = {styles.smallImage}>
                <View style = {styles.imgT}>
                  <Image style = {styles.imagethumb} source = {require('./img/thumbnail.jpg')}/>
                </View>
                <View style = {styles.viewNumber}>
                  <Text>0</Text>
                </View>
              </View>
            </View>

              {/* Text Accoustic Guitar + Number */}
            <View style = {styles.Accoutic}>
              <Text style = {styles.textname}>Accoustic Guitar</Text>
              <Text style = {styles.textname}>£ 45,00</Text>
            </View>
          </View>
            {/* List asset */}
          <View style = {styles.listAsset}>
            <View style = {styles.listChung}>
              <Text style = {styles.textBoxGuitar} >Box Guitar</Text>
              <Text style = {styles.textBoxGuitar} >></Text>
            </View>
            <View style = {[styles.listChung, {padding:20}]}>
              <Text style = {[styles.textBoxGuitar, styles.margin2]} >in Books</Text>
              <Text style = {[styles.textBoxGuitar, styles.margin2]} >at Home</Text>
            </View>
            <Text style = {[styles.hai003, styles.textBoxGuitar]}>Box Guitar</Text>
            <View style = {[styles.listChung, {marginTop:25}]}>
              <Text style = {styles.textBoxGuitar} >Barcode 1</Text>
              <Text style = {styles.textBoxGuitar} >None</Text>
            </View>
            <Text style = {styles.textBoxGuitar} >Barcode 2</Text>
            <Text style = {styles.textBoxGuitar} >ISBN</Text>
            <Text style = {styles.textBoxGuitar} >Produced by</Text>
            <Text style = {styles.textBoxGuitar} >Brand</Text>
            <View style = {styles.listChung}>
              <Text style = {styles.textBoxGuitar} >Quantity</Text>
              <Text style = {styles.textBoxGuitar} >1</Text>
            </View>
            <Text style = {styles.textBoxGuitar} >Price advertised</Text>
            <Text style = {styles.textBoxGuitar} >Discount</Text>
            <Text style = {styles.textBoxGuitar} >Receipt number</Text>
            <Text style = {styles.textBoxGuitar} >Purchased on</Text>
            <Text style = {styles.textBoxGuitar} >Purchased from</Text>
            <Text style = {styles.textBoxGuitar} >Net amount</Text>
            <Text style = {styles.textBoxGuitar} >Gross amount</Text>
            <Text style = {styles.textBoxGuitar} >Lifespan</Text>
            <Text style = {styles.textBoxGuitar} >Quality</Text>
          </View>
        </Content>
      </Container>
    );
  }
}