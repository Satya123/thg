/* Dependents.js
  THG App
  This file use for get all Dependents of user .
  @Created by Pulkit Arora
*/

import React, { Component } from 'react';
import { Text, View, Alert, ImageBackground, ActivityIndicator, Platform, AsyncStorage, NetInfo } from 'react-native';
import CustomFooter from './CustomFooter';
import TopMenu from './TopMenu';
import CustomHeader from './CustomHeader';
import UserData from './UserData';
import ServiceClass from './ServiceClass';
import DependentSubData from './DependentSubData';
import { Actions } from 'react-native-router-flux';
//import Spinner from 'react-native-loading-spinner-overlay';

class Dependents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isProfile: false,
            isDependents: true,
            dataArray: [],
            arrayValue: [],
            isPolicies: false,
            loaded: false,
        };
    }
/*
  @NetInfo: This keyword use for check internet cannectivity .
   @UserData: Use to retrieve single string data, with help of key.
*/

 componentDidMount() {
   NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected)
            {

                UserData.retriveData('token').then((resToken) => {
                    UserData.retriveData('memberId').then((res) => {
                        this.getDependant(resToken, res);
                    });
                })
            } else
            {

            }
        });

    }
    /*
      @getDependant: Is use to call api using predefine parameters
      @token: Token is encoded string which used for Authontication of API.
      @memberID: Current user id.
    */

 getDependant = (token, memberID,) => {
          //debugger;
            //console.log(token);
              this.setState({ loaded: true });
                ServiceClass.appDetails(token, `dependents/${ memberID}`).then((reData) => {
                  if ( reData.status === 200) {
                                
                                  if (reData.data.status === '1') {
                    //console.log(reData.data.data);
                    this.setState({ dataArray: reData.data.data });
                    this.setState({ loaded: false });
                  }
                  else {
                      this.setState({ loaded: false });
                    Alert.alert(reData.data.message.toString());
                  //  Actions.pop();
                  }
                
              
                      }else {
                            this.setState({ loaded: false });
               
                                 alert("Something went wrong.")
                                 return ;
                
}

                }).catch((error) => {
                    ////console.log(error);
                    Alert.alert(error);
                });
  }
    /*
      @render: this function use to present the UI of this components .
  */
    render() {
      const {
        dataArray,
          arrayValue,
        loaded
      } = this.state;
      //console.log(dataArray);
      return (
           <View style={styles.MainContainer}>
           <ImageBackground
            style={styles.imgBackground}
            resizeMode='cover'
            source={require('../../assets/backgroundBlue.png')} >
            <View style={{ height: '95%', width: '100%' }}>
            <View style={{ margin: 10, width: '95%' }}>

            <DependentSubData arrayDescription={dataArray} />
            </View>
            </View>


 {
            (loaded === true) ? <View style={styles.containerActivety}><View style={{width: 100, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}><ActivityIndicator size="large" color="#00dcc3" /></View></View> : null
            }
            
            </ImageBackground>
            <View style={styles.footerView}>
            <CustomFooter
            telemedicine={this.props.telemedicine}
                isAccount={true}
                isAppointment={false}
                isIDCard={false}
                isTelemedicine={false}
                isCustomerService={false}
                />
              </View>
            </View>

      );
    }


}
/*
  @styles:  these style constant are used to create a presentable ui .
*/
const styles = {
  MainContainer: {
    flex: 1
  },

  containerActivety: {
       top:-50,
      backgroundColor: 'transparent',
      height: '100%',
      width: '100%',
      zIndex: 10000000,
      position: 'absolute',
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: 'rgba(52, 52, 52, 1.0)'
   },
    footerView: {
          width: '100%',
           height: 50,


           position: 'absolute',
           bottom: 0

    },
   imgBackground: {
      height: '100%',
      width: '100%',
     }
};

 export default Dependents;
