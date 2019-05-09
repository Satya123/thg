/* Profile.js
  THG App
  This file use to present User Profile .
  @Created by Pulkit Arora
*/

import React, { Component } from 'react';
import { Text, NetInfo,View, ImageBackground, ActivityIndicator,Platform, TouchableOpacity,Alert } from 'react-native';
import CustomFooter from './CustomFooter';
import UserData from './UserData';
import ProflieSubCard from './ProflieSubCard';
import CustomHeader from './CustomHeader';
import ServiceClass from './ServiceClass';
import { Actions } from 'react-native-router-flux';
import Router from './Router';
import Spinner from 'react-native-loading-spinner-overlay';

class Profile extends Component {
 constructor(props) {
      super(props);
      this.state = {
            isProfile: true,
            isHome: false,
            isMenu: false,
            isNotification: false,
            isAccountInfo: this.props.isAccountInfo,
            arrData: [],
            dataUser:this.props.dataArray,
            isLogOut: false
          };
    }
    /*
      @this.props.dataArray: Get the user profile data.
  */


componentWillReceiveProps(customProps){


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



componentWillMount(){
//  this.setState({dataUser:})


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


callAppDetails=(token)=>{
  const arrAppointment = [];
  //console.log(token);
  this.setState({loaded: true});
  ServiceClass.appDetails(token, 'appdetails').then((reData) => {
  //debugger;

  if ( reData.status === 200) {
                 const that = this;

                        if (reData.data.status === '1') {
                        ///  debugger;
                             //console.log(reData.data.data.users);
                            //console.log(reData.data.data.users[0].ID.toString());

                              UserData.saveData('memberId', reData.data.data.users[0].ID.toString());

                            this.setState({dataUser: reData.data.data.users});
                            this.setState({url: reData.data.data.siteDetails[0].logoUrl.toString()});



                            this.setState({loaded: false});

                        } else {
                            this.setState({loaded: false});
                            Alert.alert(reData.data.message);

                            setTimeout(() => {
                                that.HideSplashScreen();
                            }, 2000);
                        }
      }else {
      this.setState({loaded: false});
      Alert.alert('Something went wrong.');
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


    componentDidMount() {

      //console.log(this.props.dataArray);


  }

  /*
    @This function use for Logout user from app.
    @UserData: firstly set token to blank.
    then redirect to the root controller.
*/
  clickToLogOut = () => {

      UserData.saveData('token', '');
      this.setState({ isLogOut: true });

      Actions.Login({isHide:true});
      Actions.refresh({ key: 'Login', text: '' });
  }
  /*
    @render: this function use to present the UI of this components,
     and pass user profile array to child components.
*/
    render() {
      const{
        dataArray,
        isLogOut
      } = this.props;
      return (
                <View style={styles.MainContainer}>
                    <ImageBackground
                        style={styles.imgBackground}
                        resizeMode='cover'
                        source={require('../../assets/backgroundBlue.png')} >
                        <View style={{height: '95%', width: '100%' }}>
                            <View style={{margin: 10, backgroundColor: '#ffffff' }}>
                                <ProflieSubCard arrayDescription={this.state.dataUser} />
                            </View>


                          {
                            /*
                            <TouchableOpacity
                                  onPress={this.clickToLogOut}>
                                  <View style={{margin: 10, backgroundColor: 'white', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                                      <Text style={{color: 'red', textAlign: 'center'}}>Log out</Text>
                                  </View>

                              </TouchableOpacity>
                            */
                          }

                       <Spinner
                          visible={this.state.loaded}
                          color={'#00dcc3'}
                          />

                        </View>
                    </ImageBackground>
                    <View style={styles.footerView}>
                        <CustomFooter
                          telemedicine={this.props.telemedicine}
                          userData={dataArray}
                            isAccount={true}
                            isAppointment={false}
                            isIDCard={false}
                            isTelemedicine={false}
                            isCustomerService={false}
                            />
                    </View>
                </View>

      );
    }


}
/*
  @styles:  these style constant are used to create a presentable ui .
*/
const styles = {
  MainContainer:
   {
     flex: 1,
   },
   footerView: {
     width: '100%',
      height: 50,


      position: 'absolute',
      bottom: 0

   },
   imgBackground: {
           width: '100%',
           height: '100%',


   },
   containerActivety: {
        top:-50,
       backgroundColor: 'transparent',
       height: '100%',
       width: '100%',
       zIndex: 10000000,
       position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(52, 52, 52, 0.1)'
    },
   textStyle:{

      color: '#fff',
      fontSize:22
    }
};

export default Profile;
