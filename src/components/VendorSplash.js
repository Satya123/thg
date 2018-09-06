import React from 'react';
import { View, Text,ImageBackground, Image, StyleSheet, Platform, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import UserData from './UserData';
import ServiceClass from './ServiceClass';

 class VendorSplash extends React.Component {

  constructor() {
     super();
     this.state = {
        isVisible: true,
        loaded: false,

     }
}


  componentDidMount() {
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
                debugger; 
                if (reData.data.status === '1') {
                    UserData.saveData('token', reData.data.data.token);
                      this.setState({ loaded: false });
                    Actions.VendorSplash();
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
        isVisible
    } = this.state;
      if (isVisible === false) {
          Actions.HomeScreen();
      }
    }

    render() {
      return (


        <View style={styles.container}>


              <ImageBackground
              style={styles.imgBackground}
              resizeMode='cover'
              source={require('../../assets/splash-screen-bac.png')}>
                      <View style={styles.container}>
                      <Image
                      source={require('../../assets/logo.png')}
                      style={{marginBottom: 65, marginTop: 100}}/>

                      </View>

                        </ImageBackground>
                        {this.goToHomeScreen()}
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
         //justifyContent: 'center',
        //  paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
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

export default VendorSplash;
