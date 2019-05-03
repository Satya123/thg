/* CustomHeader.js
  THG App
  This file use for common Header for all project filse .
  @Created by Pulkit Arora
*/

import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Alert,NetInfo, NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import ResponsiveImage from 'react-native-responsive-image';
import UserData from './UserData';
import ServiceClass from './ServiceClass';
var height = 60.0
  class NewCustomHeader extends Component {
/*
@props: Get Parent classs  data which is used in render view to show name of header lable.
*/

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {count: 0};
    }


    clickToLogOut = () => {

      UserData.saveData('token', '');
      UserData.removeKey();
      this.setState({ isLogOut: true });
      Actions.Login({isHide:true});


    }
    clickToNotification = () => {


      Actions.Notification();

    }


    getNotifictions = (token, memberID) => {

        //console.log(token);
        this.setState({loaded: true});
        ServiceClass.appDetails(token, `notifications/${ memberID}`).then((reData) => {
            //console.log(reData);
            if (reData.data.status === '1') {
                //console.log(reData.data.data);
                Actions.Notification();

            } else {
                this.setState({loaded: false});
                Alert.alert(reData.data.message);
            }

        }).catch((error) => {
          Alert.alert(error);
        });
    }


    componentWillMount(){
      const deviceId = DeviceInfo.getDeviceName();
      //console.log(deviceId);
      if (deviceId === "iPhone Xʀ" || deviceId === "iPhone X" || deviceId === "iPhone XS" || deviceId === "iPhone XS Max"){
        height = 85.0
      }else{
          height = 60.0
      }
    }

    /*
      @render: this function use to present the UI of this components .
  */
    render() {
        return (
                <View style={[styles.containerView,{height: height}]}>
                    <View style={{paddingTop: 5}}>

                    </View>
                    <View style={{width: '75%',justifyContent:'center',alignItems:'center',paddingLeft:100}} >

                      <Text style={styles.textStyle}>Patient Interactive</Text>



                    </View>
                    <View style={{width: '25%',justifyContent:'center',alignItems:'center',flexDirection:'row'}} >
                    <TouchableOpacity
                        onPress={this.clickToNotification}>
                    <Image  source={require('../../assets/notification.png')}
                     style={{marginRight:20,height:20,width:20}}
                    />
                     </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.clickToLogOut}>
                     <Image  source={require('../../assets/logout.png')}
                       style={{marginRight:10,height:20,width:20}}
                     />
                       </TouchableOpacity>

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

          justifyContent: 'space-around',
          backgroundColor: '#00dcc3',
          flexDirection: 'row',


          //position: 'relative'
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
          color: '#002e3c',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',


      },
      textStyleTitle: {
          fontSize: 18,
          color: 'white',
          alignItems: 'flex-start',
          justifyContent: 'flex-start'

      }
  };
 export default NewCustomHeader;