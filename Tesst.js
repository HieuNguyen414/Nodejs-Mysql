import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
var {height, width} = Dimensions.get('window');

export default class Category extends Component {
  render() {
    return (
      <View >
        <View >
          <Text >LIST OF CATEGORY</Text>
        </View>
        <View >
          <Swiper showsButtons={true} autoplay={true} width={imagWidth} height={imagHeight}>
            <Image source={require('./src/img/swiper-2.jpg')} style={styles.imgbanner} />
            <Image source={require('./src/img/swiper-2.jpg')} style={styles.imgbanner} />
            <Image source={require('./src/img/swiper-2.jpg')} style={styles.imgbanner} />
          </Swiper>
        </View>
      </View>
    );
  }
}

const imagWidth = width - 40;
const imagHeight = (imagWidth / 933) * 465 ;

const styles = StyleSheet.create({
    imgbanner:{ 
    width: 300,
    height: 300
}

});
