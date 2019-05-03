/* CustomHeader.js
  THG App
  This file use for common Header for all project filse .
  @Created by Pulkit Arora
*/

import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Alert, NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

  class CustomHeader extends Component {
/*
@props: Get Parent classs  data which is used in render view to show name of header lable.
*/

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {count: 0};
    }
    /*
      @render: this function use to present the UI of this components .
  */
    render() {
        return (
                <View style={styles.containerView}>
                    <View style={{paddingTop: 5}}>
                        <TouchableOpacity
                            onPress={() => Actions.pop()}
                        
                            >
                            <Image

                                source={require('../../assets/back-arrow25x25.png')}
                                />
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '85%', height: 40, paddingTop: 5}} >
                        <Text style={styles.textStyle}>{this.props.headerText}</Text>

                    </View>
                </View>


                                );
                    }

                }

    /*
      @styles:  these style constant are used to create a presentable ui .
    */
  const styles = {

      containerView: {
          flex: 0,
          justifyContent: 'space-around',
          backgroundColor: '#00dcc3',
          flexDirection: 'row',
          paddingTop: getStatusBarHeight(),
          height: 65,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          elevation: 2,
          position: 'relative'
      },

      ImageStyle: {
          padding: 20,
          //margin: 0,
          height: 25,
          width: 25,
          //  resizeMode: 'stretch',

      },

      textStyle: {
          fontSize: 20,
          color: 'white',
          alignItems: 'flex-start',
          justifyContent: 'flex-start'

      }
  };
 export default CustomHeader;
