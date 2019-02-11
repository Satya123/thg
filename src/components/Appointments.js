/* Appointment.js
  THG App
  This file use for set your  Appointment with Doctor.
  @Created by Pulkit Arora
  <ResponsiveImage  source={require('../../assets/add.png')}
     initWidth="97" initHeight="50"/>
  >
*/

import React, { Component } from 'react';
import { View, Alert, TouchableOpacity, Text, Platform, AsyncStorage, SafeAreaView } from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import { Actions } from 'react-native-router-flux';
import RequestAppointment from './RequestAppointment';
import CustomFooter from './CustomFooter';
import TopMenu from './TopMenu';
import Dependents from './Dependents';
import Telemedicine from './Telemedicine';
import  Policies  from './Policies';
import CustomHeader from './CustomHeader';
import ViewAppointment from './ViewAppointment';
import OfflineNotice from './OfflineNotice';
// var isRequestAppointment = false;
// var isViewAppointments = true;


class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRequestAppointment: this.props.isRequestAppointment,
            isViewAppointments: this.props.isViewAppointments,
            isAccountInfo: true,
        };

    }
/*
  @componentWillReceiveProps: this function call after request appontment submitted
  @props: is used to pass value from child(RequestAppointmentSubCard) to  Parent
*/
    componentWillReceiveProps(props) {

      if (this.state.isRequestAppointment === true){
          this.setState({isRequestAppointment: false});
        this.setState({isViewAppointments: true});

      }else{

        this.setState({isViewAppointments: true});
      }
    }

    // componentDidMount(){
    //   alert("componentDidMountAppointment");
    // }
    /*
      Set by default Appoinment list
    */
    componentWillMount() {
        
   // alert("first2")
    //  alert("componentWillMountAppointment");
        this.setState({isViewAppointments: this.props.isViewAppointments});
        
        
 if (this.state.isRequestAppointment === true){
          this.setState({isRequestAppointment: false});
        this.setState({isViewAppointments: true});

      }else{

        this.setState({isViewAppointments: true});
      }
       
    }
    /*
      @clickToRequestAppointment: this function use for active RequestAppointment component on Appoinment class
  */
    clickToRequestAppointment = () => {
         // alert("first3")
        this.setState({isRequestAppointment: true});
        this.setState({isViewAppointments: false});
        // isRequestAppointment = true;
        // isViewAppointments = false;
    }
    /*
      @clickToViewAppointments: this function use for active Appoinment list component on Appoinment class
  */
    clickToViewAppointments = () => {
  //alert("first4")

        this.setState({isRequestAppointment: false});
        this.setState({isViewAppointments: true});

        // isRequestAppointment = false;
        // isViewAppointments = true;
    }
    /*
      @render: this function use to present the UI of the components .
  */
    render() {
        console.log(this.props.userData);
        return (
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.MainContainer}>
                        <View style={{width: '100%', height: 60 }}>
                            <CustomHeader
                                headerText={'Appointments'}

                                />
                        </View>
                        <View style={styles.topView}>

                            <TouchableOpacity
                                style={(this.state.isRequestAppointment === true) ? styles.firstViewActive : styles.firstView}
                                activeOpacity={0.5}
                                onPress={() => this.clickToRequestAppointment()}
                                >
                                <Text style={(this.state.isRequestAppointment === true) ? styles.textActive : styles.textInActive}>REQUEST APPOINTMENT</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={(this.state.isViewAppointments === true) ? styles.secondViewActive : styles.secondView}
                                activeOpacity={0.5}
                                onPress={() => this.clickToViewAppointments()}
                                >
                                <Text style={(this.state.isViewAppointments === true) ? styles.textActive : styles.textInActive}>VIEW APPOINTMENTS</Text>
                            </TouchableOpacity>
                        </View>


                        {
                                (this.state.isRequestAppointment === true) ? <RequestAppointment dataArray={this.props.userData} isEnableTele={this.props.isEnableTele} /> : null
                        }
                        {
                                (this.state.isViewAppointments === true) ? <ViewAppointment  isEnableTele={this.props.isEnableTele} /> : null
                        }
                        <View style={styles.footerView}>
                            <CustomFooter
                                isclickToRequestAppointment={this.state.isclickToRequestAppointment}
                                isHome={this.state.isHome}
                                isMenu={this.state.isMenu}
                                isNotification={this.state.isNotification}

                                />
                        </View>

                    </View>

                    <OfflineNotice />
                </SafeAreaView>
                            );
                }

    }
    /*
      @styles:  these style constant are used to create a presentable ui .
    */
    const styles = {
        safeArea: {
            flex: 1,

        },
        MainContainer:
                {
                    flex: 1,

                },

        textActive: {
            color: '#ff7417'
        },
        textInActive: {
            color: 'black'
        },
         footerView: {
                width: '100%',
                height: 45,
                position: 'absolute',
                bottom: 0
            },
        topView: {
            flexDirection: 'row',
            marginTop: 0,
            padding: 0,
            height: 50,
            width: '100%',
            backgroundColor: '#ffffff',

        },
        firstView: {
            borderBottomWidth: 2,
            borderColor: '#ccc',
            width: '51%',
            alignItems: 'center',
            paddingTop: 18
        },
        firstViewActive: {
            borderBottomWidth: 2,
            borderColor: '#ff7417',
            width: '51%',
            alignItems: 'center',
            color: '#ff7417',
            paddingTop: 18

        },
        secondView: {
            borderBottomWidth: 2,
            borderColor: '#ccc',
            width: '49%',
            alignItems: 'center',
            paddingTop: 18
        },
        secondViewActive: {
            borderBottomWidth: 2,
            borderColor: '#ff7417',
            width: '49%',
            alignItems: 'center',
            color: '#ff7417',
            paddingTop: 18

        },

        mainContainer: {
            width: '100%',
            height: '100%'

        }

    };

 export default Appointment;