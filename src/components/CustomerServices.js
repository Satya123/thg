/* Appointment.js
  THG App
  This file use for set your  Appointment with Doctor.
  @Created by Pulkit Arora ResponsiveImage
*/

import React, { Component } from 'react';
import { View,ScrollView, NetInfo,Text, Image, AsyncStorage, TouchableOpacity, ImageBackground, ActivityIndicator, Alert, SafeAreaView, Platform} from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import TelemedicineCard from './TelemedicineCard';
import CustomFooter from './CustomFooter';
import NewCustomHeader from './NewCustomHeader';
import call from 'react-native-phone-call';
import UserData from './UserData';
import ServiceClass from './ServiceClass';
import LiveChat from 'react-native-livechat';
import { createStackNavigator } from 'react-navigation';
import ChatVC from './ChatVC';
import { Actions } from 'react-native-router-flux';
import {init} from "@livechat/livechat-visitor-sdk";
import ResponsiveImage from 'react-native-responsive-image';
import Spinner from 'react-native-loading-spinner-overlay';

class CustomerServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayValue: [],
            phoneText: '',
            details: '',
            loaded: false,
            isOnline:true,
            isCustomerServiceEnable:false,
            customerService:[],
        };
        if (!GLOBAL.visitorSDK) {
          GLOBAL.visitorSDK = init({
            license: '10210157',
            group: props.group
          });
        }


    }






    componentWillMount() {

        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected)
            {
                UserData.retriveData('token').then((resToken) => {

                   // //console.log(resToken);
                    UserData.retriveData('memberId').then((res) => {
                        this.getCustomerservice(resToken, res);
                    });


                })
            } else
            {

            }
        });




    }

    getCustomerservice = (token, memberID) => {

        ////console.log(token);
        this.setState({loaded: true});
        ServiceClass.appDetails(token, `appdetails/${ memberID}/customerservice`).then((reData) => {
 //debugger;
            if (reData.data.status === '1') {
            //   debugger;
               // //console.log(reData.data.data.isCustomerServiceEnable);
               // //console.log(reData.data.data.customerService[0].details);

                try {
                    AsyncStorage.setItem('isCustomerServiceEnable', reData.data.data.isCustomerServiceEnable);
                } catch (error) {

                }



                if (reData.data.data.isCustomerServiceEnable === "0"){
                    this.setState({loaded: false});
                    this.setState({isTelemedicineEnable: false});
                  alert("CustomerService not available.")

                }else{
                  ////console.log(reData.data.data[0].telemedicine[0].phone);
                  this.setState({customerService: reData.data.data.customerService});
                    this.setState({isCustomerServiceEnable: true});
                  this.setState({loaded: false});
                  // let details = reData.data.data.telemedicine[0].details
                  //  details = this.ReplaceAll(details,'&lt;','<');
                  // details = this.ReplaceAll(details,'&gt;','>');
                  // this.setState({details: details});
                //  this.setState({loaded: false});
                }




            } else {

                Alert.alert(reData.data.message);
                  this.setState({loaded: false});
            }

        }).catch((error) => {
            ////console.log(error);
            Alert.alert(error);
            this.setState({loaded: false});
        });
    }

    renderView() {


    return this.state.customerService.map(arrayObj =>
      <View style={{backgroundColor:'#fff',marginBottom:10}}>
      <View style={{ backgroundColor: '#fff', flexDirection: 'row',margin: 10, marginBottom:0,width: '95%' }}>
      <View style={styles.ImageView} >
      <ResponsiveImage
             source={require('../../assets/call_icon.png')} initWidth="40" initHeight="40"
      />
      </View>
      <TouchableOpacity
      activeOpacity={0.5}

      onPress={() => {
                       this.clickToIDCall(arrayObj.phone);
                     }} >
   <View style={{marginTop: 10,marginLeft:10, padding: 12 ,backgroundColor:'#00dcc3',width:'100%'
 }}>
    <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',width:'100%'}}>{arrayObj.policyType}</Text>
     </View>
         </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', paddingTop: 5, paddingRight: 20 }}>
          <View style={{padding: 10 ,paddingTop:0,paddingLeft:20}}>
          <Text>{arrayObj.name}</Text>

          </View>
        </View>
        </View>
      );
    }





    getStatus = (statusData) => {
    //  alert("am call")
      this.setState({isOnline:statusData});

    };


/*
  @clickToIDCall: this function work to call the provider on give number.
*/
    clickToIDCall() {
        const args = {
            number: this.props.phoneNumber,
            prompt: false
        }
        call(args).catch(console.error)
    }
  /*
      @clickToChat: this function work to chat with  providers supporte.
  */
    clickToChat() {
        Actions.LiveChat();
    }
    /*
      @render: this function use to present the UI of the components .
  */
    render() {
        const{
            arrayValue,
            phoneText,
            loaded,
            details
        } = this.state
        const SampleNameArray = [];
        SampleNameArray.push(details);
        return (
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.MainContainer}>
                        <View style={{width: '100%' }}>
                            <NewCustomHeader
                                headerText={'Customer Services'}

                                />
                        </View>
                        <View style={{width: '100%',height:50,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderBottomWidth:1,borderColor:'#33333350' }}>
                             <Text style ={{  fontSize: 18,  color: '#002e3c', alignItems: 'flex-start',  justifyContent: 'flex-start' }}>Customer Service</Text>
                        </View>
                        <ImageBackground
                            style={styles.imgBackground}
                            resizeMode='cover'
                            source={require('../../assets/backgroundBlue.png')} >
                            <View style={{height:'80%'}}>
                              <ScrollView style={{marginBottom:10}}>
                            {
                               (this.state.isCustomerServiceEnable ===false)?null:

                               <View style={{margin: 10,width: '95%' }}>

                                 {this.renderView()}

                                </View>
                            }


                            <View style={{backgroundColor: '#fff', width: '95%', height: 80, marginRight: 10, marginLeft: 10, flexDirection: 'row'}} >

                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => {
                                                        this.clickToChat();
                 }} >
                                    <View style={{marginTop: 5, padding: 10, flexDirection: 'row'}}>

                                        <Image
                                            source={require('../../assets/chat-icon.png')}
                                            style={{marginRight: 10 }}
                                            />

                                        <Image
                                            source={require('../../assets/live-chat200x50.png')}
                                            />


                                    </View>
                                </TouchableOpacity>

                            </View >
                            <View style={{backgroundColor: '#fff', width: '95%', margin: 10, flexDirection: 'column', paddingLeft: 10, paddingTop: 5}} >

                                <View style={ styles.row }>

                                    <View style={ styles.bulletText }>
                                        <Text>
                                        <Text style={ styles.boldText }>Contact customer service via call or chat.We will help resolve any issue, including:</Text>
                                        </Text>
                                    </View>
                                </View>


                                <View style={ styles.row }>
                                    <View style={ styles.bullet }>
                                        <Text>{'\u2022' + " "}</Text>
                                    </View>
                                    <View style={ styles.bulletText }>
                                        <Text>
                                        <Text style={ styles.boldText }>Finding a doctor</Text>
                                        </Text>
                                    </View>
                                </View>
                                <View style={ styles.row }>
                                    <View style={ styles.bullet }>
                                        <Text>{'\u2022' + " "}</Text>
                                    </View>
                                    <View style={ styles.bulletText }>
                                        <Text>
                                        <Text style={ styles.boldText }>Making an appointment</Text>
                                        </Text>
                                    </View>
                                </View>
                                <View style={ styles.row }>
                                    <View style={ styles.bullet }>
                                        <Text>{'\u2022' + " "}</Text>
                                    </View>
                                    <View style={ styles.bulletText }>
                                        <Text>
                                        <Text style={ styles.boldText }>Claims issues</Text>
                                        </Text>
                                    </View>
                                </View>
                                <View style={ styles.row }>
                                    <View style={ styles.bullet }>
                                        <Text>{'\u2022' + " "}</Text>
                                    </View>
                                    <View style={ styles.bulletText }>
                                        <Text>
                                        <Text style={ styles.boldText }>Update your information</Text>
                                        </Text>
                                    </View>
                                </View>

                                <View style={ styles.row }>

                                    <View style={ styles.bulletText }>
                                        <Text>
                                        <Text style={ styles.boldText }>Whatever you need, our service team is here to help!</Text>
                                        </Text>
                                    </View>
                                </View>

                            </View>

                            <Spinner
                               visible={this.state.loaded}
                               color={'#00dcc3'}
                               />
                                                   </ScrollView >
                                                   </View>
                        </ImageBackground>
                        <View style={styles.footerView}>
                        <CustomFooter
                            isAccount={false}
                            isAppointment={false}
                            isIDCard={false}
                            isTelemedicine={false}
                            isCustomerService={true}
                            />
                        </View>
                    </View>
                </SafeAreaView>
                                                                );
                                            }
      }


      /*
        @styles:  these style constant are used to create a presentable ui .
      */

    const styles = {

        column: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: 200,
            height: 200,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            width: '100%',
            paddingBottom: 10

        },
        bullet: {
            width: 20
        },
        bulletText: {
            flex: 1,

        },
        boldText: {
            fontWeight: 'normal',
            fontSize: 20
        },
        boldText1: {
            fontWeight: 'normal',
            fontSize: 20,
            paddingTop: 10
        },
        normalText: {
        },

        safeArea: {
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: Platform.OS === 'ios' ? 25 : 0
        },
        MainContainer:
                {
                    flex: 1,
                },
        footerView: {
            width: '100%',
            height: 50,
            position: 'absolute',
            bottom: 0,
        },
        callView: {

            width: '100%',
            height: 100,
            position: 'absolute',
            bottom: 10,
            padding: 10,

        },
        chatView: {

            width: '100%',
            height: 100,
            position: 'absolute',
            bottom: 0,
            padding: 10,

        },
        chatView: {
            flexDirection: 'row',
            width: '100%',
            height: 85,
            position: 'absolute',
            bottom: 0,
            padding: 10,
        },

        containerView: {
            flex: 0,
            justifyContent: 'space-around',
            backgroundColor: '#ff7417',
            flexDirection: 'row',
            paddingTop: 20,
            height: 60,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            elevation: 2,
            position: 'relative'
        },
        ImageView: {
            margin: 5,
            marginTop: 15,
            height: 35,
            width: 35,
            alignItems: 'flex-start',
        },
        textStyle: {
            fontSize: 30,
            fontWeight: 'bold',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
        },
        imgBackground: {
            width: '100%',
            height: '100%',

        },
        containerActivety: {backgroundColor: 'transparent',
            height: '100%',
            width: '100%',
            zIndex: 10000000,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center'
        },
        container_logo: {
            alignItems: 'center',
            width: 300,
            height: 280,
            margin: 10,
            fontSize: 35, color: '#000',
            // fontFamily: 'Myriad Pro'
        },
        container_logo1: {
            alignItems: 'center',
            width: 300,
            height: 280,
            marginTop: 0,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 0,
            fontSize: 50,
            color: '#000',
            //fontFamily: 'Semibold'
        },

    };
 export default CustomerServices;
