/*
 * @author satya
 * Created by satya 16 Aug 2018
 * Modified by  13 November 2018
 * This is page for splash
 */
import React from 'react';
import { View, Text,ImageBackground, Image, StyleSheet, Platform, Alert, ActivityIndicator, StatusBar,AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import UserData from './UserData';
import ServiceClass from './ServiceClass';
import ExtensionHelper from './ExtensionHelper';
class VendorSplash extends React.Component {
constructor(props) {
     super(props);
     this.state = {
        isVisible: true,
        loaded: true,
        url: ''

     }
}


  componentWillMount() {
    UserData.retriveData('token').then((res) => {
        //console.log(res);

        this.callAppDetails(res);
    });
}


  callAppDetails = (token) => {
        const arrAppointment = [];
         // console.log(token);
            this.setState({ loaded: true });
              ServiceClass.appDetails(token, 'appdetails').then((reData) => {
                //  debugger;
               // console.log(reData);
                const that = this;

                if (reData.data.status === '1') {
                  // debugger;
                  //console.log(reData.data.data.siteDetails[0].logoUrl);
                  this.setState({ dataUser: reData.data.data.users });
                  this.setState({ url: reData.data.data.siteDetails[0].logoUrl });
                  this.setState({telemadicineOpen: reData.data.data.siteDetails[0].isTelemedicineEnable});
                //  debugger;
                  for (var item in reData.data.data.appointments[0].type){
                   // console.log(reData.data.data.appointments[0].type[item]);
                    arrAppointment.push({
                    label: reData.data.data.appointments[0].type[item],
                    value: reData.data.data.appointments[0].type[item]
                   })
                  }
                  UserData.saveData('memberId', reData.data.data.users[0].ID);
                   try {
          AsyncStorage.setItem('profileArray', JSON.stringify(reData.data.data.users));
          } catch (error) {

          }
                  
                  try {
                     AsyncStorage.setItem('AppointmentType', JSON.stringify(arrAppointment));
                     } catch (error) {

                     }

                      UserData.saveData('PrimaryCare', reData.data.data.appointments[1].primaryCareText);

                  //this.setState({ arrPatient: arrPatient });
                //  Alert.alert(this.state.url);
                  this.setState({ loaded: false });
                    setTimeout(() => {
                        that.HideSplashScreen();
                      }, 2000);
                } else {
                    this.setState({ loaded: false });
                  //Alert.alert(reData.data.message);

                  setTimeout(() => {
                      that.HideSplashScreen();
                    }, 2000);
                }
              }).catch((error) => {
                //debugger
                  console.log(error);
                    this.setState({ loaded: false });
                    setTimeout(() => {
                        that.HideSplashScreen();
                      }, 100);
                 // Alert.alert(error);
              });
    }
       HideSplashScreen= () => {
           this.setState({
             isVisible: false

           });
}
  goToHomeScreen = () => {
    const {
        isVisible,

    } = this.state;
      if (isVisible === false) {
         Actions.HomeScreen({profileData: this.state.dataUser,telemedicine:this.state.telemadicineOpen});

      }
    }

    render() {
      const {
          url,
          loaded
      } = this.state;

      return (


        <View style={styles.container}>


              <ImageBackground
              style={styles.imgBackground}
              resizeMode='cover'
              source={require('../../assets/splash-screen-bac.png')}>
              <View style={styles.container_logo}>
              <Image
              style={{ width: 197, height: 63 }}
              source={{
                uri: url
              }}

              />
              {
                (loaded === true) ? <View style={styles.containerActivety}><View style={{width:100,height:100,backgroundColor:'white',alignItems:'center',justifyContent:'center',borderRadius:10}}><ActivityIndicator size="large" color="#ffa970" /></View></View> : null
              }

              </View>

                        </ImageBackground>

                        {this.goToHomeScreen()}
                        <StatusBar
                        
                        barStyle="light-content"
                        />
                    </View>


    );
    }
}
const styles = StyleSheet.create({

container: {
          flex: 1,
          margin: 0,
          padding: 0,
          alignItems: 'center',
         justifyContent: 'center',
        //  paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
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


      container_logo: {
                flex: 1,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20

            },
          shadow1: {
                    //  margin: 0,
                      marginBottom:0,
                      padding:0,
                      alignItems: 'center',
                  },



    imgBackground: {
            width: '100%',
            height: '100%',
            //resizeMode: 'cover',
            flex: 1,

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





});

export default VendorSplash;