import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class Pages extends Component {
  render() {
    return (
      <View>
        {
          <TouchableOpacity>
          <Text>Test</Text>
        </TouchableOpacity> ? <TouchableOpacity>
          <Text>HTT</Text>
        </TouchableOpacity> : null
        }
      </View>
    )
  }
}
