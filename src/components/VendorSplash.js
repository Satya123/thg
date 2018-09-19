import React from 'react';
import { View, Text,ImageBackground, Image, StyleSheet, Platform, Alert, ActivityIndicator, StatusBar } from 'react-native';
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
        console.log(res);

        this.callAppDetails(res);
    });
}


      callAppDetails = (token) => {
        //  debugger;
          console.log(token);
            this.setState({ loaded: true });
              ServiceClass.appDetails(token, 'appdetails').then((reData) => {

                console.log(reData);
                const that = this;

                if (reData.data.status === '1') {
                  // debugger;
                  console.log(reData.data.data.siteDetails[0].logoUrl);
                  this.setState({ dataUser: reData.data.data.users });
                  this.setState({ url: reData.data.data.siteDetails[0].logoUrl });
                //  Alert.alert(this.state.url);
                  this.setState({ loaded: false });
                    setTimeout(() => {
                        that.HideSplashScreen();
                      }, 5000);
                } else {
                    this.setState({ loaded: false });
                  Alert.alert(reData.data.message);

                  setTimeout(() => {
                      that.HideSplashScreen();
                    }, 5000);
                }
              }).catch((error) => {
                  //console.log(error);
                  Alert.alert(error);
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
         Actions.HomeScreen({ profileData: this.state.dataUser });
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
                        backgroundColor=""
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
