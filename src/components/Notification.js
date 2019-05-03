/* Notification.js
  THG App
  This file use for show user all Notifications .
  @Created by Pulkit Arora
*/

import React, { Component } from 'react';
import { Text, View, Alert, ImageBackground, ActivityIndicator, Image, AsyncStorage, SafeAreaView, NetInfo   } from 'react-native';
import CustomFooter from './CustomFooter';
import TopMenu from './TopMenu';
import CustomHeader from './CustomHeader';
import UserData from './UserData';
import ServiceClass from './ServiceClass';
import NotificationSubData from './NotificationSubData';
import OfflineNotice from './OfflineNotice';

class Notification extends Component {
 constructor(props) {
        super(props);
        this.state = {
            isNotification: true,
            isProfile: false,
            isDependents: true,
            dataArray: [],
            isPolicies: false,
            loaded: false,
            arrayValue: [],
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
                        this.getNotifictions(resToken, res);
                    });
                })

            } else
            {

            }
        });
    }
    /*
      @getNotifictions: Is use to call notifications api using predefine parameters
      @token: Token is encoded string which used for Authontication of API.
      @memberID: Current user id.
    */


    getNotifictions = (token, memberID) => {

        //console.log(token);
        this.setState({loaded: true});
        ServiceClass.appDetails(token, `notifications/${ memberID}`).then((reData) => {
            //console.log(reData);
            if (reData.data.status === '1') {
                //console.log(reData.data.data);
                this.setState({dataArray: reData.data.data});
                this.setState({loaded: false});
            } else {
                this.setState({loaded: false});
                Alert.alert(reData.data.message);
            }

        }).catch((error) => {
          Alert.alert(error);
        });
    }
  /*
      @render: this function is used to present the UI of the components .
  */
    render() {
        const {
            dataArray,
            arrayValue,
            loaded
    }
    = this.state;

    //console.log(dataArray);
    return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.MainContainer}>
                    <View style={{width: '100%', }}>
                        <CustomHeader
                            headerText={'Notifications'}

                            />
                    </View>

                    <ImageBackground
                        style={styles.imgBackground}
                        resizeMode='cover'
                        source={require('../../assets/backgroundBlue.png')} >
                        <View style={{height: '88%', width: '95%', margin: 10 }}>



                            { < NotificationSubData arrayDescription = {dataArray} />}

                        </View>

                        {
                                                    (loaded === true) ? <View style={styles.containerActivety}><View style={{width: 100, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10}} >< ActivityIndicator size="large" color="#00dcc3" /></View></View> : null
                        }
                    </ImageBackground>
                    <View style={styles.footerView}>
                        <CustomFooter
                            isProfile={this.state.isProfile}
                            isHome={this.state.isHome}
                            isMenu={this.state.isMenu}
                            isNotification={this.state.isNotification}

                            />
                    </View>
                </View>
                                                <OfflineNotice />
            </SafeAreaView>

            );
            }


            }

  /*
    @styles:  these style constant are used to create a presentable ui .
  */

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#ddd'
  },
  MainContainer:
   {
      flex: 1,

 },
   containerActivety: {

       backgroundColor: 'transparent',
       height: '100%',
       width: '100%',
       zIndex: 10000000,
       position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center'
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
     },
textrow: {
color: 'black',
fontSize: 16,
flexDirection: 'row',
 borderBottomWidth: 1,
borderColor: '#dedede',

},

textrowGray: {
color: 'black',
fontSize: 16,
flexDirection: 'row',
borderBottomWidth: 1,
backgroundColor:'#dedede',
borderColor: '#dedede',

},

textSub: {
  color: 'black',
  fontSize: 16,
  lineHeight:20,
  textAlign: 'justify',
  padding:10
},
textSubRightImage: {
 justifyContent: 'center',
  alignItems: 'center',
  height:60,
  paddingTop:10
},


};

    export default Notification;
