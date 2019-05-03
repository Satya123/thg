import React from 'react';
import { PushNotificationIOS,AppState,StyleSheet, TextInput, View, Alert, Button, Text,Platform,Image,SafeAreaView, TouchableOpacity,ImageBackground, ActivityIndicator,StatusBar } from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import { createStackNavigator, } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import HomeScreen from './HomeScreen';
import ServiceClass from './ServiceClass';
import UserData from './UserData';
import OfflineNotice from './OfflineNotice';
import NotificationPermission from './NotificationPermission';

class Login extends React.Component {
 //static navigationOptions = { title: '', header: null, navigationBarHidden: true };

constructor(props) {
   super(props);
     this.state = {
        loaded: false,
        txtMemberID: '',
        token: "",
        tokenCopyFeedback: "",
        isVisible: true,
        Login: true,
        date: '01/01/1980',
        isLogOut:"0",
        deviceToken:''
     };

   }

/***********************
 @Get device token which is requird for login api
 ************************************/

componentWillMount(){
  //  debugger;
  this.setState({txtMemberID:''});
  this.setState({date:'01/01/1980'});

}

componentWillReceiveProps(props) {

//debugger;
  this.setState({txtMemberID:''});
  this.setState({date:'01/01/1980'});



}

componentDidMount() {

  if(this.props.isHide == true){
     this.HideSplashScreen();
  }else{
    var that = this;
    setTimeout(function(){
       that.HideSplashScreen();
     }, 1000);
  }





      //  setTimeout(() => { this.setState({ Login: true }); }, 2000);
        UserData.retriveData('deviceToken').then((res) => {
            //console.log(res);
            this.setState({ deviceToken: res });
        }, (err) => {
            //console.log(err);
              this.setState({ deviceToken: 'tokenNotprovidede' });
        });
}
//MARK: Splase image hide
 HideSplashScreen= () => {
       this.setState({
         isVisible: false

       });
     }

    clickToLogin = () => {
        const {txtMemberID} = this.state;
        const {date} = this.state;
        const {deviceToken} = this.state;
        //debugger;
//console.log(deviceToken);
        if (txtMemberID === '') {
            Alert.alert('Please enter Member ID.');
        } else if (date === '') {
            Alert.alert('Please enter date of birth.');
        } else {
            this.setState({loaded: true})
            ServiceClass.loginData(txtMemberID, date, deviceToken, 'login').then((reData) => {

            if (reData.data.status === '1') {
                    UserData.saveData('token', reData.data.data.token);
                  //  UserData.saveData('memberId', txtMemberID);
                    this.setState({loaded: false});
                    UserData.saveData('isLogout', "0");
                    Actions.VendorSplash();
                    this.setState({txtMemberID:''});
                    this.setState({date:''});


                } else {
                    this.setState({loaded: false});
                    Alert.alert(reData.data.message);
                }
            }).catch((error) => {

                this.setState({loaded: false});
                Alert.alert(error);
            });
        }
    }

  render() {

    const {
       Login,
       loaded
     } = this.state;
let Splash_Screen = (

                <View style={styles.SplashScreen_RootView}>
                   <Image source={require('../../assets/splash-screen.png')}
                        style={{width:'100%', height: '100%', resizeMode: 'contain'}} />
                   </View>);


    return (
 <SafeAreaView style={styles.safeArea}>
   <View style={styles.container}>
   {
   (this.state.isVisible === true ) ? Splash_Screen :



            <ImageBackground
            style={styles.imgBackground}
            resizeMode='cover'
            source={require('../../assets/login-bac.png')}>
                    <View style={styles.container}>
                    <Image
                    source={require('../../assets/logo.png')}
                    style={{marginBottom: 65, marginTop: 150}}/>

                    <View style={styles.SectionStyle1}>
                      <Image source={require('../../assets/user_icon.png')} style={styles.ImageStyle} />
                      <TextInput
                                  style={{flex:1,width: 100}}
                                  placeholder="Member ID"
                                  ref="textInput"
                                  placeholderTextColor="#000"
                                  value={this.state.txtMemberID}
                                  underlineColorAndroid="transparent"
                                  onChangeText={txtMemberID => this.setState({txtMemberID})}
                              />

                    </View>
                    <View style={styles.SectionStyle}>
                      <Image source={require('../../assets/cal.png')} style={styles.ImageStyle_birth} />
                      <DatePicker
                         style={{width: 267}}
                         customStyles={{
                           dateInput: {
                         alignItems: 'flex-start',
                         borderWidth: 0,

                        },

                        placeholderText: {
                          color: '#000'
                        },
                       dateText:{
                        // textAlign: 'left',

                         color: '#000',
                            paddingLeft:0,


                       }
                     }}
                         showIcon={false}
                         //customStyles={customStyles}
                        ref='datepicker'
                         date={this.state.date}
                         mode="date"
                         placeholder="Birthday"
                         format="MM/DD/YYYY"
                         minDate="01/01/1950"
                         maxDate="01/01/2050"
                         autoComplete="off"
                         confirmBtnText="OK"
                         cancelBtnText="Cancel"
                          androidMode="spinner"
                         onDateChange={(date) => {this.setState({date: date})}}   />

                    </View>

                       {
                         (loaded === true) ? <View style={styles.containerActivety}><View style={{width:100,height:100,backgroundColor:'white',alignItems:'center',justifyContent:'center',borderRadius:10}}><ActivityIndicator size="large" color="#00dcc3" /></View></View> : null
                       }


                    <TouchableOpacity
                      onPress={this.clickToLogin}
                    >
                    <Image
                             source={require('../../assets/login.png')}
                             style={{width:267,marginTop:10,}}
                             />
                      </TouchableOpacity>

                    </View>
                      </ImageBackground>
                    }



                      <OfflineNotice />
                  </View>
</SafeAreaView>

  );
  }
}



const navigateData = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    },
  },
  Home: {

    screen: HomeScreen,
    navigationOptions: {
      title: 'Home', header: null
    }
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ddd'
  },
container: {
          flex: 1,
          margin: 0,
          padding: 0,
          alignItems: 'center',
  },
      MainContainer:
       {
           flex: 1,
           justifyContent: 'center',
           alignItems: 'center',

           paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
       },

      container_logo: {
              //  margin: 0,
                marginBottom:20,
                padding:0,
                alignItems: 'center',
            },
          shadow1: {
                    //  margin: 0,
                      marginBottom:0,
                      padding:0,
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
        resizeMode : 'stretch',
        alignItems: 'center'
    },
    ImageStyle_birth: {
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        //paddingLeft:10,
        height: 20,
        width: 20,
        resizeMode : 'stretch',
        alignItems: 'center'
    },
    viewStyleOne: {
        width:40,
        height:40,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#b642f4'
      },
      textStyle:{
        textAlign:'center'
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
        backgroundColor: 'rgba(255, 255, 255, 0.8)',

        height: 40,
        borderRadius: 5 ,
        margin: 20,
        width: 267,
        paddingLeft:40,
        shadowOffset:{  width: 5,  height: 5,  },
        borderWidth: 1,

    },

    SectionStyle1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: .5,
        borderColor: '#00dcc3',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        height: 40,
        borderRadius: 5 ,
        margin: 10,
        width: 267,
    },
    SectionStyle2: {
        borderWidth: .5,
        marginRight: 30,
        width: 90,
        height:90
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
        borderColor:'#ede9e0',
        width: 267,
        margin:30,
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

  TouchableOpacity_Style:{

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
    },
containerActivety: {

    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
    zIndex: 10000000,
    position: 'absolute',
   justifyContent: 'center',
   alignItems: 'center'
 }


});

export default Login;
