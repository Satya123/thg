import React from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text,Platform,Image, TouchableOpacity,ImageBackground} from 'react-native';
import { createStackNavigator, } from 'react-navigation';
import CustomFooter from './CustomFooter';
import AccountInfo from './AccountInfo';
import Policies from './Policies';
export const AccountInfoProfile = '100';

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


clickToAccountInfo() {
    this.props.navigation.navigate('AccountInfo');
}


  render() {
    return (
      <ImageBackground style={ styles.imgBackground } resizeMode='cover' source={require('../../assets/home-bac.png')}>
      <View style={{
              flex: 0.5,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop:130,
              marginBottom:20
            }}>
            <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => { this.clickToAccountInfo(); }}
            >

              <View><Image  source={require('../../assets/acc-info.png')} /></View>
              </TouchableOpacity>
              <View></View>
              <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => { this.props.navigation.navigate('Telemedicine'); }} >
              <View style={{marginTop:15,}}><Image  source={require('../../assets/id-card.png')} /></View>
                </TouchableOpacity>
            </View>
    <View style={styles.container_logo}>
    <Image  source={require('../../assets/logo.png')} />
    </View>
    <View style={{
            //flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,

          }}>
          <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => { this.props.navigation.navigate('Telemedicine'); }} >
            <View style={{marginLeft:8,}}><Image  source={require('../../assets/appointments.png')} /></View>
            </TouchableOpacity>
            <View></View>

            <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => { this.props.navigation.navigate('Telemedicine'); }} >

            <View style={{marginRight:8,}}><Image  source={require('../../assets/telemedicine.png')} /></View>
              </TouchableOpacity>




          </View>

          <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                  <View></View>
                  <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => { this.props.navigation.navigate('Telemedicine'); }} >
                  <View><Image  source={require('../../assets/customer-service.png')} /></View>
                  </TouchableOpacity>
                  <View></View>
                </View>
                <View style={styles.shadow1}>
                <Image  source={require('../../assets/b.png')} />
                </View>

                <CustomFooter
                isProfile={this.state.isProfile}
                isHome={this.state.isHome}
                isMenu={this.state.isMenu}
                isNotification={this.state.isNotification}
                />

</ImageBackground>
    );
  }
}
const styles = StyleSheet.create({

container: {
          flex: 1,
          margin: 0,
          padding:0,
          alignItems: 'center',
         //justifyContent: 'center',
        //  paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
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
        borderColor: '#ffa970',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',

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
        borderColor: '#ffa970',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
      flex:1,
        margin: 0,
        position: 'absolute',
        width: '100%',
        height: '100%',

    },
  SplashScreen_ChildView:
  {
    justifyContent: 'center',
    alignItems: 'center',

    flex:1,

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
    }


});

export default HomeScreen;
