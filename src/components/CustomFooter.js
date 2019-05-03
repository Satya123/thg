/* CustomFooter.js
  THG App
  This file use for common footer option .
  @Created by Pulkit Arora
*/

import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import Menu from './Menu';
import Notification from './Notification';
import { createStackNavigator, } from 'react-navigation';
import { Actions } from 'react-native-router-flux';

class CustomFooter extends Component {
/*
  @props: Set active component on selected button
*/
    constructor(props) {
        super(props);
        this.props = props;
        AsyncStorage.getItem('profileArray')
                .then((contacts) => {
                    const value = contacts ? JSON.parse(contacts) : [];
                   // //console.log(value);
                    this.setState({arrayValue: value})
                });
        this.state = {count: 0,
            isAppointment: this.props.isAppointment,
            isAccount : this.props.isAccount ,
            isIDCard: this.props.isIDCard,
            isTelemedicine:this.props.isTelemedicine,
            arrayValue:[],
            isCustomerService : this.props.isCustomerService
        };
    }
    /*
      @AsyncStorage.getItem: Get user profile data to present  in table.
      @profileArray: Is key which is use for retrieve UserData.
    */

    componentWillMount() {
      // alert(this.props.telemedicine)

      AsyncStorage.getItem('profileArray')
              .then((contacts) => {
                  const value = contacts ? JSON.parse(contacts) : [];
                  ////console.log(value);
                  this.setState({arrayValue: value})
              });
      AsyncStorage.getItem('isTelemedicineEnable')
              .then((value) => {

              //    alert(value);
                  this.setState({telemedicine: value})
              });
    }
    /*
      @clickToAccountInfo: this function use for present Home component .
  */
    clickToAccountInfo = () => {
        Actions.AccountInfo({userData: this.state.arrayValue,isFromVendor:false});
        //window.location.reload();
        // Actions.refresh()
    }
    /*
      @clickToAppointment: this function use for present Profile component .
      @userData: Set user profile data in profile component.
      Actions.AccountInfo: It goes to firstly in AccountInfo then it active Profile component.
  */
    clickToAppointment = () => {
        Actions.Appointments({isViewAppointments:true,isEnableTele:this.state.telemedicine});
    }
    /*
      @clickToAccountInfo: this function use for present Notification component .
  */
    clickToCustomerService = () => {

          Actions.CustomerServices({phoneNumber: this.state.arrayValue[0].customerServicePhone});
    }
    /*
      @clickToIDCard: this function use for present Menu component .
  */
    clickToIDCard = () => {
        Actions.IDCard();
      //  Actions.refresh({ key: 'IDCard'});
    }
    /*
    /*
      @clickToIDCard: this function use for present Menu component .
  */
    clickToIDTelemedicine = () => {
        Actions.Telemedicine({isEnableTele:this.state.telemedicine});
        //  Actions.refresh({ key: 'Telemedicine'});
    }
    /*
      @render: this function use to present the UI of the components .
  */
    render() {
        const {
            isAppointment, isAccount , isCustomerService , isIDCard , isTelemedicine
        } = this.state;

        ////console.log(isAccount );
        return (
                <View>

                    <View style={styles.footerView}>

                        <TouchableOpacity
                            onPress={this.clickToAccountInfo}
                            style={{width:'20%',justifyContent:'center',alignItems:'center'}}

                            >
                            {
                                (isAccount  === true) ? <Image source={require('../../assets/account-hover.png')} /> : <Image source={require('../../assets/account.png')} />

                            }
                            {
                               (isAccount  === true) ?   <Text style={styles.textStyleSelected}>Account</Text> :   <Text style={styles.textStyle}>Account</Text>
                            }


                        </TouchableOpacity>



                        <TouchableOpacity
                            onPress={this.clickToAppointment}
                              style={{width:'20%',justifyContent:'center',alignItems:'center'}}
                            >

                            {

                              (isAppointment === true) ? <Image source={require('../../assets/appointment-hover.png')} /> : <Image source={require('../../assets/appointment.png')} />
                            }
                            {
                               (isAppointment  === true) ?   <Text style={styles.textStyleSelected}>Appointments</Text> :   <Text style={styles.textStyle}>Appointments</Text>
                            }

                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={this.clickToCustomerService}
                              style={{width:'20%',justifyContent:'center',alignItems:'center'}}

                            >
                            {
                               (isCustomerService  === true) ? <Image source={require('../../assets/customerservice-hover.png')} /> : <Image source={require('../../assets/customerservice.png')} />

                          }
                          {
                             (isCustomerService  === true) ?   <Text style={styles.textStyleSelected}>Service</Text> :   <Text style={styles.textStyle}>Service</Text>
                          }

                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={this.clickToIDCard}
                              style={{width:'20%',justifyContent:'center',alignItems:'center'}}

                            >
                            {
                              (isIDCard === true) ? <Image source={require('../../assets/IDcard-hover.png')} /> : <Image source={require('../../assets/IDcardnew.png')} />
                            }
                            {
                            (isIDCard  === true) ?   <Text style={styles.textStyleSelected}>ID Card</Text> :   <Text style={styles.textStyle}>ID Card</Text>
                         }
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.clickToIDTelemedicine}
                              style={{width:'20%',justifyContent:'center',alignItems:'center'}}

                            >
                            {
                              (isTelemedicine === true) ? <Image source={require('../../assets/telemedicine-hover.png')} /> : <Image source={require('../../assets/telemedicine.png')} />
                            }
                            {
                                (isTelemedicine  === true) ?   <Text style={styles.textStyleSelected}>Telemedicine</Text> :   <Text style={styles.textStyle}>Telemedicine</Text>
                             }

                        </TouchableOpacity>



                    </View>
                </View>

                );
    }

}
/*
  @styles:  constant are use to make a  presentable ui .
*/
const styles = {
   footerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0,
        padding: 5,
        height:50,
        bottom:0,
        backgroundColor: '#ffffff'
   },
    shadow1: {
        //  margin: 0,
        marginBottom: 2,
        padding: 0,
        alignItems: 'center',
    },

    textStyle: {
        fontSize: 10,
        color: '#333',


    },
    textStyleSelected: {
        fontSize: 10,
        color: '#00dcc3',


    }
};

export default CustomFooter;