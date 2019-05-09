 import React from 'react';
import { PushNotificationIOS, AppState, View, Text, ImageBackground,SafeAreaView, AsyncStorage, NetInfo, Image, StyleSheet, Platform, Alert, ActivityIndicator, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import UserData from './UserData';
import ServiceClass from './ServiceClass';
import OfflineNotice from './OfflineNotice';
import DeviceInfo from 'react-native-device-info';


class VendorSplash extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
            loaded: false,

            url: '',
            isApiCall: null,
            appState: AppState.currentState,
        }
    }

    componentWillReceiveProps(customProps){

            this.callApiMethod()

    }

    componentDidMount() {

      AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
     AppState.removeEventListener('change', this._handleAppStateChange);
   }


   _handleAppStateChange = (nextAppState) => {
       if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
         //console.log('App has come to the foreground!')
         if (Actions.currentScene == "VendorSplash") {
               this.callApiMethod()
         }
       }
      // this.setState({appState: nextAppState});
     }



  callApiMethod = () =>{
    NetInfo.isConnected.fetch().done((isConnected) => {
        if (isConnected)
        {
            UserData.retriveData('token').then((res) => {
                //console.log(res);

                this.callAppDetails(res);
            });
        } else
        {
            // Ideally load from local storage
        }
    });
  }


    componentWillMount() {
      let version =  DeviceInfo.getVersion()
    //  alert(version);
        this.callApiMethod()

     }

    callAppDetails = (token) => {

        this.setState({isApiCall:true})
        const arrAppointment = [];
        //console.log(token);
        this.setState({loaded: true});

        ServiceClass.appDetails(token, 'appdetails').then((reData) => {
        //debugger;
         ////console.log(reData);

       if ( reData.status === 404 || reData.status === 400 || reData.status === 204 || reData.data === null || reData.status === 0) {
                      var errorMsg = response.statusText
                      alert("Something went wrong.")
                      return ;
           }else {

                         //console.log(reData);
                         const that = this;

                         if (reData.data.status === '1') {

                              //console.log(reData.data.data.id);
                             //console.log(reData.data.data.siteDetails[0].logoUrl);
                             //console.log(reData.data.data.siteDetails[0].isTelemedicineEnable);
                             this.setState({dataUser: reData.data.data.users});
                             this.setState({url: reData.data.data.siteDetails[0].logoUrl});

                             var isTelemedicineEnable = reData.data.data.siteDetails[0].hasOwnProperty("isTelemedicineEnable");
                             if (isTelemedicineEnable === true){
                                 //this.setState({telemadicineOpen: reData.data.data.siteDetails[0].isTelemedicineEnable.toString()});
                                 try {
                                     AsyncStorage.setItem('isTelemedicineEnable', reData.data.data.siteDetails[0].isTelemedicineEnable.toString());
                                 } catch (error) {

                                 }


                             }

                                 UserData.saveData('memberId', reData.data.data.users[0].ID.toString());

                             // //   //   debugger;
                             for (var item in reData.data.data.appointments[0].type) {
                                 //console.log(reData.data.data.appointments[0].type[item]);
                                 arrAppointment.push({
                                     label: reData.data.data.appointments[0].type[item],
                                     value: reData.data.data.appointments[0].type[item]
                                 })
                             }
                             try {
                                 AsyncStorage.setItem('AppointmentType', JSON.stringify(arrAppointment));
                             } catch (error) {

                             }
                             try {
                                 AsyncStorage.setItem('profileArray', JSON.stringify(reData.data.data.users));
                                }
                             catch (error) {
                                }

                           //  UserData.saveData('isTelemedicineEnable', reData.data.data.siteDetails[0].isTelemedicineEnable.toString());
                             UserData.saveData('PrimaryCare', reData.data.data.appointments[1].primaryCareText);

                             //this.setState({ arrPatient: arrPatient });
                             //  Alert.alert(this.state.url);
                             this.setState({loaded: false});
                             setTimeout(() => {
                                 that.HideSplashScreen();
                             }, 2000);
                         } else {
                             this.setState({loaded: false});
                             Alert.alert(reData.data.message);

                             setTimeout(() => {
                                 that.HideSplashScreen();
                             }, 2000);
                         }
                   }



        }).catch((error) => {
            //debugger
            //console.log(error);
            this.setState({loaded: false});
            setTimeout(() => {
                that.HideSplashScreen();
            }, 100);
            Alert.alert(error);
        });
    }
    HideSplashScreen = () => {
        this.setState({
            isVisible: false

        });
    }
    goToHomeScreen = () => {
        const {
            isVisible,

        } = this.state;
        if (isVisible === false) {

            Actions.AccountInfo({ userData: this.state.dataUser, telemedicine:this.state.telemadicineOpen,isFromVendor:true });

          //  Actions.HomeScreen({profileData: this.state.dataUser,telemedicine:this.state.telemadicineOpen});
        }
    }

    render() {
        const {
            url,
            loaded
        } = this.state;

        return (
          <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>


                    <ImageBackground
                        style={styles.imgBackground}
                        resizeMode='cover'
                        source={require('../../assets/splash-screen-bac.png')}>
                        <View style={styles.container_logo}>
                            <Image
                                style={{width: 210, height: 63 }}
                                source={{
                            uri: url
                                }}

                                />
                               {
            (loaded === true) ? <View style={styles.containerActivety}><View style={{width: 100, height: 100, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}><ActivityIndicator size="large" color="#00dcc3" /></View></View> : null
            }
                            {
                              (this.state.isApiCall === false)?  <Text>Please try again!!</Text> : null
                            }
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center',bottom:5}}><Text style={{color:'#000'}}>Patient Interactive v{DeviceInfo.getVersion()}</Text></View>
                    </ImageBackground>

                    {this.goToHomeScreen()}
                    <StatusBar

                        barStyle="light-content"
                        />

                    <OfflineNotice />
                </View>

</SafeAreaView>
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
                    marginBottom: 0,
                    padding: 0,
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
