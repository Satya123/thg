import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage, TouchableOpacity, ImageBackground, ActivityIndicator, Alert, SafeAreaView, ScrollView} from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import TelemedicineCard from './TelemedicineCard';
import CustomFooter from './CustomFooter';
import CustomHeader from './CustomHeader';
import call from 'react-native-phone-call';
import UserData from './UserData';
import ServiceClass from './ServiceClass';
import LiveChat from 'react-native-livechat';
import { createStackNavigator } from 'react-navigation';
import Chat from './Chat';
import { Actions } from 'react-native-router-flux';
import ResponsiveImage from 'react-native-responsive-image';

class CustomServiecs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayValue: [],
            phoneText: '',
            details: '',
            loaded: false,
        };
    }

    clickToIDCall() {
        const args = {
            number: this.props.phoneNumber,

            prompt: false
        }
        call(args).catch(console.error)
    }

    clickToChat() {
        Actions.Chat();
    }

    componentDidMount() {
        //Alert.alert(this.props.phoneNumber);
    }
    componentWillMount() {
        console.log('componentWillMount call Telemedicine');
        AsyncStorage.getItem('profileArray')
                .then((contacts) => {
                    const value = contacts ? JSON.parse(contacts) : [];
                    console.log(value);
                    this.setState({arrayValue: value})
                });
    }
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
                        <View style={{width: '100%'}}>
                            <CustomHeader
                                headerText={'Customer Services'}
                
                                />
                        </View>
                        <ImageBackground
                            style={styles.imgBackground}
                            resizeMode='cover'
                            source={require('../../assets/backgroundBlue.png')} >
                
                            <View style={{backgroundColor: '#fff', width: '95%', height: 80, margin: 10, flexDirection: 'row'}} >
                
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        this.clickToIDCall();
                 }} >
                                    <View style={{marginTop: 5, padding: 10, flexDirection: 'row'}}>
                
                                        <ResponsiveImage
                                            source={require('../../assets/call_icon.png')}
                                            style={{marginRight: 10 }} initWidth="62" initHeight="61"
                                            />
                
                                        <ResponsiveImage
                                            source={require('../../assets/click-to-call200x50.png')}   initWidth="200" initHeight="50"
                                            />
                
                
                                    </View>
                                </TouchableOpacity>
                
                            </View>
                
                
                            <View style={{backgroundColor: '#fff', width: '95%', height: 80, marginRight: 10, marginLeft: 10, flexDirection: 'row'}} >
                
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => {
                                                        this.clickToChat();
                 }} >
                                    <View style={{marginTop: 5, padding: 10, flexDirection: 'row'}}>
                
                                        <ResponsiveImage
                                            source={require('../../assets/chat-icon.png')}
                                            style={{marginRight: 10 }}   initWidth="55" initHeight="55"
                                            />
                
                                        <ResponsiveImage
                                            source={require('../../assets/live-chat200x50.png')} initWidth="200" initHeight="50"
                                            />
                
                
                                    </View>
                                </TouchableOpacity>
                
                            </View >
                            <ScrollView style={{height: '50%'}}>
                
                                <View style={{backgroundColor: '#fff', width: '95%', height: '100%', margin: 10, flexDirection: 'column', paddingLeft: 10, paddingTop: 5}} >
                
                                    <View style={ styles.row }>
                
                                        <View style={ styles.bulletText }>
                                            <Text>
                                            <Text style={ styles.boldText }>Contact customer service via call or chat. We will help resolve any issue, including:</Text>
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
                            </ScrollView>
                        </ImageBackground>
                        <View style={styles.footerView}>
                            <CustomFooter
                                isProfile={this.state.isProfile}
                                isHome={this.state.isHome}
                                isMenu={this.state.isMenu}
                                isNotification={this.state.isNotification}
                                profileData={arrayValue}
                                />
                        </View>
                    </View>
                </SafeAreaView>
                                                                    );
                                                }
                                            }
const styles = {
 row: {
         flexDirection: 'row',
         alignItems: 'flex-start',
         flexWrap: 'wrap',
         width: '100%',
         paddingBottom:10

     },
     bullet: {
         width: 20
     },
     bulletText: {
    flex: 1,
    fontSize: 16
     },
     boldText: {
         fontWeight: 'normal',
         fontSize: 18
     },
     boldText1: {
         fontWeight: 'normal',
         fontSize: 16,
         paddingTop:10
     },
     normalText: {
     },



  safeArea: {
    flex: 1,
    backgroundColor: '#ddd'
  },
MainContainer:
 {
   flex: 1,
 },
 footerView: {
   width: '100%',
    height: 45,
    position: 'absolute',
      bottom: 0,
 },
 callView: {

   width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 10,
    padding:10,

 },
 chatView: {

   width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
    padding:10,

 },
 chatView: {
   flexDirection: 'row',
   width: '100%',
    height: 85,
    position: 'absolute',
    bottom: 0,
    padding:10,
 },




containerView: {
  flex: 0,
    justifyContent: 'space-around',
    backgroundColor: '#ff7417',
    flexDirection: 'row',
    paddingTop: 20,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
           containerActivety: {       backgroundColor: 'transparent',
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
           margin:10,
           fontSize:35,color:'#000',
           // fontFamily: 'Myriad Pro'
            },
     container_logo1: {
            alignItems: 'center',
            width: 300,
           height: 280,
           marginTop:0,
           marginLeft:10,
           marginRight:10,
           marginBottom:0,
           fontSize:50,
           color:'#000',
           //fontFamily: 'Semibold'
            },


};


export default CustomServiecs;