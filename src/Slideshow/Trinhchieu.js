import React, { Component } from 'react'
import { 
  View, Text
 } from 'react-native';
 import Slideshow from 'react-native-slideshow';

export default class Trinhchieu extends Component {

  render() {
    return (
    <Slideshow 
    dataSource={[
      { url:'http://placeimg.com/640/480/any' },
      { url:'http://placeimg.com/640/480/any' },
      { url:'http://placeimg.com/640/480/any' }
  ]}/>
    );
  }
}