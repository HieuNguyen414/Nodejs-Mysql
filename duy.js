import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
var { height, width } = Dimensions.get('window');

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignIn: true
    }
  }

  SignIn () {
    this.setState({ isSignIn: true})
  }

  SignUp () {
    this.setState({ isSignIn: false})
  }

  render() {
    /* signJSX */
    const signJSX = (
      <View>
        <TextInput
          style={styles.inputstyle}
          placeholder="Enter your email"
          underlineColorAndroid='transparent'
        />
        <TextInput
          style={styles.inputstyle}
          placeholder="Enter your password"
          underlineColorAndroid='transparent'
        />
        <TouchableOpacity style={styles.bigButton}>
          <Text style={styles.txtsigninnow}>SIGN IN NOW</Text>
        </TouchableOpacity>
      </View>
    );
    /* sigupJSX */
    const sigupJSX = (
      <View>
        <TextInput
          style={styles.inputstyle}
          placeholder="Enter your name"
          underlineColorAndroid='transparent'
        />
        <TextInput
          style={styles.inputstyle}
          placeholder="Enter your email"
          underlineColorAndroid='transparent'
        />
        <TextInput
          style={styles.inputstyle}
          placeholder="Enter your password"
          underlineColorAndroid='transparent'
        />
        <TextInput
          style={styles.inputstyle}
          placeholder="Re-Enter your password"
          underlineColorAndroid='transparent'
        />
        <TouchableOpacity style={styles.bigButton}>
          <Text style={styles.txtsigninnow}>SIGN UP NOW</Text>
        </TouchableOpacity>
      </View>
    );
    /* Render Main */
    const { isSignIn } = this.state;
    const MainJSX = isSignIn ? signJSX : sigupJSX ;

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={ () => this.props.navigation.goBack()}>
            <Image source={require('../Main/Shop/media/back_white.png')} style={styles.imgicon}/>
          </TouchableOpacity>
          <Text style={styles.bodytitle}>Waering a Drass</Text>
          <Image source={require('../Main/Shop/media/ic_logo.png')} style={styles.imgicon}/>
        </View>
      {/* Content */}
          {MainJSX}
      {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.btnSignIn} onPress={ this.SignIn.bind(this)}>
              <Text style={isSignIn ? [styles.txtinActive] : [styles.txtactive]}>SIGN IN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSignOut} onPress={ this.SignUp.bind(this)}>
              <Text style={isSignIn ? [styles.txtactive] : [styles.txtinActive]}>SIGN OUT</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}