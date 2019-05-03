/* Policies.js
  THG App
  This file use for user Policies and Benifites .
  @Created by Pulkit Arora
*/

import React, { Component } from 'react';
import { View, Text, ImageBackground, NetInfo,Alert ,ActivityIndicator, AsyncStorage } from 'react-native';
import CustomFooter from './CustomFooter';
import PoliciesCard from './PoliciesCard';
import UserData from './UserData';
import ServiceClass from './ServiceClass';

class Policies extends Component {
 constructor(props) {
        super(props);
        this.state = {
            isProfile: false,
            isDependents: false,
            loaded: false,
            isPolicies: true,
            dataArray: [],
            arrayValue: [],
        };
    }
    /*
      @NetInfo: This keyword use for check internet cannectivity .
       @UserData: Use to retrieve single string data, with help of key.
    */
    componentDidMount() {
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected)
            {

                UserData.retriveData('token').then((resToken) => {
                    UserData.retriveData('memberId').then((res) => {
                        this.getPolocies(resToken, res);
                    });
                })

            } else
            {

            }
        });

    }
    /*
      @getPolociess: Is use to call api using predefine parameters
      @token: Token is encoded string which used for Authontication of API.
      @memberID: Current user id.
    */
    getPolocies = (token, memberID) => {
       //console.log(token);
        this.setState({loaded: true});
        ServiceClass.appDetails(token, `policies/${ memberID}`).then((reData) => {
          if ( reData.status === 200) {
                 if (reData.data.status === '1') {
              //debugger;
                //console.log(reData.data.data);
                this.setState({dataArray: reData.data.data});
                this.setState({loaded: false});
                UserData.saveData('phoneNumber', reData.data.data[0].telemedicine.phone.toString());
                UserData.saveData('details', reData.data.data[0].telemedicine.details.toString());
            } else {
                this.setState({loaded: false});
                Alert.alert(reData.data.message);
            }         
                
                
              }else {
                 this.setState({loaded: false}); 
                var errorMsg = response.statusText
                         alert("Something went wrong.")
                         return ;
              }
           
        }).catch((error) => {
            ////console.log(error);
            Alert.alert(error);
        });
    }
    /*
      @render: this function use to present the UI of this components .
  */
    render() {

        const {
            dataArray,
            arrayValue,
            loaded
        } = this.state;

        //console.log(dataArray);
        return (
                <View style={styles.MainContainer}>
                   <ImageBackground
                        style={styles.imgBackground}
                        resizeMode='cover'
                        source={require('../../assets/backgroundBlue.png')} >
                        <View style={{width: '100%' }}>
                            <View style={{margin: 10, width: '95%', paddingBottom: 30}}>
                                <PoliciesCard arrayDescription={dataArray} />
                            </View>
                        </View>

                      {
            (loaded === true) ? <View style={styles.containerActivety}><View style={{width: 100, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}><ActivityIndicator size="large" color="#00dcc3" /></View></View> : null
            }
            
                    </ImageBackground>

                    <View style={styles.footerView}>
                    <CustomFooter
                      telemedicine={this.props.telemedicine}
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
      };

export default Policies;
