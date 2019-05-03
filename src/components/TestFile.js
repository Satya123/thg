import React, { Component } from 'react';
  import { View, Image, Text, ScrollView, KeyboardAvoidingView, ImageBackground,SafeAreaView,Keyboard, TextInput, StyleSheet, Animated, ActivityIndicator, AsyncStorage, Alert, TouchableOpacity, NetInfo} from 'react-native';
//import Dropdown from 'react-native-modal-dropdown';
import ServiceClass from './ServiceClass';

class TestFile extends Component {
  // constructor(...arg) {
  //   super(...arg)
  // }

  render() {
    const{
      dataArray,
      isLogOut
    } = this.props;
    return (
              <View style={styles.MainContainer}>

              </View>

    );
  }
}

const styles = {
  MainContainer:
   {
     flex: 1,
   },
   footerView: {
     width: '100%',
      height: 50,


      position: 'absolute',
      bottom: 0

   },
   imgBackground: {
           width: '100%',
           height: '100%',


   },
   textStyle:{

      color: '#fff',
      fontSize:22
    }
};

export default TestFile
