/* CustomHeader.js
  THG App
  This File use for Dashboard .
  @Created by Pulkit Arora
*/

import React from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text,Platform,Image, TouchableOpacity,ImageBackground,AsyncStorage,SafeAreaView} from 'react-native';
import { createStackNavigator, } from 'react-navigation';
import CustomFooter from './CustomFooter';
import AccountInfo from './AccountInfo';
import Policies from './Policies';
export const AccountInfoProfile = '100';
import { Actions } from 'react-native-router-flux';
import IDCard from './IDCard';
import CustomerServices from './CustomerServices';
import ChatVC from './ChatVC';
import LiveChat from 'react-native-livechat'
import UserData from './UserData';
import OfflineNotice from './OfflineNotice';
import ResponsiveImage from 'react-native-responsive-image';

  class HomeScreen extends React.Component {
            constructor(props) {
                 super(props);
                 this.state = {
                      isProfile: false,
                      isHome: true,
                      isMenu: false,
                      isNotification: false,
                    };
                 }


    componentWillMount() {
      AsyncStorage.getItem('profileArray')
              .then((contacts) => {
                  const value = contacts ? JSON.parse(contacts) : [];
                  //console.log(value);
                  this.setState({arrayValue: value})
              });
    }


    componentDidMount() {

               UserData.saveData('memberId', this.props.profileData[0].ID);

        }
    /*
        @clickToCustomerServies:Call customer services class passing helper phone number
    */
        clickToCustomerServies(){
            Actions.CustomerServices({phoneNumber: this.props.profileData[0].customerServicePhone});
        }
    /*
      @clickToAppointments:Call appointment class passing user data
    */

        clickToAppointments(){
            Actions.Appointments({isViewAppointments:true,isEnableTele:this.props.telemedicine});
        }
    /*
      @clickToAccountInfo:Call AccountInfo class passing user data
    */
        clickToAccountInfo() {
            Actions.AccountInfo({ userData: this.props.profileData });
        }
  /*
    @clickToIDCard:Call IDCard class passing user verification card
  */

        clickToIDCard() {
            Actions.IDCard({ cardData: this.props.profileData[0].membershipCard });
        }
    //MARK:- HomeScreen design
        render() {
            return (
              <SafeAreaView style={styles.safeArea}>
               <ImageBackground style={ styles.imgBackground } resizeMode='cover' source={require('../../assets/backgroundBlueHome.png')}>
                   <View style={styles.accountInfo}>
                       <TouchableOpacity activeOpacity={0.5} onPress={() => { this.clickToAccountInfo(); }}>
                       <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                       <ResponsiveImage  source={require('../../assets/account-info.png')} initWidth="62" initHeight="61"/>
                       <Text style={{fontSize:18,color:'white'}}>Account Info</Text>
                       </View>
                       </TouchableOpacity>
                       <View></View>
                       <TouchableOpacity
                       activeOpacity={0.5}
                       onPress={() => { this.clickToIDCard(); }} >
                       <View style={{marginTop:17,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                       <ResponsiveImage  source={require('../../assets/IDcardnew.png')}   initWidth="66" initHeight="39"/>
                       <Text style={{fontSize:18,color:'white',marginTop:5}}>ID Card</Text>
                       </View>
                       </TouchableOpacity>
                   </View>
                   <View style={styles.container_logo}>
                      <ResponsiveImage  source={require('../../assets/logo.png')}   initWidth="231" initHeight="60"/>
                  </View>
                  <View style={styles.appointments}>
                       <TouchableOpacity activeOpacity={0.5} onPress={() => { this.clickToAppointments(); }} >
                         <View style={{marginLeft:8,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                         <ResponsiveImage  source={require('../../assets/appointments.png')} initWidth="51" initHeight="55"/>
                         <Text style={{fontSize:18,color:'white'}}>Appointments</Text>
                         </View>
                         </TouchableOpacity>
                         <View>
                        </View>

                        {
                          (this.props.telemedicine == "1") ?    <TouchableOpacity
                             activeOpacity={0.5}
                             onPress={() => { this.props.navigation.navigate('Telemedicine'); }} >
                             <View style={{marginRight:8,justifyContent:'center',alignItems:'center'}}>
                             <ResponsiveImage  source={require('../../assets/telemedicine.png')}  initWidth="83" initHeight="55"/>
                             <Text style={{fontSize:18,color:'white'}}>Telemedicine</Text>
                             </View>
                            </TouchableOpacity> :      <TouchableOpacity
                                 activeOpacity={0.5}
                                 onPress={() => { this.clickToCustomerServies(); }} >
                                 <View style={{justifyContent:'center',alignItems:'center'}}>
                               <ResponsiveImage  source={require('../../assets/customerservice.png')}  initWidth="66" initHeight="70"/>
                                   <Text style={{fontSize:18,color:'white'}}>Customer Services</Text>
                                 </View>
                                 </TouchableOpacity>
                        }

                    </View>
                    <View style={styles.customerService}>
                           <View></View>
                        {
                          (this.props.telemedicine == "1") ? <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => { this.clickToCustomerServies(); }} >
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                         <ResponsiveImage  source={require('../../assets/customerservice.png')}  initWidth="66" initHeight="70"/>
                              <Text style={{fontSize:18,color:'white'}}>Customer Services</Text>
                            </View>
                            </TouchableOpacity>:null
                        }

                           <View></View>
                   </View>
                  <View style={styles.footerView}>
                               <CustomFooter
                               isProfile={this.state.isProfile}
                               isHome={this.state.isHome}
                               isMenu={this.state.isMenu}
                               isNotification={this.state.isNotification}
                               dataArray={this.state.arrayValue}
                               />
                  </View>
         </ImageBackground>
         <OfflineNotice />
         </SafeAreaView>
            );
          }
        }

/*
  @styles:  these style constant are used to create a presentable ui .
*/

const styles = StyleSheet.create({
    customerService:{
         flex: 1,
         flexDirection: 'row',
         justifyContent: 'space-around',
                 },
    appointments: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         marginTop: 10,

        },
    accountInfo:{
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop:80,
        marginBottom:20
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#ddd'
    },

    container: {
        flex: 1,
        margin: 0,
        padding: 0,
        alignItems: 'center',
        //justifyContent: 'center',
        //  paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
    MainContainer:
            {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: (Platform.OS === 'ios') ? 20 : 0
            },

    container_logo: {
        //  margin: 0,
        marginBottom: 20,
        padding: 0,
        alignItems: 'center',
    },
    shadow1: {
        //  margin: 0,
        marginBottom: 0,
        padding: 0,
        alignItems: 'center',
    },

    container_home: {
        backgroundColor: '#4286f4',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 50,

    },
    imgBackground: {
        width: '100%',
        height: '100%',
        //resizeMode: 'cover',
        flex: 1,

    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 20,
        width: 8,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
    ImageStyle_birth: {
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        //paddingLeft:10,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
    viewStyleOne: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b642f4'
    },
    textStyle: {
        textAlign: 'center'
    },
    innerContainer: {
        flex: .5,
        flexDirection: 'row',
        alignItems: 'flex-start' //replace with flex-end or center
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#0f0',
        borderWidth: .5,
        borderColor: '#00dcc3',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',

        height: 40,
        borderRadius: 5,
        margin: 20,
        width: 267,
        paddingLeft: 40,
        shadowOffset: {width: 5, height: 5, },
        borderWidth: 1,

    },

    SectionStyle1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: .5,
        borderColor: '#00dcc3',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        height: 40,
        borderRadius: 5,
        margin: 10,
        width: 267,
    },
    SectionStyle2: {
        borderWidth: .5,
        marginRight: 30,
        width: 90,
        height: 90
    },
    textInput:
            {
                height: 40,
                borderWidth: 1,
                marginVertical: 5,
                alignSelf: 'stretch',
                padding: 8,
                fontSize: 16,
                backgroundColor: '#ede9e0',
                color: '#ede9e0',
                borderColor: '#ede9e0',
                width: 267,
                margin: 30,
            },
    SplashScreen_RootView:
            {
                flex: 1,
                margin: 0,
                position: 'absolute',
                width: '100%',
                height: '100%',

            },
    SplashScreen_ChildView:
            {
                justifyContent: 'center',
                alignItems: 'center',

                flex: 1,

            },
    footerView: {
        width: '100%',
        height: 50,

        position: 'absolute',
        bottom: 0

    },
    TouchableOpacity_Style: {

        position: 'absolute',
        zIndex: 100000

    },
    container2: {
        flex: .5,
        flexDirection: 'row',
        alignItems: 'flex-start' //replace with flex-end or center
    },
    box: {
        width: 100,
        height: 100
    },
    box1: {
        backgroundColor: '#2196F3'
    },
    box2: {
        backgroundColor: '#8BC34A'
    },
    box3: {
        backgroundColor: '#e3aa1a'
    }


});

export default HomeScreen;
